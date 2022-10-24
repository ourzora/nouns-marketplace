import { InfoIcon } from 'components/Icon/InfoIcon'
import { daos } from 'constants/collection-addresses'
import { mediumFont } from 'styles/styles.css'

import React, { useMemo } from 'react'

import { Modal, ModalContent, useModal } from '@modal'
import { customBackground, customContent } from '@modal/Modal.css'
import { NounishAuction } from '@noun-auction'
import { Flex, Heading, Paragraph, Stack, StackProps } from '@zoralabs/zord'

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
              <Stack gap="x4">
                <Paragraph size="sm" className={mediumFont}>
                  Nouns styled DAOs are interesting for 3 main reasons:
                </Paragraph>
                <Stack as="ul" gap="x2">
                  <Paragraph as="li" size="sm" className={mediumFont}>
                    <strong>Distribution Mechanism:</strong> Creating an NFT at a
                    consistent interval allows the community to form at a healthy rate
                    rather than distributing governance via a mass airdrop
                  </Paragraph>
                  <Paragraph as="li" size="sm" className={mediumFont}>
                    <strong>Composable and Upgradable:</strong> All contracts are
                    individually upgradable meaning the DAO is not a static thing, but
                    rather something that is meant to evolve over time
                  </Paragraph>
                  <Paragraph as="li" size="sm" className={mediumFont}>
                    <strong>Perpetual Funding:</strong> The DAO creates sustainable
                    funding by consistently issuing new NFTs over time
                  </Paragraph>
                </Stack>
              </Stack>
            </Stack>
          </ModalContent>
        </Modal>
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
