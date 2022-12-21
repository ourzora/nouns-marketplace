import { ClassValue } from 'clsx'

import React from 'react'

import { Flex, FlexProps } from './Flex'
import { Icon } from './Icon'
import { inputContainer, inputField, inputFieldBaseInput } from './InputField.css'

export interface SelectProps extends FlexProps {
  autoFocus?: boolean
  containerClassName?: ClassValue
  defaultValue?: string
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void
  variant?: 'sm' | 'lg'
  disabled?: boolean
  value?: string | number
}

export const Select = ({
  className,
  containerClassName,
  variant = 'sm',
  children,
  disabled,
  ...props
}: SelectProps) => {
  const large = variant === 'lg'

  return (
    <Flex
      className={[inputContainer, containerClassName]}
      w="100%"
      pos="relative"
      align="center"
      h={large ? 'x16' : 'x10'}
      px="x3"
      gap={large ? 'x2' : 'x1'}
      cursor={disabled ? 'not-allowed' : 'auto'}
    >
      <Flex w="100%" className={[`zord-select`, inputField]}>
        <Flex
          as="select"
          position="relative"
          display="block"
          width="100%"
          flex={1}
          pr="x8"
          fontSize={large ? 20 : 14}
          className={[inputFieldBaseInput, className]}
          style={{ appearance: 'none' }}
          disabled={!!disabled}
          {...props}
        >
          {children}
        </Flex>

        <Icon
          id="ChevronDown"
          color="tertiary"
          right="x3"
          position="absolute"
          pointerEvents="none"
          display="flex"
          center="y"
          size={variant}
        />
      </Flex>
    </Flex>
  )
}
