import { useCallback, Dispatch, SetStateAction } from 'react'
import { Flex, FlexProps, Button, Box } from '@zoralabs/zord'
import { collectionActivityButton } from './../compositions/Collections/Collections.css'
import { lightFont } from 'styles/styles.css'

export interface HorizontalMenuProps extends FlexProps {
  items: {
    id: string | null
    count?: string | number
  }[]
  setId: Dispatch<SetStateAction<string>>
  currentId: string
}

export function HorizontalMenu({
  items,
  setId,
  currentId,
  ...props
}: HorizontalMenuProps) {
  const setCategory = useCallback(
    (category, e) => {
      e.preventDefault()
      setId(category)
    },
    [setId]
  )

  return (
    <Flex gap="x6" justify="center" {...props}>
      {items.map((item) => (
        <Button
          variant="unset"
          className={[currentId === item.id && 'active', collectionActivityButton]}
          onClick={(e: MouseEvent) => setCategory(item.id, e)}
        >
          <Flex>
            <Box as="span">{item.id}</Box>
            <Box as="span" className={lightFont} color="tertiary">
              &nbsp;{item.count}
            </Box>
          </Flex>
        </Button>
      ))}
    </Flex>
  )
}
