import { Flex } from '@zoralabs/zord'
import { PoweredByZora } from '@zora-brand'
import { footerWrapper } from './Footer.css'
import { useWindowWidth } from 'hooks/useWindowWidth'

export function FooterComposition() {
  const { isLarge } = useWindowWidth()

  return (
    <Flex as="footer" className={footerWrapper}>
      <PoweredByZora size={isLarge ? 48 : 32} />
    </Flex>
  )
}
