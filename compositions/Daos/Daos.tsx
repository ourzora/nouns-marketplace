import { DAODescriptionModal } from 'modals'

import React from 'react'
import { TypeSafeDao } from 'validators/dao'

import { lightFont } from '@noun-auction'
import { useWindowWidth } from '@shared'
import { Box, Flex, Heading, Label, Stack, StackProps } from '@zord'

import { DaoRow } from './DaoRow'
import {
  cell,
  daoMeta,
  header,
  metadataCells,
  noBorder,
  placeholderCell,
  rowWrap,
} from './DaoRow.css'
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
        <Heading as="h2" size="lg">
          DAOs
        </Heading>
        <DAODescriptionModal />
      </Flex>
      <Stack>
        {daos && isLarge && (
          <Box className={[rowWrap, noBorder, header]}>
            <Box className={[daoMeta]}></Box>
            <Box className={[metadataCells]}>
              <Box className={[cell]}>
                <Label color="tertiary" className={[lightFont]}>
                  Treasury
                </Label>
              </Box>
              <Box className={[cell]}>
                <Label color="tertiary" className={[lightFont]}>
                  Auction Status
                </Label>
              </Box>
              <Box className={[cell]}>
                <Label color="tertiary" className={[lightFont]}>
                  Current Bid
                </Label>
              </Box>
            </Box>
            <Box className={[placeholderCell]}></Box>
          </Box>
        )}

        {(daos ?? []).map((dao, index) => (
          <DaoRow dao={dao} index={index} key={dao.contractAddress} />
        ))}
      </Stack>
    </Stack>
  )
}
