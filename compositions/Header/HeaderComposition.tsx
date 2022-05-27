import { Flex } from '@zoralabs/zord/elements'
import { HeaderNav } from './HeaderNav'
import { headerWrapper } from './Header.css'

export function Header() {
  return (
    <Flex as="header" p="x4" position="relative" className={headerWrapper}>
      <HeaderNav />
    </Flex>
  )
}
