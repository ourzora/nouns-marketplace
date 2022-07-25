import { placeBidTrigger } from '@noun-auction/styles/NounishStyles.css'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Label, LabelProps } from '@zoralabs/zord'
import { ReactNode } from 'react'

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
