import { Dispatch, MouseEvent, SetStateAction, useCallback } from 'react'

import { Box, Button, Flex, FlexProps } from '@zord'

import { horizontalMenuButton, horizontalMenuWrapper } from './HorizontalMenu.css'

export interface HorizontalMenuProps extends FlexProps {
  items: {
    id: string | null
    label: string
    count?: string | number
    handler?: () => void
  }[]
  setId?: Dispatch<SetStateAction<string>>
  currentId?: string | null
  useCustomHandler?: boolean
}

export function HorizontalMenu({
  items,
  setId,
  currentId,
  useCustomHandler = false,
  className,
  ...props
}: HorizontalMenuProps) {
  const setCategory = useCallback(
    (e, category) => {
      e.preventDefault()
      !useCustomHandler && setId ? setId(category) : console.log(e)
    },
    [setId, useCustomHandler]
  )

  return (
    <Flex
      className={['zora-horizontalmenu', horizontalMenuWrapper, className]}
      justify="center"
      {...props}
    >
      {items.map((item) => (
        <Button
          key={item.label}
          variant="unset"
          className={[currentId === item.id && 'active', horizontalMenuButton]}
          onClick={
            !useCustomHandler
              ? (e: MouseEvent<HTMLButtonElement>) => setCategory(e, item.id)
              : item.handler
          }
        >
          <Flex>
            <Box as="span" color="text1">
              {item.label}
            </Box>
            {item.count && (
              <Box as="span" color="text3">
                &nbsp;{item.count}
              </Box>
            )}
          </Flex>
        </Button>
      ))}
    </Flex>
  )
}
