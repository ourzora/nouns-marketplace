import { Button } from 'components/Button'

import React, { useCallback } from 'react'

import * as ToastPrimitive from '@radix-ui/react-toast'
import { useToggle } from '@shared/hooks/useToggle'
import { ToastItem } from '@toast/toastReducer'
import { Flex, Icon, Label, Paragraph, Stack } from '@zoralabs/zord'

import * as styles from './Toast.css'

export interface ToastProps extends ToastPrimitive.ToastProviderProps {
  item: ToastItem
  isOpen?: boolean
  onClose?: (id: string) => void
}

export function Toast({
  item: { id, buttonLabel, description, duration = 5000, onClick, showClose },
  onClose,
  ...props
}: ToastProps) {
  const [isOpen, toggleOpen] = useToggle(true)

  const handleOpenChange = useCallback(() => {
    if (onClose && id) onClose(id)
    toggleOpen()
  }, [onClose, toggleOpen, id])

  return (
    <ToastPrimitive.Provider duration={duration} swipeDirection="right" {...props}>
      <ToastPrimitive.Root
        open={isOpen}
        className={styles.root}
        onOpenChange={handleOpenChange}
      >
        <Flex justify="center">
          <Stack gap="x1" align="center" justify="center">
            {!!description && (
              <ToastPrimitive.Description>
                <Paragraph size="sm" color="onAccent" align="center" justifySelf="center">
                  {description}
                </Paragraph>
              </ToastPrimitive.Description>
            )}

            {!!buttonLabel && onClick && (
              <ToastPrimitive.Action asChild altText={buttonLabel}>
                <Button variant="unset" onClick={onClick}>
                  <Label size="sm">{buttonLabel}</Label>
                </Button>
              </ToastPrimitive.Action>
            )}
          </Stack>
        </Flex>

        {showClose && (
          <ToastPrimitive.Close asChild>
            <Button
              pos="absolute"
              top="x0"
              right="x0"
              variant="ghost"
              size="md"
              w="x6"
              h="x6"
              minW="x6"
              color="tertiary"
              style={{
                minWidth: 24,
              }}
            >
              <Icon id="Close" />
            </Button>
          </ToastPrimitive.Close>
        )}
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport className={styles.viewport} />
    </ToastPrimitive.Provider>
  )
}
