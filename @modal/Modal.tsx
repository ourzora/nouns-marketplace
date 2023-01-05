import clsx, { ClassValue } from 'clsx'

import React from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { Box, Icon, IconProps, ThemeProvider as ZordProvider } from '@zord'
import { Atoms, mixins } from '@zord/config'

import * as styles from './Modal.css'

export interface ModalContentProps extends Dialog.DialogContentProps {
  title?: string
  showClose?: boolean
  // @ts-ignore-next-line // @BJ TODO: investigate why Atoms have stopped working?
  padding?: Atoms['padding']
  // padding?: string
  /** Modal background css overrides: vanilla extract style object */
  modalBackgroundOverrides?: any
  /** Modal content css overrides: vanilla extract style object */
  modalContentOverrides?: any
  children?: JSX.Element
  /** Default is lightTheme */
  modalTheme?: ClassValue | undefined
  /** Disallow clicking outside of container to close modal */
  disableCloseOnClickOutside?: boolean
  /** Show modal as fullscreen overlay */
  fullscreen?: boolean
}

export interface ModalProps extends Dialog.DialogProps {
  trigger?: React.ReactNode
  /** Modal overlay css overrides: vanilla extract style object */
  modalOverlayOverrides?: any
}

export const ModalTrigger = Dialog.Trigger
export const ModalClose = Dialog.Close

export function Modal({
  trigger,
  modalOverlayOverrides,
  children,
  ...props
}: ModalProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.DialogOverlay
          className={clsx('zord-modal-overlay', styles.overlay, modalOverlayOverrides)}
        />
        <Box p="x12" key={props.open ? 'open' : 'closed'} className="zord-modal-wrapper">
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

// eslint-disable-next-line react/display-name
export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  (
    {
      modalContentOverrides,
      modalBackgroundOverrides,
      disableCloseOnClickOutside = false,
      modalTheme,
      className,
      children,
      title,
      fullscreen = false,
      showClose = true,
      padding = 'x6',
      ...props
    },
    ref
  ) => {
    return (
      <Dialog.DialogContent
        ref={ref}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onPointerDownOutside={
          disableCloseOnClickOutside ? (e) => e.preventDefault() : undefined
        }
        className={clsx(
          !fullscreen && mixins({ center: 'xy' }),
          fullscreen && styles.fullScreen,
          styles.content,
          modalContentOverrides,
          className,
          'zord-modal-content'
        )}
        {...props}
      >
        <ZordProvider theme={modalTheme} style={{ backgroundColor: 'transparent' }}>
          <Box
            className={[
              styles.background,
              modalBackgroundOverrides,
              'zord-modal-background',
            ]}
            p={padding}
          >
            {showClose && <CloseButton />}
            {children}
          </Box>
        </ZordProvider>
      </Dialog.DialogContent>
    )
  }
)

interface CloseButtonProps extends React.ComponentProps<typeof Dialog.Close> {
  /** Modal close button css overrides: vanilla extract style object */
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
    <ModalClose
      className={clsx(
        styles.close,
        modalCloseButtonOverrides,
        className,
        'zord-modal-close-button'
      )}
      {...props}
    >
      <Icon id="Close" size={closeIconSize} className="zord-modal-close-icon" />
    </ModalClose>
  )
}
