import { Text } from '@zoralabs/zord'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { useRouter } from 'next/router'

export interface LinkProps extends NextLinkProps {
  children: React.ReactNode
}

export function Link({ children, href, ...otherProps }: LinkProps) {
  const router = useRouter()
  const active = router.pathname === href // FIXME: this doesn't work

  return (
    <NextLink href={href} passHref {...otherProps}>
      <Text as="a" variant="label-md" color={active ? 'primary' : 'secondary'}>
        {children}
      </Text>
    </NextLink>
  )
}
