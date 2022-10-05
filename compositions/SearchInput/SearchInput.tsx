import { BoxProps, Flex, Icon } from '@zoralabs/zord'

import { useToggle } from '@shared/hooks'
import clsx from 'clsx'
import * as styles from './SearchInput.css'
import useAutoFocus from '@shared/hooks/useAutoFocus'

interface SearchInputProps extends BoxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  inputClassNameOverrides?: string
  visible?: boolean
}

export function SearchInput({
  onChange,
  className,
  inputClassNameOverrides,
  placeholder = 'Search Web3...',
  visible = false,
  ...props
}: SearchInputProps) {
  const [focused, toggleFocus] = useToggle(false)
  const autoFocusRef = useAutoFocus(!visible)

  return (
    <Flex
      className={[styles.container, focused && styles.focused, className]}
      align="center"
      gap="x3"
      w="100%"
      px="x4"
      {...props}
    >
      <Icon id="Search" size="md" minW="x4" minH="x4" pointerEvents="none" />

      <input
        ref={autoFocusRef}
        className={clsx(inputClassNameOverrides, styles.input)}
        name="search-input"
        placeholder={placeholder}
        type="text"
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        onChange={onChange}
      />
    </Flex>
  )
}