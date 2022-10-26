import { BigNumber, ContractTransaction } from 'ethers'

import { useState } from 'react'

import { parseUnits } from '@ethersproject/units'
import { useV3AskContractContext, useV3AskStateContext } from '@market/modules/V3Ask'
import * as Sentry from '@sentry/react'
import { useContractTransaction } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'

// Define Ask Types

export const V3_ASK: string = 'V3Ask'
export const PRIVATE_ASK: string = 'PrivateAsk'

export type AskType = typeof V3_ASK | typeof PRIVATE_ASK

//  Define Ask Transactions

export const CREATE_V3_ASK: string = 'createV3Ask'
export const CREATE_PRIVATE_ASK: string = 'createPrivateAsk'
export const CANCEL_V3_ASK: string = 'cancelV3Ask'
export const FILL_V3_ASK: string = 'fillV3Ask'
export const UPDATE_V3_ASK: string = 'updateV3Ask'
export const UPDATE_PRIVATE_ASK: string = 'updatePrivateAsk'

type V3AskTransaction =
  | typeof CREATE_V3_ASK
  | typeof CREATE_PRIVATE_ASK
  | typeof CANCEL_V3_ASK
  | typeof FILL_V3_ASK
  | typeof UPDATE_V3_ASK
  | typeof UPDATE_PRIVATE_ASK

interface AskTxValues {
  price?: string // as user-facing display value (eg. 0.0001 ETH), not raw BigNumber
}

interface PrivateWriteAskTxValues extends AskTxValues {
  buyerAddress: string
  rawBuyerAddress: string // Pre-resolution: possibly ENS address or 0xAddress
}

interface useV3AskTransactionProps {
  nft: NFTObject
  askType?: AskType
}

export const useV3AskTransaction = ({
  nft: nftObj,
  askType = V3_ASK,
}: useV3AskTransactionProps) => {
  const { V3Asks, PrivateAsks } = useV3AskContractContext()
  const { txStatus, handleTx, txInProgress } = useContractTransaction()
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const { setFinalizedV3AskDetails } = useV3AskStateContext()
  const [finalizedTx, setFinalizedTx] = useState<ContractTransaction | null>()
  const [txError, setTxError] = useState<Error>()
  const { nft } = nftObj

  const isPrivate: boolean = askType === PRIVATE_ASK
  const ActiveAskModule = isPrivate ? PrivateAsks : V3Asks

  async function makeAskTransaction(
    txType: V3AskTransaction,
    price?: string, // as user-facing display value (eg. 0.0001 ETH), not raw BigNumber
    buyerAddress?: string,
    rawBuyerAddress?: string
  ) {
    const isValidWrite =
      [CREATE_V3_ASK, UPDATE_V3_ASK].includes(txType) &&
      price &&
      buyerAddress &&
      rawBuyerAddress

    try {
      if (!nft || !V3Asks) {
        throw new Error('V3AskContract is not ready, please try again.')
      }
      if (
        [CREATE_V3_ASK, UPDATE_V3_ASK, UPDATE_PRIVATE_ASK, FILL_V3_ASK].includes(
          txType
        ) &&
        !price
      ) {
        throw new Error('Missing/Invalid price')
      }
      if (txType === CREATE_V3_ASK && askType === PRIVATE_ASK && !buyerAddress) {
        throw new Error('Missing/Invalid buyerAddress')
      }

      const priceAsBigNumber = parseUnits(price?.toString() || '0', 'ether') // Convert from human-readable number to WEI

      // const createParams: [string, string, BigNumber, string] = [nft?.contract.address, nft?.tokenId, priceAsBigNumber, buyerAddress].filter(x => typeof x !== 'undefined')
      // const createParams: [string, string, BigNumber] = [
      //   nft?.contract.address,
      //   nft?.tokenId,
      //   priceAsBigNumber,
      // ]
      // const privateCreateParams: [string, string, BigNumber, string|undefined]  = [nft?.contract.address, nft?.tokenId, priceAsBigNumber, buyerAddress]
      // const params = isPrivate ? privateCreateParams : createParams

      setSubmitting(true)

      let promise: Promise<ContractTransaction>

      switch (txType) {
        case CREATE_V3_ASK:
        case CREATE_PRIVATE_ASK:
          promise =
            // isPrivate ?
            // PrivateAsks.createAsk(
            //   ...createParams,
            //   buyerAddress!
            // )
            ActiveAskModule.createAsk(
              nft?.contract.address,
              nft?.tokenId,
              priceAsBigNumber,
              isPrivate && buyerAddress!
            )
          // : V3Asks.createAsk(
          //   ...createParams,
          // )
          break
        case UPDATE_V3_ASK:
        case UPDATE_PRIVATE_ASK:
          promise = ActiveAskModule.setAskPrice(
            nft?.contract.address,
            nft?.tokenId,
            priceAsBigNumber
          )
          break
        case CANCEL_V3_ASK:
          promise = ActiveAskModule.cancelAsk(nft?.contract.address, nft?.tokenId)
          break
        case FILL_V3_ASK:
          promise = ActiveAskModule.fillAsk(nft?.contract.address, nft?.tokenId, {
            value: priceAsBigNumber, // optional override param actually required :)
          })
          break
        default:
          throw new Error('V3Ask txType not defined')
      }

      const tx = await handleTx(promise)

      isValidWrite &&
        tx?.hash &&
        setFinalizedV3AskDetails({ price, buyerAddress, rawBuyerAddress })

      setFinalizedTx(tx)
    } catch (err: any) {
      setTxError(err || new Error("There's been an error, please try again."))
      Sentry.captureException(err)
    } finally {
      setSubmitting(false)
    }
  }

  async function createAsk({ price }: AskTxValues) {
    makeAskTransaction(CREATE_V3_ASK, price)
  }
  async function createPrivateAsk({
    price,
    buyerAddress,
    rawBuyerAddress,
  }: PrivateWriteAskTxValues) {
    // @BJ IS IT POSSIBLE TO ELIMINATE THE EXTRA FUNCTIONS HERE, SET PARAMS AS OPTIONAL, AND VERIFY USING flow DEF ABOVE?
    makeAskTransaction(CREATE_PRIVATE_ASK, price, buyerAddress, rawBuyerAddress)
  }
  async function updateAsk({ price }: AskTxValues) {
    makeAskTransaction(UPDATE_V3_ASK, price)
  }
  async function updatePrivateAsk({
    price,
    buyerAddress,
    rawBuyerAddress,
  }: PrivateWriteAskTxValues) {
    makeAskTransaction(UPDATE_PRIVATE_ASK, price, buyerAddress, rawBuyerAddress)
  }
  async function cancelAsk() {
    makeAskTransaction(CANCEL_V3_ASK)
  }
  async function fillAsk({ price }: AskTxValues) {
    makeAskTransaction(FILL_V3_ASK, price)
  }

  return {
    createAsk,
    createPrivateAsk,
    cancelAsk,
    updateAsk,
    updatePrivateAsk,
    fillAsk,
    setSubmitting,
    isSubmitting,
    txStatus,
    txInProgress,
    txError,
    finalizedTx,
  }
}
