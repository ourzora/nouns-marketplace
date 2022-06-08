import { Box, Paragraph, Stack, Flex, Icon } from '@zoralabs/zord'
import { RawDisplayer } from './utils'
import { useContractProvider } from 'providers/ContractProvider'

export function CollectionInfo() {
  const { contractURIData } = useContractProvider()

  console.log(contractURIData)

  if (!contractURIData) {
    return null
  }

  return (
    <Stack align="center" gap="x4" mx="auto" mb="x10" style={{ maxWidth: 1240 }}>
      <Box w="x12" h="x12" as="img" src={contractURIData.image} />
      <Paragraph>{contractURIData.description}</Paragraph>
      <Flex
        gap="x2"
        as="a"
        href={contractURIData.external_link}
        align="center"
        px="x4"
        py="x2"
        backgroundColor="tertiary"
        borderRadius="curved"
      >
        <span>{contractURIData.external_link}</span> <Icon id="ArrowRightAngle" />
      </Flex>
      <RawDisplayer data={contractURIData} />
    </Stack>
  )
}
