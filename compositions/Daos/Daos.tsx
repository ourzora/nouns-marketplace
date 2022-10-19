import { daos } from 'constants/collection-addresses'

import { NounishAuction } from '@noun-auction'
import { Box, Heading, Stack, StackProps } from '@zoralabs/zord'

import { daosRow, daosWrapper } from './Daos.css'

interface DaoTableProps extends StackProps {
  routePrefix?: string
}

export function DaoTable({ routePrefix, className, ...props }: DaoTableProps) {
  return (
    <Stack className={[daosWrapper, className]}>
      <Heading as="h2" size="lg">
        Daos
      </Heading>
      <Stack className="nounish-auction_dao-rows" gap="x4">
        {daos.map((dao) => (
          <Box className={daosRow} key={dao.contractAddress}>
            <NounishAuction daoConfig={dao} showLabels />
          </Box>
        ))}
      </Stack>
    </Stack>
  )
}
