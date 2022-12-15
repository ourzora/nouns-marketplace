import { BigNumber, ContractTransaction } from 'ethers'

import { useState } from 'react'

import { parseUnits } from '@ethersproject/units'
import { useV3AskContractContext, useV3AskStateContext } from '@market/modules/V3Ask'
import * as Sentry from '@sentry/react'
import { useContractTransaction } from '@shared'

// Define Ask Types
export const V3_ASK: string = 'V3Ask'
export const PRIVATE_ASK: string = 'PrivateAsk'
export type AskType = typeof V3_ASK | typeof PRIVATE_ASK

//  Define Ask Transactions
export const CREATE_V3_ASK: string = 'createV3Ask'
export const CANCEL_V3_ASK: string = 'cancelV3Ask'
export const FILL_V3_ASK: string = 'fillV3Ask'
export const UPDATE_V3_ASK: string = 'updateV3Ask'

type V3AskTransaction =
  | typeof CREATE_V3_ASK
  | typeof CANCEL_V3_ASK
  | typeof FILL_V3_ASK
  | typeof UPDATE_V3_ASK

interface AskTxValues {
  price?: string // as user-facing display value (eg. 0.0001 ETH), not raw BigNumber
}

interface WriteAskTxValues extends AskTxValues {
  buyerAddress?: string
  rawBuyerAddress?: string // Pre-resolution: possibly ENS address or 0xAddress
}

interface useV3AskTransactionProps {
  askType?: AskType
  tokenId: string
  contractAddress: string
}

export const useV3AskTransaction = ({
  askType = V3_ASK,
  tokenId,
  contractAddress,
}: useV3AskTransactionProps) => {
  const { V3Asks, PrivateAsks } = useV3AskContractContext()
  const { txStatus, handleTx, txInProgress } = useContractTransaction()
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const { setFinalizedV3AskDetails } = useV3AskStateContext()
  const [finalizedTx, setFinalizedTx] = useState<ContractTransaction | null>()
  const [txError, setTxError] = useState<Error>()

  const isPrivate: boolean = askType === PRIVATE_ASK
  const ActiveAskModule = isPrivate ? PrivateAsks : V3Asks

  async function makeAskTransaction(
    txType: V3AskTransaction,
    price?: string, // as user-facing display value (eg. 0.0001 ETH), not raw BigNumber
    buyerAddress?: string,
    rawBuyerAddress?: string
  ) {
    const contractInitialized = (isPrivate && PrivateAsks) || (!isPrivate && V3Asks)
    const missingPrice =
      [CREATE_V3_ASK, UPDATE_V3_ASK, FILL_V3_ASK].includes(txType) && !price
    const missingBuyer = txType === CREATE_V3_ASK && isPrivate && !buyerAddress

    // Verify write params for update / create
    const isWrite = [CREATE_V3_ASK, UPDATE_V3_ASK].includes(txType)
    const isValidV3Write = isWrite && price && !isPrivate
    const isValidPrivateWrite =
      isWrite && price && isPrivate && buyerAddress && rawBuyerAddress
    const isValidWrite = isValidV3Write || isValidPrivateWrite

    try {
      if (!contractInitialized) {
        throw new Error('V3AskContract is not ready, please try again.')
      }
      if (missingPrice) {
        throw new Error('Missing/Invalid price')
      }
      if (missingBuyer) {
        throw new Error('Missing/Invalid buyerAddress')
      }

      const priceAsBigNumber = parseUnits(price?.toString() || '0', 'ether') // Convert from human-readable number to WEI

      const createParams: [string, string, BigNumber] = [
        contractAddress,
        tokenId,
        priceAsBigNumber,
      ]

      setSubmitting(true)

      let promise: Promise<ContractTransaction>

      switch (txType) {
        case CREATE_V3_ASK:
          promise = isPrivate
            ? PrivateAsks.createAsk(...createParams, buyerAddress!)
            : V3Asks.createAsk(contractAddress, tokenId, priceAsBigNumber)
          break
        case UPDATE_V3_ASK:
          promise = ActiveAskModule.setAskPrice(
            contractAddress,
            tokenId,
            priceAsBigNumber
          )
          break
        case CANCEL_V3_ASK:
          promise = ActiveAskModule.cancelAsk(contractAddress, tokenId)
          break
        case FILL_V3_ASK:
          promise = ActiveAskModule.fillAsk(contractAddress, tokenId, {
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
      console.error('ERR in useV3AskTransaction', err)
      setTxError(err || new Error("There's been an error, please try again."))
      Sentry.captureException(err)
    } finally {
      setSubmitting(false)
    }
  }

  async function createAsk({
    price,
    buyerAddress, // for Private Asks only, unneeded for V3Asks
    rawBuyerAddress, // for Private Asks only, unneeded for V3Asks
  }: WriteAskTxValues) {
    makeAskTransaction(CREATE_V3_ASK, price, buyerAddress, rawBuyerAddress)
  }

  async function updateAsk({
    price,
    buyerAddress, // for Private Asks only, unneeded for V3Asks
    rawBuyerAddress, // for Private Asks only, unneeded for V3Asks
  }: WriteAskTxValues) {
    makeAskTransaction(UPDATE_V3_ASK, price, buyerAddress, rawBuyerAddress)
  }
  async function cancelAsk() {
    makeAskTransaction(CANCEL_V3_ASK)
  }
  async function fillAsk({ price }: AskTxValues) {
    makeAskTransaction(FILL_V3_ASK, price)
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
