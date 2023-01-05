import { ClassValue } from 'clsx'

import React from 'react'

import { BoxProps } from './Box'
import { Flex } from './Flex'
import { Icon } from './Icon'
import { inputField, inputFieldBaseInput } from './InputField.css'
import { baseSelect, baseSelectContainer } from './Select.css'
import { Paragraph } from './Text'

export interface SelectProps extends BoxProps {
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
      className={[baseSelectContainer, containerClassName]}
      w="100%"
      pos="relative"
      align="center"
      h={large ? 'x16' : 'x14'}
      borderRadius="curved"
      px="x0"
      gap={large ? 'x2' : 'x1'}
      cursor={disabled ? 'not-allowed' : 'auto'}
    >
      <Flex w="100%" className={[`zord-select`, inputField]}>
        <Paragraph
          as="select"
          position="relative"
          display="block"
          width="100%"
          pr="x9"
          fontSize={large ? 20 : 14}
          className={[inputFieldBaseInput, baseSelect, className]}
          style={{ appearance: 'none' }}
          disabled={!!disabled}
          {...props}
        >
          {children}
        </Paragraph>

        <Icon
          id="ChevronDown"
          color="tertiary"
          right="x4"
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
