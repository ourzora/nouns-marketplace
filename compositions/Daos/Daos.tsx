import { Stack, Heading } from '@zoralabs/zord'
import { ActiveAuction, NounishMarketTypes } from '@noun-auction'
import { daos } from 'constants/collection-addresses'
import { daosWrapper } from './Daos.css'

export function DaoTable({ routePrefix }: { routePrefix?: string }) {
  return (
    <Stack className={daosWrapper}>
      <Heading as="h2" size="lg">
        Daos
      </Heading>
      {daos.map((dao) => (
        <ActiveAuction
          key={dao.collectionAddress}
          contractAddress={dao.collectionAddress}
          marketType={dao.marketType as NounishMarketTypes}
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
