import { Stack, Heading } from '@zoralabs/zord'
import { ActiveAuction, useNounAuction } from '@noun-auction'
import { daoAddresses } from 'utils/collection-addresses'
import { daosWrapper } from './Daos.css'

export function DaoTable() {
  return (
    <Stack className={daosWrapper}>
      <Heading as="h2" size="lg">
        Daos
      </Heading>
      {daoAddresses.map((address) => (
        <ActiveAuction
          key={address}
          auctionRenderer="CurrentBid"
          backgroundColor="primary"
          borderColor="secondary"
          borderStyle="solid"
          borderWidth="normal"
          borderRadius="phat"
          flexDirection="row"
          wrapperDirection="row"
          thumbnailSize="md"
        />
      ))}
    </Stack>
  )
}
