import { Stack, Heading } from '@zoralabs/zord'
import { NounishAuction } from '@noun-auction'
import { daos } from 'constants/collection-addresses'
import { daosWrapper } from './Daos.css'

export function DaoTable({ routePrefix }: { routePrefix?: string }) {
  return (
    <Stack className={daosWrapper}>
      <Heading as="h2" size="lg">
        Daos
      </Heading>
      <Stack className="nounish-auction_dao-rows" gap="x4">
        {daos.map((dao) => (
          <NounishAuction
            key={dao.contractAddress}
            daoConfig={dao}
            hideCollectionTitle={false}
            routePrefix={routePrefix}
            showLabels
          />
        ))}
      </Stack>
    </Stack>
  )
}
