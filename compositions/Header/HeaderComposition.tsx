import { Flex } from '@zoralabs/zord/elements'
import { HeaderNav } from './HeaderNav'
import { headerWrapper } from './Header.css'

export function Header() {
  return (
    <Flex as="header" p="x4" position="sticky" top="x0" className={headerWrapper}>
      <HeaderNav />
    </Flex>
  )
}
