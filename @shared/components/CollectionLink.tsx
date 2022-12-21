import NextLink from 'next/link'

import { ReactNode } from 'react'

import { Button, ButtonProps } from '@zord'

export interface CollectionLinkProps extends ButtonProps {
  contractAddress: string
  children: ReactNode
  className?: any
}

export function CollectionLink({
  contractAddress,
  children,
  className,
  ...props
}: CollectionLinkProps) {
  return (
    <NextLink passHref href={`/collections/${contractAddress}`}>
      <Button as="a" {...props}>
        {children}
      </Button>
    </NextLink>
  )
}
