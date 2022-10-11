// import { Flex, FlexProps, Icon, IconProps } from '../elements'
import { button, buttonVariants } from './Button.css'
// import { iconVariants } from './Icon.css'
import React, { ElementType, ForwardedRef, forwardRef, useMemo } from 'react'
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithRef,
  PolymorphicPropsWithoutRef,
} from 'react-polymorphic-types'
import {
  Flex,
  FlexProps,
  Icon,
  // IconProps
} from '@zoralabs/zord'

export interface ButtonProps extends FlexProps {
  disabled?: boolean
  variant?: keyof typeof buttonVariants['variant']
  size?: keyof typeof buttonVariants['size']
  // icon?: IconProps['id']
  iconAlign?: 'left' | 'right'
  type?: 'submit' | 'reset' | 'button'
  // iconSize?: keyof typeof iconVariants['size']
  loading?: boolean
  // pill?: boolean
}

export const ButtonDefaultElement = 'button'

export type ButtonComponentProps<E extends ElementType = typeof ButtonDefaultElement> =
  PolymorphicPropsWithRef<ButtonProps, E>

export function InnerButton<E extends ElementType = typeof ButtonDefaultElement>(
  {
    as,
    disabled = false,
    className,
    children,
    // icon,
    gap = 'x4',
    // iconSize = 'md',
    // iconAlign = 'left',
    loading,
    // pill,
    variant = 'primary',
    size,
    type = 'button',
    ...props
  }: PolymorphicPropsWithoutRef<ButtonProps, E>,
  ref: ForwardedRef<E>
) {
  const buttonClassname = useMemo(() => {
    let clsName = [`noun-button${variant ? `-` + variant : null}`]
    size && clsName.push(`noun-button-${size}`)
    // pill && clsName.push(`noun-button-pill`)
    loading && clsName.push(`noun-button-loading`)
    disabled && clsName.push(`noun-button-disabled`)
    return clsName
  }, [
    loading,
    // pill,
    variant,
    size,
    disabled,
  ])
  const Element: ElementType = as || ButtonDefaultElement

  // const iconElement = useMemo(() => {
  //   return icon ? <Icon id={icon} size={iconSize} /> : null
  // }, [icon, iconSize])

  return (
    <Flex
      ref={ref}
      as={Element}
      role="button"
      disabled={disabled}
      type={type}
      gap={gap}
      className={[
        buttonClassname,
        button({
          loading,
          //  pill,
          size,
          variant,
        }),
        className,
      ]}
      {...props}
    >
      {loading ? (
        <Icon id="Spinner" size="md" />
      ) : (
        <>
          {/* {iconAlign === 'left' && iconElement} */}

          {children}

          {/* {iconAlign === 'right' && iconElement} */}
        </>
      )}
    </Flex>
  )
}

export const Button: PolymorphicForwardRefExoticComponent<
  ButtonProps,
  typeof ButtonDefaultElement
> = forwardRef(InnerButton)
