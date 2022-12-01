import React, { ElementType } from 'react'
import type { PolymorphicPropsWithRef } from 'react-polymorphic-types'

import { tag } from './Tag.css'
import { Text, TextProps } from './Text'

export interface TagProps extends TextProps {
  active?: boolean
  inactive?: boolean
  showDot?: boolean
}

export type TagComponentProps<E extends ElementType> = PolymorphicPropsWithRef<
  TagProps,
  E
>

export function Tag({
  active,
  className,
  children,
  inactive,
  showDot,
  ...props
}: TagProps) {
  return (
    <Text
      className={['zord-tag', tag({ active, inactive, showDot }), className]}
      {...props}
    >
      {children}
    </Text>
  )
}
