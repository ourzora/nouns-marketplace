import { avatarPadding, filterOption } from './CollectionsFilter.css'
import { Checkbox, Flex, Icon, Text } from '@zoralabs/zord'
import { Fragment, ReactNode } from 'react'

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
      className={[
        filterOption,
        {
          [avatarPadding]: hasAvatar,
        },
      ]}
      gap="x1"
      align="center"
      justify="center"
      position="relative"
      pr="x3"
      pl="x3"
      pointerEvents={disabled ? 'none' : 'all'}
      mr={rightPad ? 'x1' : 'x0'}
      borderColor={checked || useBorder ? 'primary' : 'tertiary'}
      borderStyle="solid"
      borderWidth="thin"
      borderRadius="round"
      color="primary"
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
      <Text
        variant="paragraph-sm"
        inline
        style={{ color: disabled ? 'tertiary' : 'primary' }}
      >
        {label}
      </Text>
      {showCloseIcon && <Icon id="Close" size="sm" />}
    </Flex>
  )
}
