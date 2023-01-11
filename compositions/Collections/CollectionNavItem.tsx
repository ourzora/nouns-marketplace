import NextLink from 'next/link'
import { useRouter } from 'next/router'

import React from 'react'

import { Box, Flex, FlexProps, Label } from '@zord'
import { mixins } from '@zord/config'

import { ActiveCollectionPageView } from './CollectionNav'
import * as styles from './CollectionNav.css'

interface CollectionNavItemProps extends FlexProps {
  count?: number
  collectionAddress: string
  pageSection: ActiveCollectionPageView
  setActiveView: React.Dispatch<React.SetStateAction<ActiveCollectionPageView>>
}

export function CollectionNavItem({
  count,
  className,
  children,
  collectionAddress,
  pageSection,
  setActiveView,
  ...props
}: CollectionNavItemProps) {
  const { asPath } = useRouter()
  const href = `/collections/${collectionAddress}#${pageSection}`
  const active = asPath === href
  const hasCount = typeof count !== undefined // ensures that zero count will show

  return (
    <NextLink href={href} passHref {...props}>
      <a onClick={() => setActiveView(pageSection)}>
        <Flex
          className={[styles.navItem, mixins({ hoverFadeOut: true })]}
          pos="relative"
          gap="x1"
          pb="x2"
          {...props}
        >
          <Label size="sm" textTransform="capitalize">
            {children}
          </Label>

          {hasCount && (
            <Label size="sm" color="tertiary">
              {count?.toString()}
            </Label>
          )}

          {active && (
            <Box
              className={styles.activeLine}
              pos="absolute"
              left="x0"
              w="100%"
              borderRadius="round"
            />
          )}
        </Flex>
      </a>
    </NextLink>
  )
}
