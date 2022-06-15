import { Flex } from '@zoralabs/zord'
import { PoweredByZora } from '@zora-brand'
import { footerWrapper } from './Footer.css'

export function FooterComposition() {
  return (
    <Flex as="footer" className={footerWrapper}>
      <PoweredByZora size={48} />
    </Flex>
  )
}
