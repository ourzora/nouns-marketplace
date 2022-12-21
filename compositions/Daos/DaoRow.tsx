import { useBalance } from 'wagmi'

import { Link } from 'components'
import { Button } from 'components/Button'

import { useToken } from 'hooks/useToken'

import { TypeSafeDao } from 'validators/dao'

import { EthAmount, RPCTokenInfo, lightFont, useNounishAuctionQuery } from '@noun-auction'
import { numberFormatter, useWindowWidth } from '@shared'
import { Box, Flex, Label } from '@zoralabs/zord'

import {
  cardHeader,
  cell,
  daoMeta,
  metadataCells,
  mobileCardWrapper,
  mobileCell,
  noBorder,
  rowWrap,
} from './DaoRow.css'

export const DaoRow = ({ dao, index }: { dao: TypeSafeDao; index: number }) => {
  const { activeAuction } = useNounishAuctionQuery({
    collectionAddress: dao.collectionAddress,
  })

  const { token } = useToken({
    collectionAddress: dao.collectionAddress,
    tokenId: activeAuction?.tokenId ?? '',
  })

  if (!token || !activeAuction) return null

  const highestBid = activeAuction.highestBidPrice?.chainTokenPrice?.raw || '0'
  const tokenId = activeAuction.tokenId
  const collectionAddress = activeAuction.collectionAddress

  const auctionStatus =
    Date.now() - parseInt(activeAuction.endTime) * 1000 > 0 ? 'Settling' : 'Live'

  return (
    <DaoRowComponent
      index={index}
      tokenId={tokenId}
      tokenName={token.name}
      collectionAddress={collectionAddress}
      contractAddress={dao.contractAddress}
      collectionName={dao.name ?? token.collectionName ?? '...'}
      highestBid={highestBid}
      treasuryAddress={dao.treasuryAddress}
      tokenImage={token?.image.url ?? undefined}
      auctionStatus={auctionStatus}
    />
  )
}

type DaoRowProps = {
  index: number
  tokenId: string
  collectionAddress: string
  tokenImage?: string
  collectionName: string
  tokenName: string
  highestBid: string
  treasuryAddress: string
  auctionStatus: string
  contractAddress: string
}

export const DaoRowComponent = ({
  index,
  collectionAddress,
  contractAddress,
  tokenId,
  tokenImage,
  tokenName,
  collectionName,
  highestBid,
  treasuryAddress,
  auctionStatus,
}: DaoRowProps) => {
  const { data: treasury } = useBalance({
    addressOrName: treasuryAddress,
  })

  const { isLarge } = useWindowWidth()

  if (!isLarge) {
    return (
      <Box className={[mobileCardWrapper]}>
        <Box className={cardHeader}>
          <RPCTokenInfo
            tokenImage={tokenImage}
            tokenId={tokenId}
            tokenName={tokenName}
            collectionAddress={collectionAddress}
            collectionName={collectionName}
            cursor="pointer"
          />
          <Box>
            <Link href={`/collections/${collectionAddress}`} passHref>
              <Button variant="secondary" as="a">
                View
              </Button>
            </Link>
          </Box>
        </Box>
        <Flex wrap>
          <Box className={mobileCell}>
            <Label color="tertiary" className={[lightFont]}>
              Current Bid
            </Label>
            <EthAmount ethAmount={highestBid} />
          </Box>
          <Box className={mobileCell}>
            <Label color="tertiary" className={[lightFont]}>
              Auction Status
            </Label>
            {auctionStatus}
          </Box>
          <Box className={mobileCell}>
            <Label color="tertiary" className={[lightFont]}>
              Treasury
            </Label>
            {treasury?.formatted ? numberFormatter(treasury?.formatted) : '...'}
            {` ${treasury?.symbol ?? ''}`}
          </Box>
          <Box className={mobileCell}>
            <Label color="tertiary" className={[lightFont]}>
              Proposals
            </Label>
          </Box>
        </Flex>
      </Box>
    )
  }

  return (
    <Box className={[rowWrap, index === 0 ? noBorder : '']}>
      <Box className={[daoMeta]}>
        <RPCTokenInfo
          tokenImage={tokenImage}
          tokenName={tokenName}
          tokenId={tokenId}
          collectionAddress={collectionAddress}
          collectionName={collectionName}
          cursor="pointer"
        />
      </Box>
      <Box className={[metadataCells]}>
        <Box className={[cell]}>
          {treasury?.formatted ? numberFormatter(treasury?.formatted) : '...'}
          {` ${treasury?.symbol}`}
        </Box>
        <Box className={[cell]}>{auctionStatus}</Box>
        <Box className={[cell]}>
          <EthAmount ethAmount={highestBid} />
        </Box>
      </Box>
      <Link href={`/collections/${contractAddress}`} passHref>
        <Button variant="secondary" as="a">
          View
        </Button>
      </Link>
    </Box>
  )
}
