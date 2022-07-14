import { Stack, Heading, Separator } from '@zoralabs/zord'
import { NounishAuction, NounishMarketTypes } from '@noun-auction'
import { daos } from 'constants/collection-addresses'
import { daosWrapper } from './Daos.css'

export function DaoTable({ routePrefix }: { routePrefix?: string }) {
  return (
    <Stack className={daosWrapper}>
      <Heading as="h2" size="lg">
        Daos
      </Heading>
      {daos.map((dao) => (
        <Stack key={dao.collectionAddress}>
          <Separator mb="x4" />
          <NounishAuction
            contractAddress={dao.collectionAddress}
            marketType={dao.marketType as NounishMarketTypes}
            hideCollectionTitle={false}
            routePrefix={routePrefix}
            style={{ height: '68px' }}
          />
        </Stack>
      ))}
    </Stack>
  )
}
