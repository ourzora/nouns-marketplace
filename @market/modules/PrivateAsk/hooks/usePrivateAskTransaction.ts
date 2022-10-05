import { useContractTransaction } from '@shared'
import { useState } from 'react'
import { NFTObject } from '@zoralabs/nft-hooks'
import { ContractTransaction } from 'ethers'
import { parseUnits } from '@ethersproject/units'
import {
  usePrivateAskStateContext,
  usePrivateAskContractContext,
} from '@market/modules/PrivateAsk'
import * as Sentry from '@sentry/react'

export const CREATE_ASK: string = 'createPrivateAsk'
export const CANCEL_ASK: string = 'cancelPrivateAsk'
export const FILL_ASK: string = 'fillPrivateAsk'
export const UPDATE_ASK: string = 'updatePrivateAsk'

type PrivateAskTransaction =
  | typeof CREATE_ASK
  | typeof CANCEL_ASK
  | typeof FILL_ASK
  | typeof UPDATE_ASK

interface AskTxValues {
  price?: string // as user-facing display value (eg. 0.0001 ETH), not raw BigNumber
}

interface WriteAskTxValues extends AskTxValues {
  buyerAddress: string
  rawBuyerAddress: string // Pre-resolution: possibly ENS address or 0xAddress
}

interface usePrivateAskTransactionProps {
  nft: NFTObject
  collectionAddress?: string
  tokenId?: string
}

export const usePrivateAskTransaction = ({
  nft: nftObj,
}: usePrivateAskTransactionProps) => {
  const { PrivateAsks } = usePrivateAskContractContext()
  const { txStatus, handleTx, txInProgress } = useContractTransaction()
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const { setFinalizedPrivateAskDetails } = usePrivateAskStateContext()
  const [finalizedTx, setFinalizedTx] = useState<ContractTransaction | null>()
  const [txError, setTxError] = useState<Error>()
  const { nft } = nftObj

  async function makeAskTransaction(
    txType: PrivateAskTransaction,
    price?: string, // as user-facing display value (eg. 0.0001 ETH), not raw BigNumber
    buyerAddress?: string,
    rawBuyerAddress?: string
  ) {
    const isValidWrite =
      [CREATE_ASK, UPDATE_ASK].includes(txType) &&
      price &&
      buyerAddress &&
      rawBuyerAddress

    try {
      if (!nft || !PrivateAsks) {
        throw new Error('V3AskContract is not ready, please try again.')
      }
      if ([CREATE_ASK, UPDATE_ASK, FILL_ASK].includes(txType) && !price) {
        throw new Error('Missing/Invalid price')
      }
      if (txType === CREATE_ASK && !buyerAddress) {
        throw new Error('Missing/Invalid buyerAddress')
      }

      const priceAsBigNumber = parseUnits(price?.toString() || '0', 'ether') // Convert from human-readable number to WEI

      setSubmitting(true)

      let promise: Promise<ContractTransaction>

      switch (txType) {
        case CREATE_ASK:
          promise = PrivateAsks.createAsk(
            nft?.contract.address,
            nft?.tokenId,
            priceAsBigNumber,
            buyerAddress!
          )
          break
        case UPDATE_ASK:
          promise = PrivateAsks.setAskPrice(
            nft?.contract.address,
            nft?.tokenId,
            priceAsBigNumber
          )
          break
        case CANCEL_ASK:
          promise = PrivateAsks.cancelAsk(nft?.contract.address, nft?.tokenId)
          break
        case FILL_ASK:
          promise = PrivateAsks.fillAsk(nft?.contract.address, nft?.tokenId, {
            value: priceAsBigNumber, // optional override param actually required :)
          })
          break
        default:
          throw new Error('PrivateAsk txType not defined')
      }

      const tx = await handleTx(promise)

      isValidWrite &&
        tx?.hash &&
        setFinalizedPrivateAskDetails({ price, buyerAddress, rawBuyerAddress })

      setFinalizedTx(tx)
    } catch (err: any) {
      setTxError(err || new Error("There's been an error, please try again."))
      Sentry.captureException(err)
    } finally {
      setSubmitting(false)
    }
  }

  async function createAsk({ price, buyerAddress, rawBuyerAddress }: WriteAskTxValues) {
    makeAskTransaction(CREATE_ASK, price, buyerAddress, rawBuyerAddress)
  }
  async function updateAsk({ price, buyerAddress, rawBuyerAddress }: WriteAskTxValues) {
    makeAskTransaction(UPDATE_ASK, price, buyerAddress, rawBuyerAddress)
  }
  async function cancelAsk() {
    makeAskTransaction(CANCEL_ASK)
  }
  async function fillAsk({ price }: AskTxValues) {
    makeAskTransaction(FILL_ASK, price)
  }

  return {
    createAsk,
    cancelAsk,
    updateAsk,
    fillAsk,
    setSubmitting,
    isSubmitting,
    txStatus,
    txInProgress,
    txError,
    finalizedTx,
  }
}
