import { DAODescriptionModal } from 'modals'

import React from 'react'
import { TypeSafeDao } from 'validators/dao'

import { useWindowWidth } from '@shared'
import { Box, Flex, Heading, Span, Stack, StackProps } from '@zord'

import { DaoRow } from './DaoRow'
import { cell, daoMeta, header, metadataCells, placeholderCell } from './DaoRow.css'
import { daosWrapper } from './Daos.css'

interface DaoTableProps extends StackProps {
  routePrefix?: string
  daos: TypeSafeDao[]
}

export function DaoTable({ routePrefix, className, daos, ...props }: DaoTableProps) {
  const { isLarge } = useWindowWidth()
  return (
    <Stack className={[daosWrapper, className]} {...props}>
      <Flex gap="x2" align="center">
        <Heading as="h2">DAOs</Heading>
        <DAODescriptionModal />
      </Flex>
      <Stack>
        {daos && isLarge && (
          <Flex className={[header]}>
            <Box className={[daoMeta]}></Box>
            <Box className={[metadataCells]}>
              <Box className={[cell]}>
                <Span color="tertiary">Treasury</Span>
              </Box>
              <Box className={[cell]}>
                <Span color="tertiary">Auction Status</Span>
              </Box>
              <Box className={[cell]}>
                <Span color="tertiary">Current Bid</Span>
              </Box>
            </Box>
            <Box className={[placeholderCell]}></Box>
          </Flex>
        )}
        <Stack as="ul">
          {(daos ?? []).map((dao) => (
            <DaoRow dao={dao} key={dao.contractAddress} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
