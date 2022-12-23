import { DAODescriptionModal } from 'modals'

import React from 'react'
import { TypeSafeDao } from 'validators/dao'

import { useWindowWidth } from '@shared'
import { Flex, Heading, Stack, StackProps } from '@zoralabs/zord'

import { DaoRow } from './DaoRow'
import { DaoTableHeader } from './DaoTableHeader'
import { daosWrapper } from './Daos.css'

interface DaoTableProps extends StackProps {
  routePrefix?: string
  daos: TypeSafeDao[]
}

export function DaoTable({ routePrefix, daos, className, ...props }: DaoTableProps) {
  console.log('DaoTable', daos)

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
        {daos && isLarge && <DaoTableHeader />}
        <ul className="nouns-dao-table">
          {daos.map((dao, index) => {
            // console.log(dao.collectionAddress)
            return (
              // <DaoRow dao={dao} index={index} key={dao.contractAddress} />
              <DaoRow dao={dao} index={index} key={dao.collectionAddress} />
            )
          })}
        </ul>
      </Stack>
    </Stack>
  )
}
