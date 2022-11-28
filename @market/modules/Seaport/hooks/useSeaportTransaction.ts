import { useSigner } from 'wagmi'

import { ContractTransaction } from 'ethers'

import { useState } from 'react'

import { parseUnits } from '@ethersproject/units'
import * as Sentry from '@sentry/react'

import { SeaportContractCall } from '../types/SeaportContractCall'

export function useSeaportTransaction() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { data: signer } = useSigner()
  const [error, setError] = useState<Error | undefined>()
  const [finalizedTx, setFinalizedTx] = useState<ContractTransaction | null>()

  async function fillSeaportOrder(contractCallData?: SeaportContractCall) {
    try {
      const priceInWEI = parseUnits(contractCallData?.value?.toString() || '0', 'ether')

      // Map SeaportContractCall to Seaport tx
      const tx = {
        from: contractCallData?.caller_address,
        to: contractCallData?.contract_address, // Contract that fills the order e.g. Seaport
        value: priceInWEI,
        data: contractCallData?.calldata,
      }

      setIsSubmitting(true)
      const result = await signer?.sendTransaction(tx)
      setFinalizedTx(result)
      setIsSubmitting(false)
    } catch (err: any) {
      setError(err || 'Transaction error: unknown reason, sorry :(')
      console.error(err.message)
      Sentry.captureException(err)
      setIsSubmitting(false)
    }
  }

  return {
    txError: error,
    txInProgress: isSubmitting,
    finalizedTx,
    fillSeaportOrder,
  }
}
