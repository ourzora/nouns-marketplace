import NextLink from 'next/link'

import { ReactNode } from 'react'

import { placeBidTrigger } from '@noun-auction/styles/NounishStyles.css'
import { Label, LabelProps } from '@zoralabs/zord'

export interface CollectionLinkProps extends LabelProps {
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
      <Label className={[placeBidTrigger, className]} as="a" size="md" {...props}>
        {children}
      </Label>
    </NextLink>
  )
}
