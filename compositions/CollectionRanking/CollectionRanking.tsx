import { InfoIcon } from 'components/Icon/InfoIcon'
import { CollectionParsed } from 'pages'
import { mediumFont } from 'styles/styles.css'

import { Modal, ModalContent, useModal } from '@modal'
import { customBackground, customContent } from '@modal/Modal.css'
import { Flex, Heading, Paragraph, Stack, StackProps } from '@zoralabs/zord'

import { rankingWrapper } from './CollectionRanking.css'
import { RankingRow } from './RankingRow'

export const statRows = ['Volume', 'Items', 'Floor', 'Owners']

interface CollectionRankingTableProps extends StackProps {
  collections?: CollectionParsed
}

export function CollectionRanking({
  collections,
  className,
  ...props
}: CollectionRankingTableProps) {
  const { requestClose } = useModal()
  const hasCollections = useMemo(
    () => collections && collections.length > 0,
    [collections]
  )
  return (
    <Stack className={[rankingWrapper, className]}>
      <Flex gap="x2" align="center">
        <Heading as="h2" size="lg">
          Collections
        </Heading>

        <Modal onOpenChange={requestClose} trigger={<InfoIcon />}>
          <ModalContent
            modalContentOverrides={customContent}
            modalBackgroundOverrides={customBackground}
            showClose={true}
            padding="x8"
          >
            <Stack gap="x8">
              <Heading as="h2">What are Collections?</Heading>
              <Paragraph size="lg" className={mediumFont}>
                Collections do not have treasuries nor a voting mechanism.
              </Paragraph>
            </Stack>
          </ModalContent>
        </Modal>
      </Flex>
      {hasCollections && (
        <Stack
          gap={{
            '@initial': 'x4',
            '@1024': 'x6',
          }}
        >
          {collections!.map((collection) => (
            <RankingRow key={collection.address} collection={collection} />
          ))}
        </Stack>
      )}
    </Stack>
  )
}
