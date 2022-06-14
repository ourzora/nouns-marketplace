import { Flex } from '@zoralabs/zord'
import { PoweredByZora } from '@zora-brand'

export function FooterComposition() {
  return (
    <Flex as="footer" w="100%" justify="center" py="x22">
      <PoweredByZora size={48} />
    </Flex>
  )
}
