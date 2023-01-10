import * as React from 'react'
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithRef,
  PolymorphicPropsWithoutRef,
} from 'react-polymorphic-types'

import { Atoms, atoms } from '../atoms'
import { Box, BoxDefaultElement, BoxProps } from './Box'
import { text, textVariants } from './Text.css'

export { textVariants }

export interface TextProps extends BoxProps {
  align?: Atoms['textAlign']
  inline?: boolean
  italic?: boolean
  textTransform?: Atoms['textTransform']
  variant?: keyof typeof textVariants['variant']
}

export type TextComponentProps<E extends React.ElementType = typeof BoxDefaultElement> =
  PolymorphicPropsWithRef<TextProps, E>

export function InnerText<E extends React.ElementType = typeof BoxDefaultElement>(
  {
    align,
    className,
    inline,
    italic,
    textTransform,
    variant,
    ...props
  }: PolymorphicPropsWithoutRef<TextProps, E>,
  ref?: React.ForwardedRef<E>
) {
  return (
    <Box
      ref={ref}
      display={inline ? 'inline-block' : undefined}
      align={align}
      className={[
        'zord-text',
        variant && `zord-text-${variant}`,
        text({
          variant,
          italic,
        }),
        atoms({
          textTransform,
        }),
        className,
      ]}
      {...props}
    />
  )
}

export const Text: PolymorphicForwardRefExoticComponent<
  TextProps,
  typeof BoxDefaultElement
> = React.forwardRef(InnerText)

export interface ParagraphProps extends Omit<TextProps, 'variant'> {
  size?: 'sm' | 'md'
}

export type ParagraphComponentProps<
  E extends React.ElementType = typeof BoxDefaultElement
> = PolymorphicPropsWithRef<ParagraphProps, E>

export function Paragraph<E extends React.ElementType = typeof BoxDefaultElement>({
  size = 'md',
  variant,
  ...props
}: ParagraphComponentProps<E>) {
  return <Text variant={`paragraph-${size}`} {...props} />
}

export interface HeadingProps extends Omit<TextProps, 'variant'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export type HeadingComponentProps<
  E extends React.ElementType = typeof BoxDefaultElement
> = PolymorphicPropsWithRef<HeadingProps, E>

export function Heading<E extends React.ElementType = typeof BoxDefaultElement>({
  size = 'md',
  variant,
  ...props
}: HeadingComponentProps<E>) {
  return <Text variant={`heading-${size}`} {...props} />
}

export interface EyebrowProps extends Omit<TextProps, 'variant'> {}

export type EyebrowComponentProps<
  E extends React.ElementType = typeof BoxDefaultElement
> = PolymorphicPropsWithRef<EyebrowProps, E>

export function Eyebrow<E extends React.ElementType = typeof BoxDefaultElement>({
  variant,
  ...props
}: EyebrowComponentProps<E>) {
  return <Text variant="eyebrow" {...props} />
}

export interface LabelProps extends Omit<TextProps, 'variant'> {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  passhref?: string
}

export type LabelComponentProps<E extends React.ElementType = typeof BoxDefaultElement> =
  PolymorphicPropsWithRef<LabelProps, E>

export function Label<E extends React.ElementType = typeof BoxDefaultElement>({
  size = 'md',
  ...props
}: LabelComponentProps<E>) {
  return <Text variant={`label-${size}`} {...props} />
}

export interface MenuProps extends TextProps {}

export type MenuTextComponentProps<
  E extends React.ElementType = typeof BoxDefaultElement
> = PolymorphicPropsWithRef<MenuProps, E>

export function Span<E extends React.ElementType = typeof BoxDefaultElement>({
  variant,
  ...props
}: ParagraphComponentProps<E>) {
  return <Text variant={`paragraph-sm`} {...props} />
}
