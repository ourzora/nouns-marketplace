import { useRouter } from 'next/router'

import { useAggregate } from 'hooks'

import { useCallback, useMemo } from 'react'

import { useFirstTokenID } from '@shared/hooks'
import { NFTObject } from '@zoralabs/nft-hooks'

export function useTokenHelper(nftObj: NFTObject) {
  const router = useRouter()
  const { nft } = nftObj
  const { nftCount } = useAggregate(nft?.contract?.address!)
  const { firstTokenID, isFirstTokenIDZero } = useFirstTokenID(nft?.contract?.address!)

  const tokenID = useMemo(
    () => (nft?.tokenId ? parseInt(nft?.tokenId) : undefined),
    [nft?.tokenId]
  )

  const hasPreviousNFT = useMemo(() => {
    // !0 === true
    if (tokenID === undefined || nftCount === undefined) return false
    return tokenID > firstTokenID
  }, [firstTokenID, tokenID])

  const hasNextNFT = useMemo(() => {
    // !0 === true
    if (tokenID === undefined || nftCount === undefined) return false
    const lastTokenId =
      nftCount === 0 ? nftCount : nftCount - (isFirstTokenIDZero ? 1 : 0)
    return lastTokenId > tokenID
  }, [nftCount, tokenID, isFirstTokenIDZero])

  const handlePrev = useCallback(() => {
    tokenID && router.push(`/collections/${nft?.contract.address}/${tokenID - 1}`)
  }, [nft?.contract.address, tokenID, router])

  const handleNext = useCallback(() => {
    if (hasNextNFT) {
      tokenID && router.push(`/collections/${nft?.contract.address}/${tokenID + 1}`)
    }
  }, [hasNextNFT, tokenID, router, nft?.contract.address])

  return {
    tokenID,
    isFirstTokenIDZero,
    hasPreviousNFT,
    hasNextNFT,
    handlePrev,
    handleNext,
  }
}
