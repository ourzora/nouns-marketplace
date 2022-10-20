import { placeBidTrigger } from '@noun-auction/styles/NounishStyles.css'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Label, LabelProps } from '@zoralabs/zord'
import { ReactNode } from 'react'

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
