import { DAODescriptionModal } from 'modals'

import { useNounsDaos } from 'hooks/useNounsDaos'

import React from 'react'

import { NounishAuction } from '@noun-auction'
import { Flex, Heading, Stack, StackProps } from '@zoralabs/zord'

import { daosRow, daosWrapper } from './Daos.css'

interface DaoTableProps extends StackProps {
  routePrefix?: string
}

export function DaoTable({ routePrefix, className, ...props }: DaoTableProps) {
  const { daos } = useNounsDaos()

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
          {(daos ?? [])
            .filter((d) => d.name)
            .map((dao) => (
              <NounishAuction
                dao={dao}
                showLabels
                className={daosRow}
                key={dao.contractAddress}
              />
            ))}
        </Stack>
      )}
    </Stack>
  )
}
