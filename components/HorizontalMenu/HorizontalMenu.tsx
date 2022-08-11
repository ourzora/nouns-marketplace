import { useCallback, MouseEvent, Dispatch, SetStateAction } from 'react'
import { Flex, FlexProps, Button, Box } from '@zoralabs/zord'
import { horizontalMenuButton } from './HorizontalMenu.css'
import { lightFont } from '@shared'

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
  ...props
}: HorizontalMenuProps) {
  const setCategory = useCallback(
    (e, category) => {
      e.preventDefault()
      !useCustomHandler && setId ? setId(category) : console.log(e)
    },
    [setId]
  )

  return (
    <Flex gap="x6" justify="center" overflowX="scroll" {...props}>
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
            <Box as="span" color="primary">
              {item.label}
            </Box>
            {item.count && (
              <Box as="span" className={lightFont} color="tertiary">
                &nbsp;{item.count}
              </Box>
            )}
          </Flex>
        </Button>
      ))}
    </Flex>
  )
}
