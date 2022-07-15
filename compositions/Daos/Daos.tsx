import { Stack, Heading, Separator } from '@zoralabs/zord'
import { NounishAuction } from '@noun-auction'
import { daos } from 'constants/collection-addresses'
import { daosWrapper } from './Daos.css'

export function DaoTable({ routePrefix }: { routePrefix?: string }) {
  return (
    <Stack className={daosWrapper}>
      <Heading as="h2" size="lg">
        Daos
      </Heading>
      {daos.map((dao) => (
        <Stack key={dao.contractAddress}>
          <Separator mb="x4" />
          <NounishAuction
            daoConfig={dao}
            hideCollectionTitle={false}
            routePrefix={routePrefix}
          />
        </Stack>
      ))}
    </Stack>
  )
}
