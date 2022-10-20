import Image from 'next/image'
import { avatarSizes } from 'styles/avatarSizes.css'

import React, { useMemo } from 'react'

import { AddressZero } from '@ethersproject/constants'
import { Box, BoxProps } from '@zoralabs/zord'

import { Avatar } from '../Avatar'
import { ImageBoundaryWithFallback } from '../ImageBoundaryWithFallback'
import * as styles from './AvatarImage.css'

export interface AvatarImageProps extends Omit<BoxProps, 'size'> {
  address?: string | null
  isEns?: boolean
  variant?: keyof typeof styles.borderVariants['variant']
  size?: keyof typeof avatarSizes
  style?: React.CSSProperties
  src?: string
}

export function AvatarImage({
  address = '',
  src,
  size,
  variant,
  isEns,
  style = {},
  ...props
}: AvatarImageProps) {
  const normalizedAddress = useMemo(
    () => address?.toLowerCase() || AddressZero,
    [address]
  )

  return src ? (
    <Box
      position="relative"
      borderRadius="round"
      overflow="hidden"
      className={[styles.avatar({ size }), styles.indexPrimary]}
      {...props}
    >
      <Box
        position="absolute"
        inset="x0"
        borderRadius="round"
        className={[styles.border({ variant }), styles.indexPrimary]}
      />
      <ImageBoundaryWithFallback src={src} alt={address || 'user-avatar'}>
        {isEns ? (
          <Box
            as="img"
            key={src}
            src={src}
            alt={address || ''}
            width="100%"
            objectFit="cover"
          />
        ) : (
          <Image
            key={src}
            src={src}
            alt={address || ''}
            quality={75}
            layout="fill"
            objectFit="cover"
            width="100%"
          />
        )}
      </ImageBoundaryWithFallback>
    </Box>
  ) : (
    <Avatar size={size} variant={variant} address={normalizedAddress} {...props} />
  )
}
