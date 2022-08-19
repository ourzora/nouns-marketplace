import { useContractTransaction } from '@shared'
import { useState } from 'react'
import { useContractContext } from '@market/providers'
import { NFTObject } from '@zoralabs/nft-hooks'
import { ContractTransaction } from 'ethers'
import { parseUnits } from '@ethersproject/units'
import { usePrivateAskContext } from '@market/providers/PrivateAskProvider'

export const CREATE_ASK: string = 'createPrivateAsk'
export const CANCEL_ASK: string = 'cancelPrivateAsk'
export const FILL_ASK: string = 'fillPrivateAsk'

type PrivateAskTransaction = typeof CREATE_ASK | typeof CANCEL_ASK | typeof FILL_ASK

interface CreateAskTxValues {
  price?: string
  buyerAddress?: string
}

interface usePrivateAskTransactionProps {
  nft: NFTObject
  collectionAddress?: string
  tokenId?: string
  onNext?: () => void
}

export const usePrivateAskTransaction = ({
  nft: nftData,
  onNext,
}: usePrivateAskTransactionProps) => {
  const { PrivateAsks } = useContractContext() // Should this all be moved to usePrivateAskContext?
  const { txStatus, handleTx, txInProgress } = useContractTransaction()
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const { setFinalizedPrivateAskDetails } = usePrivateAskContext()
  const [txError, setTxError] = useState<string>('')
  const { nft } = nftData

  async function makeAskTransaction(
    txType: PrivateAskTransaction,
    price?: string,
    buyerAddress?: string
  ) {
    const hasValidCreateParams = txType === CREATE_ASK && price && buyerAddress

    try {
      if (!nft || !PrivateAsks) {
        throw new Error('V3AskContract is not ready, please try again.')
      }
      if (txType === CREATE_ASK && (!price || !buyerAddress)) {
        throw new Error('createAsk missing price or buyerAddress')
      }

      const priceAsGWEI = parseUnits(price?.toString() || '0', 'ether') // Convert from human-readable number to GWEI

      setSubmitting(true)

      let promise: Promise<ContractTransaction>

      switch (txType) {
        case CANCEL_ASK:
          promise = PrivateAsks.cancelAsk(nft?.contract.address, nft?.tokenId)
          break
        case FILL_ASK:
          console.log(
            `-----> PrivateAsks.fillAsk(${nft?.contract.address},${nft?.tokenId})`
          )
          promise = PrivateAsks.fillAsk(nft?.contract.address, nft?.tokenId)
          break
        case CREATE_ASK:
          promise = PrivateAsks.createAsk(
            nft?.contract.address,
            nft?.tokenId,
            priceAsGWEI,
            buyerAddress!
          )
          break
        default:
          throw new Error('PrivateAsk txType not defined')
      }

      const tx = await handleTx(promise)
      console.log('promise', promise)
      console.log('tx.hash', tx.hash)

      hasValidCreateParams &&
        setFinalizedPrivateAskDetails({ price: price, buyerAddress: buyerAddress })

      tx && onNext && onNext()
    } catch (err: any) {
      setTxError(err?.message || "There's been an error, please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  async function createAsk({ price, buyerAddress }: CreateAskTxValues) {
    makeAskTransaction(CREATE_ASK, price, buyerAddress)
  }
  async function cancelAsk() {
    makeAskTransaction(CANCEL_ASK)
  }
  async function fillAsk() {
    console.log('FILLING ASK')
    makeAskTransaction(FILL_ASK)
  }

  return {
    createAsk,
    cancelAsk,
    fillAsk,
    setSubmitting,
    isSubmitting,
    txStatus,
    txInProgress,
    txError,
  }
}
