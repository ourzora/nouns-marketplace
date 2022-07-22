// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'
import { daos } from 'constants/collection-addresses'
// import { ContractAuctionData } from '@noun-auction'
import { nounsTokenAbi } from '@noun-auction'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { contract, id } = req.query

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
  } catch (err) {
    return res.status(403).json({ auction: undefined })
  }
}

export default handler
