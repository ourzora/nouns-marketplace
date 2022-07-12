import { Stack, Heading } from '@zoralabs/zord'
import { ActiveAuction } from '@noun-auction'
import { daoAddresses } from 'constants/collection-addresses'
import { daosWrapper } from './Daos.css'

export function DaoTable({ routePrefix }: { routePrefix?: string }) {
  return (
    <Stack className={daosWrapper}>
      <Heading as="h2" size="lg">
        Daos
      </Heading>
      {daoAddresses.map((address) => (
        <ActiveAuction
          key={address}
          hideCollectionTitle={false}
          routePrefix={routePrefix}
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
