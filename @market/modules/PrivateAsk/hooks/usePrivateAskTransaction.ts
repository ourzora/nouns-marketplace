import { useContractTransaction, WalletCallStatus } from '@shared'
import { useMemo, useState } from 'react'
import { useContractContext } from '@market/providers'
import { NFTObject } from '@zoralabs/nft-hooks'
import { ContractTransaction } from 'ethers'
import { parseUnits } from '@ethersproject/units'
import { usePrivateAskContext } from '@market/modules/PrivateAsk/'
import { useRelevantMarket } from '@market/hooks'

import PrivateAsksABI from '@zoralabs/v3/dist/artifacts/AsksPrivateEth.sol/AsksPrivateEth.json'
import {
  usePrepareContractWrite,
  // useWaitForTransaction
  useContractWrite,
} from 'wagmi'

export const CREATE_ASK: string = 'createPrivateAsk'
export const CANCEL_ASK: string = 'cancelPrivateAsk'
export const FILL_ASK: string = 'fillPrivateAsk'

type PrivateAskTransaction = typeof CREATE_ASK | typeof CANCEL_ASK | typeof FILL_ASK

interface AskTxValues {
  price?: string
}

interface CreateAskTxValues extends AskTxValues {
  buyerAddress?: string
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
  const { PrivateAsks } = useContractContext() // Should this all be moved to usePrivateAskContext?
  const { nft, markets } = nftData
  const { ask } = useRelevantMarket(markets)

  const { config, error: prepareError } = usePrepareContractWrite({
    addressOrName: PrivateAsks.address,
    contractInterface: PrivateAsksABI.abi, // or ['function fillAsk()']
    functionName: 'fillAsk',
    args: [nft?.contract.address, nft?.tokenId],
    overrides: { value: ask.amount?.amount.raw },
  })

  // console.log('PrivateAsksABI.abi', PrivateAsksABI.abi)
  // console.log('CONFIG', config)

  const {
    data,
    isLoading,
    isSuccess,
    status,
    isError,
    error,
    write: directFillAsk,
  } = useContractWrite(config)
  // } = useContractWrite({
  //   addressOrName: PrivateAsks.address,
  //   contractInterface: PrivateAsksABI.abi, // or ['function fillAsk()']
  //   functionName: 'fillAsk',
  //   args: [nft?.contract.address, nft?.tokenId],
  //   overrides: {value: ask.amount?.amount.raw},
  //   mode: 'recklesslyUnprepared', // Use this if we aren't using usePrepareContractWrite
  // })
  const walletStatus = statusMap[status]

  // const { isLoading, isSuccess } = useWaitForTransaction({ // Seems this functionality has been moved into useContractWrite?
  //   hash: data?.hash,
  // })

  useMemo(() => {
    // console.log(`FILL_ASK ${ask?.amount?.amount.raw}`)
    // console.log(`PrivateAsksABI.methodIdentifiers ${PrivateAsksABI.methodIdentifiers['fillAsk(address,uint256)']}`)
    // console.log(`PrivateAsksABI.methodIdentifiers ${['function fillAsk()']}`)
    // console.log('CONFIG', config)
    // if (prepareError) console.log('PREPARE_ERROR: ', prepareError)
    if (isError) console.log('ERROR: ', error)
    console.log('fillAsk defined?', directFillAsk)
  }, [
    error,
    isError,
    // prepareError,
    directFillAsk,
  ])

  isSuccess && onNext && onNext()

  data?.hash

  return {
    fillAskData: data,
    txStatus: walletStatus,
    txInProgress: isLoading, // @BJ is this mapping weird?
    txError: error,
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
  const { PrivateAsks } = useContractContext() // Should this all be moved to usePrivateAskContext?
  const { txStatus, handleTx, txInProgress } = useContractTransaction()
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const { setFinalizedPrivateAskDetails } = usePrivateAskContext()
  const [txError, setTxError] = useState<string>('')
  const { nft, markets } = nftData
  const { ask } = useRelevantMarket(markets)
  console.log('ASK PRICE', ask.amount)
  // ask.amount?.amount.raw

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
  // async function fillAsk({ price }: AskTxValues) {
  //   makeAskTransaction(FILL_ASK, price)
  // }

  return {
    createAsk,
    cancelAsk,
    // fillAsk,
    setSubmitting,
    isSubmitting,
    txStatus,
    txInProgress,
    txError,
  }
}
