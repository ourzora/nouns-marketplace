import { DocsPageWrapper } from 'components'

import { Grid, Heading, Stack } from '@zord'

export default function NounsAuctionHistory() {
  return (
    <DocsPageWrapper
      title="Active Noun Auction"
      width="100%"
      maxWidth="960px"
      useBackButton
    >
      <Grid style={{ gridTemplateColumns: '1fr' }} gap="x4">
        {/* {daos.map((dao) => {
          return (
            <NounishAuction
              key={dao.collectionAddress}
              dao={dao}
              debug
              showBidHistory
              showLabels
              layout="withHistory"
              borderColor="border"
              borderStyle="solid"
              borderWidth="normal"
              borderRadius="phat"
              backgroundColor="background1"
              p="x4"
            />
          )
        })} */}
      </Grid>
      <Grid style={{ gridTemplateColumns: '1fr 1fr' }} gap="x4">
        <Stack>
          <Heading mb="x4">Completed Nouns auction</Heading>
          {/* <NounishAuction
            dao={daos[0]}
            tokenId="152"
            debug
            showBidHistory
            showLabels
            layout="withHistory"
            borderColor="border"
            borderStyle="solid"
            borderWidth="normal"
            borderRadius="phat"
            backgroundColor="background1"
            p="x4"
          /> */}
        </Stack>
        <Stack>
          <Heading mb="x4">Completed LilNouns auction</Heading>
          {/* <NounishAuction
            dao={daos[1]}
            tokenId="3369"
            debug
            showBidHistory
            showLabels
            layout="withHistory"
            borderColor="border"
            borderStyle="solid"
            borderWidth="normal"
            borderRadius="phat"
            backgroundColor="background1"
            p="x4"
          /> */}
        </Stack>
      </Grid>
      <Grid style={{ gridTemplateColumns: '1fr 1fr' }} gap="x4">
        <Stack>
          <Heading mb="x4">Nouns No Auction: Winner nounders.eth</Heading>
          {/* <NounishAuction
            dao={daos[0]}
            tokenId="300"
            debug
            showBidHistory
            showLabels
            layout="withHistory"
            borderColor="border"
            borderStyle="solid"
            borderWidth="normal"
            borderRadius="phat"
            backgroundColor="background1"
            p="x4"
          /> */}
        </Stack>
        <Stack>
          <Heading mb="x4">LilNouns No Auction: Winner lilnounders.eth</Heading>
          {/* <NounishAuction
            dao={daos[1]}
            tokenId="3370"
            debug
            showBidHistory
            showLabels
            layout="withHistory"
            borderColor="border"
            borderStyle="solid"
            borderWidth="normal"
            borderRadius="phat"
            backgroundColor="background1"
            p="x4"
          />
          */}
        </Stack>
      </Grid>
      <Stack>
        <Heading mb="x4">Nouns Auction History</Heading>
        {/* <NounishAuction
          showAuctionRow={false}
          dao={daos[0]}
          tokenId="125"
          debug
          showBidHistory
          showLabels
          layout="historyOnly"
          borderColor="border"
          borderStyle="solid"
          borderWidth="normal"
          borderRadius="phat"
          backgroundColor="background1"
          p="x4"
        /> */}
      </Stack>
    </DocsPageWrapper>
  )
}
