import { Box, Heading, Icon, Flex, Label, Stack } from '@zoralabs/zord'
import { ModalComposition } from '@modal'
import { collectionTrigger } from './../Header.css'
import { CollectionLink } from './CollectionLink'
import { collectionAddresses } from 'utils/collection-addresses'

export function CollectionLinks() {
  return (
    <ModalComposition
      modalName={`collections-menu`}
      trigger={
        <Flex align="center" className={collectionTrigger}>
          <Label py="x2" as="span" display="flex" align="center" h="100%" size="lg">
            {/*currentCollection*/}&nbsp;
          </Label>
          <Icon id="ChevronDown" size="md" />
        </Flex>
      }
      content={
        <Box p="x8">
          <Stack gap="x6">
            <Heading>Explore Collections {collectionAddresses.length}</Heading>
            {collectionAddresses.map((address) => (
              <CollectionLink key={address} collectionAddress={address} />
            ))}
          </Stack>
        </Box>
      }
    />
  )
}
