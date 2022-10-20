import { Stack, Heading, Box } from '@zoralabs/zord'
import { NounishAuction } from '@noun-auction'
// import { daos } from 'constants/collection-addresses'
import { daosWrapper, daosRow } from './Daos.css'
import { useNounsDaos } from 'hooks/useNounsDaos'

export function DaoTable() {
  const { daos } = useNounsDaos()

  return (
    <Stack className={daosWrapper}>
      <Heading as="h2" size="lg">
        Daos
      </Heading>
      <Stack className="nounish-auction_dao-rows" gap="x4">
        {(daos ?? [])
          .filter((d) => d.name)
          .map((dao) => (
            <Box className={daosRow} key={dao.collectionAddress}>
              <NounishAuction dao={dao} showLabels />
            </Box>
          ))}
      </Stack>
    </Stack>
  )
}
