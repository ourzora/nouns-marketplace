import { useContractTransaction, WalletCallStatus } from '@shared'
import { useState } from 'react'
import { NFTObject } from '@zoralabs/nft-hooks'
import { ContractTransaction } from 'ethers'
import { parseUnits } from '@ethersproject/units'
import {
  usePrivateAskStateContext,
  usePrivateAskContractContext,
} from '@market/modules/PrivateAsk/'
import { useRelevantMarket } from '@market/hooks'
import PrivateAsksABI from '@zoralabs/v3/dist/artifacts/AsksPrivateEth.sol/AsksPrivateEth.json'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'

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
  price?: string
}

interface WriteAskTxValues extends AskTxValues {
  buyerAddress: string
  rawBuyerAddress: string // unresolved: possibly ENS address or 0xAddress
}

interface usePrivateAskTransactionProps {
  nft: NFTObject
  collectionAddress?: string
  tokenId?: string
  onNext?: () => void
}

const statusMap = {
  // Map Wagmi error statuses to WalletCallStatus
  ['error']: WalletCallStatus.ERRORED,
  ['success']: WalletCallStatus.CONFIRMED,
  ['idle']: WalletCallStatus.INITIAL,
  ['loading']: WalletCallStatus.PROMPTED, // ambiguous: could also be WalletCallStatus.CONFIRMING?
}

export const usePrivateAskFillAskTransaction = ({
  nft: nftData,
  onNext,
}: usePrivateAskTransactionProps) => {
  const { PrivateAsks } = usePrivateAskContractContext()
  const { nft, markets } = nftData
  const { ask } = useRelevantMarket(markets)

  const { config, error: prepareError } = usePrepareContractWrite({
    addressOrName: PrivateAsks.address,
    contractInterface: PrivateAsksABI.abi,
    functionName: 'fillAsk',
    args: [nft?.contract.address, nft?.tokenId],
    overrides: { value: ask.amount?.amount.raw },
  })

  const {
    data,
    isLoading,
    isSuccess,
    status,
    isError,
    error,
    write: directFillAsk,
  } = useContractWrite(config)

  const walletStatus = statusMap[status]

  isSuccess && onNext && onNext()

  return {
    fillAskData: data,
    txStatus: walletStatus,
    txInProgress: isLoading, // @BJ is this mapping weird?
    txError: error ?? prepareError,
    isError,
    isSuccess,
    isLoading,
    fillAsk: directFillAsk,
  }
}

export const usePrivateAskTransaction = ({
  nft: nftData,
  onNext,
}: usePrivateAskTransactionProps) => {
  const { PrivateAsks } = usePrivateAskContractContext()
  const { txStatus, handleTx, txInProgress } = useContractTransaction()
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const { setFinalizedPrivateAskDetails } = usePrivateAskStateContext()
  const [txError, setTxError] = useState<string>('')
  const { nft } = nftData

  async function makeAskTransaction(
    txType: PrivateAskTransaction,
    price?: string,
    buyerAddress?: string,
    rawBuyerAddress?: string
  ) {
    const hasValidWriteParams =
      [CREATE_ASK, UPDATE_ASK].includes(txType) &&
      price &&
      buyerAddress &&
      rawBuyerAddress

    try {
      if (!nft || !PrivateAsks) {
        throw new Error('V3AskContract is not ready, please try again.')
      }
      if (txType === CREATE_ASK && (!price || !buyerAddress)) {
        throw new Error('Create Listing: missing price or buyerAddress')
      }
      if (txType === UPDATE_ASK && !price) {
        throw new Error('Update Listing: missing/invalid price')
      }

      const priceAsBigNumber = parseUnits(price?.toString() || '0', 'ether') // Convert from human-readable number to WEI

      setSubmitting(true)

      let promise: Promise<ContractTransaction>

      switch (txType) {
        case CANCEL_ASK:
          promise = PrivateAsks.cancelAsk(nft?.contract.address, nft?.tokenId)
          break
        // case FILL_ASK:
        //   console.log(
        //     `-----> PrivateAsks.fillAsk(${nft?.contract.address},${nft?.tokenId})`
        //   )
        //   promise = await directContractWritefillAsk()
        //   // promise = PrivateAsks.fillAsk(
        //   //   nft?.contract.address,
        //   //   nft?.tokenId,
        //   //   overrides: {
        //   //     value: price
        //   //   }
        //   // )
        //   break
        case UPDATE_ASK:
          // console.log(
          //   `-----> PrivateAsks.setAskPrice(${nft?.contract.address},${nft?.tokenId},${priceAsBigNumber})`
          // )
          promise = PrivateAsks.setAskPrice(
            nft?.contract.address,
            nft?.tokenId,
            priceAsBigNumber
          )
          break
        case CREATE_ASK:
          promise = PrivateAsks.createAsk(
            nft?.contract.address,
            nft?.tokenId,
            priceAsBigNumber,
            buyerAddress!
          )
          break
        default:
          throw new Error('PrivateAsk txType not defined')
      }

      const tx = await handleTx(promise)

      hasValidWriteParams &&
        tx?.hash &&
        setFinalizedPrivateAskDetails({ price, buyerAddress, rawBuyerAddress })

      tx && onNext && onNext()
    } catch (err: any) {
      setTxError(err?.message || "There's been an error, please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  async function createAsk({ price, buyerAddress, rawBuyerAddress }: WriteAskTxValues) {
    console.log('BUYER: ', buyerAddress)
    makeAskTransaction(CREATE_ASK, price, buyerAddress, rawBuyerAddress)
  }
  async function updateAsk({ price, buyerAddress, rawBuyerAddress }: WriteAskTxValues) {
    // console.log('BUYER: ', buyerAddress)
    makeAskTransaction(UPDATE_ASK, price, buyerAddress, rawBuyerAddress)
  }
  async function cancelAsk() {
    makeAskTransaction(CANCEL_ASK)
  }
  // async function fillAsk({ price }: AskTxValues) {
  //   makeAskTransaction(FILL_ASK, price)
  // }

  return {
    createAsk,
    cancelAsk,
    updateAsk,
    // fillAsk,
    setSubmitting,
    isSubmitting,
    txStatus,
    txInProgress,
    txError,
  }
}
