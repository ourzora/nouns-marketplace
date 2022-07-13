import { ActiveAuction } from '@noun-auction'
import { daos } from 'constants/collection-addresses'
import { TestPageWrapper } from 'components/utils/TestPageWrapper'
import { Grid, Heading, Stack } from '@zoralabs/zord'

export default function NounsAuctionHistory() {
  return (
    <TestPageWrapper title="Active Noun Auction" width="100%" maxWidth="100%">
      <Grid style={{ gridTemplateColumns: '1fr 1fr' }} gap="x4">
        {daos.map((dao) => {
          console.log(dao.classifierPrefix)
          return (
            <ActiveAuction
              key={dao.collectionAddress}
              contractAddress={dao.collectionAddress}
              marketType={dao.marketType}
              classifierPrefix={dao.classifierPrefix}
              hideCollectionTitle={false}
              backgroundColor="primary"
              borderColor="secondary"
              borderStyle="solid"
              borderWidth="normal"
              borderRadius="phat"
              flexDirection="row"
              wrapperDirection="row"
              thumbnailSize="md"
              debug
              showBidHistory
            />
          )
        })}
        <Stack>
          <Heading mb="x4">Completed Nouns auction</Heading>
          <ActiveAuction
            contractAddress={daos[0].collectionAddress}
            marketType={daos[0].marketType}
            classifierPrefix={daos[0].classifierPrefix}
            tokenId="152"
            hideCollectionTitle={false}
            backgroundColor="primary"
            borderColor="secondary"
            borderStyle="solid"
            borderWidth="normal"
            borderRadius="phat"
            flexDirection="row"
            wrapperDirection="row"
            thumbnailSize="md"
            debug
            showBidHistory
          />
        </Stack>
        <Stack>
          <Heading mb="x4">Completed LilNouns auction</Heading>
          <ActiveAuction
            contractAddress={daos[1].collectionAddress}
            marketType={daos[1].marketType}
            classifierPrefix={daos[1].classifierPrefix}
            tokenId="3266"
            hideCollectionTitle={false}
            backgroundColor="primary"
            borderColor="secondary"
            borderStyle="solid"
            borderWidth="normal"
            borderRadius="phat"
            flexDirection="row"
            wrapperDirection="row"
            thumbnailSize="md"
            debug
            showBidHistory
          />
        </Stack>
      </Grid>
    </TestPageWrapper>
  )
}
