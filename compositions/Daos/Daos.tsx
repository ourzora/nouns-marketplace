import { Stack, Heading } from '@zoralabs/zord'
import { ActiveAuction } from '@noun-auction'
import { daoAddresses } from 'constants/collection-addresses'
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
          hideCollectionTitle={false}
          routePrefix="test/collections"
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
