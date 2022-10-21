import { InfoIcon } from 'components/Icon/InfoIcon'
import { daos } from 'constants/collection-addresses'
import Link from 'next/link'
import { mediumFont } from 'styles/styles.css'

import { useCallback } from 'react'

import { Modal, ModalContent, useModal } from '@modal'
import { customBackground, customContent } from '@modal/Modal.css'
import { NounishAuction } from '@noun-auction'
import { Button, Flex, Heading, Paragraph, Stack, StackProps } from '@zoralabs/zord'

import { daosRow, daosWrapper } from './Daos.css'

interface DaoTableProps extends StackProps {
  routePrefix?: string
}

export function DaoTable({ routePrefix, className, ...props }: DaoTableProps) {
  const { requestClose } = useModal()

  return (
    <Stack className={[daosWrapper, className]}>
      <Flex gap="x2" align="center">
        <Heading as="h2" size="lg">
          DAOs
        </Heading>

        <Modal onOpenChange={requestClose} trigger={<InfoIcon />}>
          <ModalContent
            modalContentOverrides={customContent}
            modalBackgroundOverrides={customBackground}
            showClose={true}
            padding="x8"
          >
            <Stack gap="x8">
              <Heading as="h2">What are DAOs?</Heading>
              <Paragraph size="lg" className={mediumFont}>
                DAOs have primary auctions and a voting mechanism.
              </Paragraph>
            </Stack>
          </ModalContent>
        </Modal>
      </Flex>
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
    </Stack>
  )
}
