import { activityButton, activityModal } from './CollectionsFilter.css'
import { useCollectionFilters } from '@next/providers/CollectionFilterProvider'
import { sortMethodOptions } from '@next/providers/CollectionFilterProvider/filterStore'
import { Box, Button, Icon, Modal, ModalContent, Stack, Text } from '@zoralabs/zord'
import { ModalType } from 'compositions/modal/ModalRegistry'
import { useModalRegistry } from 'hooks/useModalRegistry'
import { useCallback, useMemo } from 'react'

export function SortDropdown() {
  const {
    filterStore: {
      setSortMethod,
      filters: { sortMethod },
    },
  } = useCollectionFilters()

  const { modalType, requestClose, requestOpen } = useModalRegistry()

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
    <>
      <Box>
        <Button
          variant="secondary"
          borderRadius="round"
          size="sm"
          icon="ChevronDown"
          onClick={() => requestOpen(ModalType.RECENT_ACTIVITY)}
          className={activityButton}
        >
          {selectedOption}
        </Button>
      </Box>
      <Modal open={modalType === ModalType.RECENT_ACTIVITY} onOpenChange={requestClose}>
        <ModalContent
          title="modal"
          className={activityModal}
          showClose={false}
          removePadding
        >
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
                {option.value === sortMethod && <Icon id="Check" size="sm" />}
              </Button>
            ))}
          </Stack>
        </ModalContent>
      </Modal>
    </>
  )
}
