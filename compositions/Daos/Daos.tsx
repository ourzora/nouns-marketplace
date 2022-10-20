// import { daos } from 'constants/collection-addresses'
import { useNounsDaos } from 'hooks/useNounsDaos'

import { NounishAuction } from '@noun-auction'
import { Box, Heading, Stack } from '@zoralabs/zord'

import { daosRow, daosWrapper } from './Daos.css'

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
