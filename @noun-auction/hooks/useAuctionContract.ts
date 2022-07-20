import React from 'react'
import { Auction, Auction__factory } from './../constants/nouns-builder-typechain'
import { Contract, ethers } from 'ethers'
import { useSigner } from 'wagmi'

interface auctionResponseProps {
  contract: Contract | undefined
  owner: Promise<string | undefined> | string | undefined
  auction: Auction | undefined
  auctionHouse: any
  highestBid: string | undefined
  tokenId: string | undefined
  unpause: () => Promise<void>
  pause: () => Promise<void>
  settleAuction: () => Promise<void>
  createBid: (token: number, bid: {}) => Promise<void>
  settleCurrentAndCreateNewAuction: () => Promise<void>
}

export const useAuctionContract = (address: string) => {
  const { data: signer } = useSigner()

  const contract = React.useMemo(() => {
    let contract: Auction
    if (signer) {
      contract = new Auction__factory(signer).attach(address)
    } else {
      const provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_URL)
      contract = Auction__factory.connect(address, provider)
    }

    return contract
  }, [signer, address])

  /*  get owner address */
  const [owner, setOwner] = React.useState<string | undefined>()
  React.useMemo(async () => {
    if (!contract) return
    const owner = await contract.owner()
    setOwner(owner)
  }, [contract])

  /* auction */
  const [auction, setAuction] = React.useState<Auction | undefined>()
  React.useMemo(async () => {
    if (!contract) return
    const auction = await contract.auction()
    /* @ts-ignore */
    setAuction(auction)
  }, [contract])

  /* auction house */
  const [auctionHouse, setAuctionHouse] = React.useState<Auction['house'] | undefined>()
  React.useMemo(async () => {
    if (!contract) return
    const house = await contract.house()
    /* @ts-ignore */
    setAuctionHouse(house)
  }, [contract])

  /*  unpause auction */
  const unpause = React.useCallback(async () => {
    if (!contract || !signer) return
    await contract.unpause()
  }, [contract, signer])

  /* pause auction */
  const pause = React.useCallback(async () => {
    if (!contract || !signer) return
    await contract.pause()
  }, [contract, signer])

  /* settle auction */
  const settleAuction = React.useCallback(async () => {
    if (!contract || !signer) return
    await contract.settleAuction()
  }, [contract, signer])

  /* create bid */
  // tokenId 0x092F9A6b4fa555E9D419999Fa4BDd208563B2Ba8
  const createBid = React.useCallback(
    async (id, bid) => {
      if (!contract || !signer) return
      await contract.createBid(id, bid)
    },
    [contract, signer]
  )

  /* settleCurrentAndCreateNewAuction */
  const settleCurrentAndCreateNewAuction = React.useCallback(async () => {
    if (!contract || !signer) return
    await contract.settleCurrentAndCreateNewAuction()
  }, [contract, signer])

  /* highest bid */
  const [highestBid, setHighestBid] = React.useState<string | undefined>()
  React.useMemo(async () => {
    if (!contract) return
    const highestBid = (await contract?.auction()).highestBid
    // setHighestBid(ethers.BigNumber.from(highestBid).toString())
    // setHighestBid to string - convert wei to ether
    setHighestBid(ethers.utils.formatEther(highestBid))
  }, [contract])

  /* token id */
  const [tokenId, setTokenId] = React.useState<string | undefined>()
  React.useMemo(async () => {
    if (!contract) return
    const tokenId = (await contract?.auction()).tokenId
    setTokenId(ethers.BigNumber.from(tokenId).toString())
  }, [contract])

  const response: auctionResponseProps = {
    contract,
    owner,
    auction,
    auctionHouse,
    highestBid,
    tokenId,
    unpause,
    pause,
    settleAuction,
    createBid,
    settleCurrentAndCreateNewAuction,
  }

  return { ...response }
}
