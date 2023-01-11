import NextLink from 'next/link'

import { ReactNode } from 'react'

import { placeBidTrigger } from '@noun-auction/styles/NounishStyles.css'
import { Label, LabelProps } from '@zord'

export interface CollectionLinkProps extends LabelProps {
  collectionAddress: string
  children: ReactNode
  className?: any
}

export function CollectionLink({
  collectionAddress,
  children,
  className,
  ...props
}: CollectionLinkProps) {
  return (
    <NextLink passHref href={`/collections/${collectionAddress}`}>
      <Label className={[placeBidTrigger, className]} as="a" size="md" {...props}>
        {children}
      </Label>
    </NextLink>
  )
}
