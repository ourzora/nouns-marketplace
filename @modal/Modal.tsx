import { background, close, content, overlay } from './Modal.css'
import * as Dialog from '@radix-ui/react-dialog'
import clsx, { ClassValue } from 'clsx'
import React, { forwardRef } from 'react'
import {
  IconProps,
  Box,
  Icon,
  ThemeProvider as ZordProvider,
  mixins,
} from '@zoralabs/zord'

export interface ModalProps extends Dialog.DialogProps {
  trigger?: React.ReactNode
  /** Modal overlay css overrides: vannila extract style object */
  modalOverlayOverrides?: any
}

export const ModalTrigger = Dialog.Trigger
export const ModalClose = Dialog.Close
export const ModalOverlay = Dialog.Overlay

export function Modal({
  trigger,
  modalOverlayOverrides,
  children,
  ...props
}: ModalProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <ModalOverlay
          className={clsx('zord-modal-overlay', overlay, modalOverlayOverrides)}
        />
        <Box key={props.open ? 'open' : 'closed'} className="zord-modal-wrapper">
          {children}
        </Box>
      </Dialog.Portal>
      {trigger && (
        <ModalTrigger asChild className="zord-modal-trigger">
          {trigger}
        </ModalTrigger>
      )}
    </Dialog.Root>
  )
}

interface ModalContentOverrideProps {
  showClose?: boolean
  removePadding?: boolean
  /** Modal background css overrides: vannila extract style object */
  modalBackgroundOverrides?: any
  /** Modal content css overrides: vannila extract style object */
  modalContentOverrides?: any
  /** Default is lightTheme */
  modalTheme?: ClassValue | undefined
  children?: JSX.Element
}

type ModalContentProps = React.ComponentProps<typeof Dialog.Content> &
  ModalContentOverrideProps

export const ModalContent = forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  ModalContentProps
>(
  (
    {
      modalContentOverrides,
      modalBackgroundOverrides,
      modalTheme,
      className,
      children,
      title,
      showClose = true,
      removePadding = false,
      ...props
    },
    forwardedRef
  ) => {
    return (
      <Dialog.DialogContent
        ref={forwardedRef}
        className={clsx(
          mixins({ center: 'xy' }),
          content,
          modalContentOverrides,
          className,
          'zord-modal-content'
        )}
        {...props}
      >
        <ZordProvider theme={modalTheme} style={{ backgroundColor: 'transparent' }}>
          <Box
            className={clsx(
              background,
              modalBackgroundOverrides,
              'zord-modal-background'
            )}
            p={removePadding ? 'x0' : 'x6'}
          >
            {showClose && <CloseButton />}
            {children}
          </Box>
        </ZordProvider>
      </Dialog.DialogContent>
    )
  }
)

ModalContent.displayName = 'ModalContent'

interface CloseButtonProps extends React.ComponentProps<typeof Dialog.Close> {
  /** Modal close button css overrides: vannila extract style object */
  modalCloseButtonOverrides?: any
  /** Define 1 of three preset icon sizes */
  closeIconSize?: IconProps['size']
}

function CloseButton({
  modalCloseButtonOverrides,
  closeIconSize = 'md',
  className,
  ...props
}: CloseButtonProps) {
  return (
    <Dialog.Close
      className={clsx(
        close,
        modalCloseButtonOverrides,
        className,
        'zord-modal-close-button'
      )}
      {...props}
    >
      <Icon id="Close" size={closeIconSize} className="zord-modal-close-icon" />
    </Dialog.Close>
  )
}
