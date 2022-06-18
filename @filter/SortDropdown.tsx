import { activityButton, activityModal } from './CollectionsFilter.css'
import { useCollectionFilters } from './providers/CollectionFilterProvider'
import { sortMethodOptions } from './state/filterStore'
import { Button, Icon, Stack, Text, Box } from '@zoralabs/zord'
import { ModalComposition, useModal } from '@modal'
import { useCallback, useMemo } from 'react'

export function SortDropdown() {
  const {
    filterStore: {
      setSortMethod,
      filters: { sortMethod },
    },
  } = useCollectionFilters()

  const { requestClose } = useModal()

  const activitySelectHandler = useCallback(
    (option) => {
      setSortMethod(option)
      requestClose()
    },
    [requestClose, setSortMethod]
  )

  const selectedOption = useMemo(() => {
    return sortMethodOptions.find((option) => option.value === sortMethod)?.label
  }, [sortMethod])

  return (
    <ModalComposition
      modalName={`sort-dropdown`}
      trigger={
        <Button
          variant="secondary"
          borderRadius="round"
          size="sm"
          icon="ChevronDown"
          className={activityButton}
        >
          {selectedOption}
        </Button>
      }
      content={
        <Box className={activityModal}>
          <Stack>
            {sortMethodOptions.map((option) => (
              <Button
                variant="ghost"
                w="100%"
                display="flex"
                justify="space-between"
                style={{
                  whiteSpace: 'nowrap',
                }}
                key={option.value}
                onClick={() => activitySelectHandler(option.value)}
              >
                <Text as="span" pr="x10">
                  {option.label}
                </Text>
                {option.value === sortMethod && <Icon id="Plus" size="sm" />}
              </Button>
            ))}
          </Stack>
        </Box>
      }
    />
  )
}
