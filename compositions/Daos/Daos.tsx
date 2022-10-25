import { daos } from 'constants/collection-addresses'
import { DAODescriptionModal } from 'modals'

import React from 'react'

import { NounishAuction } from '@noun-auction'
import { Flex, Heading, Stack, StackProps } from '@zoralabs/zord'

import { daosRow, daosWrapper } from './Daos.css'

interface DaoTableProps extends StackProps {
  routePrefix?: string
}

export function DaoTable({ routePrefix, className, ...props }: DaoTableProps) {
  return (
    <Stack className={[daosWrapper, className]}>
      <Flex gap="x2" align="center">
        <Heading as="h2" size="lg">
          DAOs
        </Heading>

        <DAODescriptionModal />
      </Flex>
      {daos && (
        <Stack className="nounish-auction_dao-rows" gap="x4">
          {daos.map((dao) => (
            <NounishAuction
              className={daosRow}
              key={dao.contractAddress}
              daoConfig={dao}
              showLabels
            />
          ))}
        </Stack>
      )}
    </Stack>
  )
}
