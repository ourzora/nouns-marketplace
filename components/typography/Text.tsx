import React, { ElementType, ForwardedRef, forwardRef } from 'react'
import { Text as ZordText, TextProps } from '@zoralabs/zord'
import { text, textVariants } from './Text.css'
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithRef,
  PolymorphicPropsWithoutRef,
} from 'react-polymorphic-types'

export const TextDefaultElement = 'div'

export interface NounTextProps extends TextProps {
  variant?: keyof typeof textVariants['variant']
}

// export type TextComponentProps<E extends ElementType = typeof TextDefaultElement> =
//   PolymorphicPropsWithRef<TextProps, E>

export function InnerText<E extends ElementType = typeof TextDefaultElement>(
  {
    children,
    variant = 'paragraph-md',
    className,
    ...props
  }: PolymorphicPropsWithoutRef<NounTextProps, E>,
  ref?: ForwardedRef<E>
) {
  return (
    <ZordText
      ref={ref}
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

export const Text: PolymorphicForwardRefExoticComponent<
  NounTextProps, // Limits props to Noun subset via textVariants, rather than the full Zord set
  typeof TextDefaultElement
> = forwardRef(InnerText)
export interface HeadingProps extends TextProps {
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
  size?: 'sm' | 'md'
}

export type ParagraphComponentProps<E extends ElementType = typeof TextDefaultElement> =
  PolymorphicPropsWithRef<ParagraphProps, E>

export function Paragraph<E extends ElementType = typeof TextDefaultElement>({
  variant,
  // size = 'md',
  ...props
}: ParagraphComponentProps<E>) {
  return (
    <Text
      // variant={`paragraph-${size}`}
      variant="paragraph-md"
      {...props}
    />
  )
}

export function Span<E extends ElementType = typeof TextDefaultElement>({
  variant,
  ...props
}: ParagraphComponentProps<E>) {
  return <Text variant={`paragraph-sm`} {...props} />
}

// TODO: replace all <Display... > with <Heading size="xl" ....>
// Eyebrow
// Label - uh oh
// Display - NADA
// MenuText - NADA
