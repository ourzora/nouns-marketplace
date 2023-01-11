import clsx from 'clsx'

import React from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { lightTheme, mixins, vars } from '../config'
import { Box, Icon } from '../elements'
import { ThemeProvider as ZordProvider } from '../index'
import * as styles from './Modal.css'

export interface ModalContentProps extends Dialog.DialogContentProps {
  title?: string
  showClose?: boolean
  removePadding?: boolean
  children?: JSX.Element
  borderRadius?: keyof typeof vars.radii
  modalContentClassName?: string // Add className directly to the content, not the Dialog wrapper
}

export interface ModalProps extends Dialog.DialogProps {
  trigger?: React.ReactNode
  overlayClassName?: string
}

export const ModalTrigger = Dialog.Trigger
export const ModalClose = Dialog.Close

export function Modal({ overlayClassName, trigger, children, ...props }: ModalProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.DialogOverlay
          className={clsx('zord-modal-overlay', styles.overlay, overlayClassName)}
        />
        <Box key={props.open ? 'open' : 'closed'} className="zord-modal-box">
          {children}
        </Box>
      </Dialog.Portal>
      {trigger && <ModalTrigger asChild>{trigger}</ModalTrigger>}
    </Dialog.Root>
  )
}

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  (
    {
      className,
      children,
      title,
      showClose = true,
      removePadding = false,
      modalContentClassName,
      borderRadius = 'small',
      ...props
    }: ModalContentProps,
    ref
  ) => (
    <Dialog.DialogContent
      ref={ref}
      className={clsx(mixins({ center: 'xy' }), styles.content, className)}
      {...props}
    >
      <ZordProvider
        className={[
          'zord-modalcontent-provider',
          styles.background,
          !removePadding && styles.padding,
          modalContentClassName,
        ]}
        borderRadius={borderRadius}
        theme={lightTheme}
      >
        {showClose && <CloseButton />}
        {children}
      </ZordProvider>
    </Dialog.DialogContent>
  )
)

interface CloseButtonProps extends React.ComponentProps<typeof Dialog.Close> {}

function CloseButton({ className, ...props }: CloseButtonProps) {
  return (
    <Dialog.Close
      className={clsx(styles.close, mixins({ hoverFadeOut: true }), className)}
      {...props}
    >
      <Icon id="Close" size="md" />
    </Dialog.Close>
  )
}

ModalContent.displayName = 'ModalContent'
