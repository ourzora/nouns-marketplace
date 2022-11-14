import React, { MouseEventHandler } from 'react'

import { ButtonProps, Button as ZordButton } from '@zoralabs/zord'

import { button, buttonVariants } from './Button.css'

export interface NounButtonProps extends ButtonProps {
  variant?: keyof typeof buttonVariants['variant']
  size?: keyof typeof buttonVariants['size']
  title?: string
  target?: string
  as?: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement> | (() => void)
}

export function Button({
  children,
  as,
  variant = 'primary',
  gap,
  loading,
  size,
  icon,
  iconAlign,
  iconSize,
  onClick,
  className,
  title,
  target,
  ...props
}: NounButtonProps) {
  return (
    <ZordButton
      as={as}
      variant={variant}
      gap={gap}
      size={size}
      loading={loading}
      icon={icon}
      iconSize={iconSize}
      iconAlign={iconAlign}
      title={title}
      target={target}
      onClick={onClick}
      {...props}
      className={[
        button({
          loading,
          size,
          variant,
        }),
        className,
      ]}
    >
      {children}
    </ZordButton>
  )
}
