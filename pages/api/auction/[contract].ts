// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { daos } from 'constants/collection-addresses'

type AuctionData = {
  auction:
    | {
        nounId: string
        amount: string
        startTime: string
        endTime: string
        bidder: string
        settled: boolean
      }
    | undefined
}

export default function handler(req: NextApiRequest, res: NextApiResponse<AuctionData>) {
  const { contract } = req.query
  const dao = daos.find((dao) => dao.auctionContractAddress === contract)

  if (!dao) {
    return res.status(403).json({ auction: undefined })
  }

  try {
    const ethersContract = new ethers.Contract(
      contract as string,
      dao.abi,
      new ethers.providers.StaticJsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL)
    )

    async function readAuctionState() {
      const auction = await ethersContract.auction()

      return res.status(200).json({
        auction: {
          nounId: auction.nounId.toString(),
          amount: auction.amount.toString(),
          startTime: auction.startTime.toString(),
          endTime: auction.endTime.toString(),
          bidder: auction.bidder,
          settled: auction.settled,
        },
      })
    }

    readAuctionState()
  } catch (err) {
    return res.status(403).json({ auction: undefined })
  }
}
