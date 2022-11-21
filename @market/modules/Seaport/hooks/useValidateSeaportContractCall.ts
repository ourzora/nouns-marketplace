import { useEffect, useState } from 'react'

import { SEAPORT_CONTRACT_CALL_VALIDATION_ADDRESS, formatContractError } from '@shared'

import { SeaportContractCall } from '../types/SeaportContractCall'
import { formatSeaportErrorMsg } from '../utils/formatSeaportErrorMsg'
import { isSeaportValidationResponseValid } from '../utils/isSeaportOrderValid'

// Validate that offchain orders are still valid
// See: https://docs.zora.co/docs/guides/api-offchain#verifying

export function useValidateSeaportContractCall(contractCallData?: SeaportContractCall) {
  const [isContractCallValid, setIsContractCallValid] = useState<boolean | undefined>(
    undefined
  )
  const [error, setError] = useState<Error | undefined>()

  useEffect(() => {
    const validateSeaportContractCall = async () => {
      try {
        const rawResponse = await fetch(SEAPORT_CONTRACT_CALL_VALIDATION_ADDRESS, {
          method: 'POST',
          /* @ts-ignore */
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': process.env.NEXT_PUBLIC_ZORA_API_KEY,
          },
          body: JSON.stringify({
            ...contractCallData,
          }),
        })

        const resp = await rawResponse.json()
        const isValid: boolean = isSeaportValidationResponseValid(resp)
        setIsContractCallValid(isValid)

        if (!isValid) {
          setError(new Error(formatSeaportErrorMsg(resp.message)))
        }

        return resp
      } catch (e: any) {
        const formattedError = new Error(formatContractError(e))
        setError(formattedError)
        console.error(e.message)
      }
    }
    validateSeaportContractCall()
  }, [contractCallData])

  return {
    error,
    loading: isContractCallValid === undefined,
    isValidated: isContractCallValid,
  }
}
