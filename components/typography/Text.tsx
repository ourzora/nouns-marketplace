import React, { ElementType, ForwardedRef, forwardRef } from 'react'
import {
  Box,
  //   BoxDefaultElement,
  BoxProps,
  Text as ZordText,
  TextProps,
} from '@zoralabs/zord'
import { text, textVariants } from './Text.css'
// import { Box, BoxDefaultElement, BoxProps }
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithRef,
  PolymorphicPropsWithoutRef,
} from 'react-polymorphic-types'

export const TextDefaultElement = 'div'

export interface NounTextProps extends TextProps {
  variant?: keyof typeof textVariants['variant']
  //   size?: keyof typeof buttonVariants['size']
  //   title?: string
  //   target?: string
  //   as?: React.ReactNode
  //   as?: ElementType<any>
  //   onClick?: MouseEventHandler<HTMLButtonElement> | (() => void)
}

export function Text({
  children,
  //   as,
  //   variant = 'primary',
  variant = 'paragraph-md',
  //   gap,
  //   loading,
  //   size,
  //   icon,
  //   iconAlign,
  //   iconSize,
  //   onClick,
  className,
  //   title,
  //   target,
  ...props
}: NounTextProps) {
  return (
    <ZordText
      //   as={as}
      variant={variant}
      {...props}
      className={[
        text({
          //   loading,
          //   size,
          variant,
        }),
        className,
      ]}
    >
      {children}
    </ZordText>
  )
}

export interface HeadingProps extends Omit<TextProps, 'variant'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' // map to h5 -> h1 in noun.market Figma
}

export type HeadingComponentProps<E extends ElementType = typeof TextDefaultElement> =
  PolymorphicPropsWithRef<HeadingProps, E>

export function Heading<E extends ElementType = typeof TextDefaultElement>({
  size = 'md',
  variant,
  ...props
}: HeadingComponentProps<E>) {
  return <Text variant={`heading-${size}`} {...props} />
}

export interface ParagraphProps extends Omit<TextProps, 'variant'> {
  //   size?: 'xs' | 'sm' | 'md' | 'lg'
  //   size?: 'xs' | 'sm' | 'md' | 'lg'
}

export type ParagraphComponentProps<E extends ElementType = typeof TextDefaultElement> =
  PolymorphicPropsWithRef<ParagraphProps, E>

export function Paragraph<E extends ElementType = typeof TextDefaultElement>({
  variant,
  ...props
}: ParagraphComponentProps<E>) {
  //   return <Text variant={`paragraph-${size}`} {...props} />
  return <Text variant="paragraph-md" {...props} />
}

// TODO: replace all <Display... > with <Heading size="h1" ....>
