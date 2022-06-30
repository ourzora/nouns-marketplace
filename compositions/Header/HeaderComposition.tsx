import { Flex } from '@zoralabs/zord'
import { HeaderNav } from './HeaderNav'
import { headerWrapper } from './Header.css'

export function HeaderComposition() {
  return (
    <Flex
      as="header"
      w="100%"
      p={{
        '@initial': 'x4',
        '@1024': 'x10',
      }}
      position="relative"
      className={headerWrapper}
    >
      <HeaderNav />
    </Flex>
  )
}
