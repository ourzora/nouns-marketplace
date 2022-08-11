import { NounishAuction } from '@noun-auction'
import { daos } from 'constants/collection-addresses'
import { DocsPageWrapper } from 'components/utils/DocsPageWrapper'
import { Grid, Heading, Stack } from '@zoralabs/zord'

export default function NounsAuctionHistory() {
  return (
    <DocsPageWrapper
      title="Active Noun Auction"
      width="100%"
      maxWidth="960px"
      useBackButton
    >
      <Grid style={{ gridTemplateColumns: '1fr' }} gap="x4">
        {daos.map((dao) => {
          return (
            <NounishAuction
              key={dao.contractAddress}
              daoConfig={dao}
              debug
              showBidHistory
              showLabels
              layout="withHistory"
              /* Wrapper Styling */
              borderColor="secondary"
              borderStyle="solid"
              borderWidth="normal"
              borderRadius="phat"
              backgroundColor="primary"
              p="x4"
            />
          )
        })}
      </Grid>
      <Grid style={{ gridTemplateColumns: '1fr 1fr' }} gap="x4">
        <Stack>
          <Heading mb="x4">Completed Nouns auction</Heading>
          <NounishAuction
            daoConfig={daos[0]}
            tokenId="152"
            debug
            showBidHistory
            showLabels
            layout="withHistory"
            /* Wrapper Styling */
            borderColor="secondary"
            borderStyle="solid"
            borderWidth="normal"
            borderRadius="phat"
            backgroundColor="primary"
            p="x4"
          />
        </Stack>
        <Stack>
          <Heading mb="x4">Completed LilNouns auction</Heading>
          <NounishAuction
            daoConfig={daos[1]}
            tokenId="3369"
            debug
            showBidHistory
            showLabels
            layout="withHistory"
            /* Wrapper Styling */
            borderColor="secondary"
            borderStyle="solid"
            borderWidth="normal"
            borderRadius="phat"
            backgroundColor="primary"
            p="x4"
          />
        </Stack>
      </Grid>
      <Grid style={{ gridTemplateColumns: '1fr 1fr' }} gap="x4">
        <Stack>
          <Heading mb="x4">Nouns No Auction: Winner nounders.eth</Heading>
          <NounishAuction
            daoConfig={daos[0]}
            tokenId="300"
            debug
            showBidHistory
            showLabels
            layout="withHistory"
            /* Wrapper Styling */
            borderColor="secondary"
            borderStyle="solid"
            borderWidth="normal"
            borderRadius="phat"
            backgroundColor="primary"
            p="x4"
          />
        </Stack>
        <Stack>
          <Heading mb="x4">LilNouns No Auction: Winner lilnounders.eth</Heading>
          <NounishAuction
            daoConfig={daos[1]}
            tokenId="3370"
            debug
            showBidHistory
            showLabels
            layout="withHistory"
            /* Wrapper Styling */
            borderColor="secondary"
            borderStyle="solid"
            borderWidth="normal"
            borderRadius="phat"
            backgroundColor="primary"
            p="x4"
          />
        </Stack>
      </Grid>
      <Stack>
        <Heading mb="x4">Nouns Auction History</Heading>
        <NounishAuction
          showAuctionRow={false}
          daoConfig={daos[0]}
          tokenId="125"
          debug
          showBidHistory
          showLabels
          layout="historyOnly"
          /* Wrapper Styling */
          borderColor="secondary"
          borderStyle="solid"
          borderWidth="normal"
          borderRadius="phat"
          backgroundColor="primary"
          p="x4"
        />
      </Stack>
    </DocsPageWrapper>
  )
}
