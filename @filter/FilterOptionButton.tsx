import { Fragment, ReactNode } from 'react'

import { Checkbox, Flex, Icon, Text } from '@zord'

import { avatarPadding, filterOption } from './CollectionsFilter.css'

export interface FilterOptionButtonProps {
  iconSize?: number
  label: any
  disabled?: boolean
  useBorder?: boolean
  checked?: boolean | null
  showCheckbox?: boolean
  showCloseIcon?: boolean
  className?: string
  onClick?: () => void
  hasAvatar?: boolean
  rightPad?: boolean
  children?: ReactNode
}

export function FilterOptionButton({
  label,
  checked,
  showCheckbox = true,
  showCloseIcon = false,
  disabled,
  useBorder = false,
  onClick,
  hasAvatar = false,
  rightPad = false,
  children,
}: FilterOptionButtonProps): JSX.Element {
  if (!label) {
    return <Fragment />
  }
  return (
    <Flex
      className={[filterOption, hasAvatar && avatarPadding]}
      gap="x1"
      align="center"
      justify="center"
      position="relative"
      pr="x3"
      pl="x3"
      pointerEvents={disabled ? 'none' : 'all'}
      mr={rightPad ? 'x1' : 'x0'}
      borderColor={checked || useBorder ? 'border' : 'background2'}
      borderStyle="solid"
      borderWidth="normal"
      backgroundColor="background2"
      borderRadius="curved"
      color="accent"
      onClick={onClick}
    >
      {children}
      {showCheckbox && (
        <Checkbox
          disabled={disabled}
          defaultChecked
          checked={!!checked}
          id={label}
          name={label}
          onChange={onClick}
        />
      )}
      <Text variant="paragraph-sm" inline color={disabled ? 'text3' : 'text1'}>
        {label}
      </Text>
      {showCloseIcon && <Icon id="Close" size="sm" />}
    </Flex>
  )
}
