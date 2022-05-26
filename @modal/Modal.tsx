import { Box, Icon } from '@zoralabs/zord/elements'
import { background, close, content, overlay } from './Modal.css'
import * as Dialog from '@radix-ui/react-dialog'
import clsx from 'clsx'
import React from 'react'

export interface ModalContentProps extends Dialog.DialogContentProps {
  title: string
  showClose?: boolean
  removePadding?: boolean
  children?: JSX.Element
}

export interface ModalProps extends Dialog.DialogProps {
  trigger?: React.ReactNode
}

export const ModalTrigger = Dialog.Trigger
export const ModalClose = Dialog.Close

export function Modal({ trigger, children, ...props }: ModalProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.DialogOverlay className={overlay} />
        <Box key={props.open ? 'open' : 'closed'}>{children}</Box>
      </Dialog.Portal>
      {trigger && <ModalTrigger asChild>{trigger}</ModalTrigger>}
    </Dialog.Root>
  )
}

export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  (
    { className, children, title, showClose = true, removePadding = false, ...props },
    ref
  ) => {
    return (
      <Dialog.DialogContent ref={ref} className={clsx(content, className)} {...props}>
        <Box className={background} p={removePadding ? 'x0' : 'x6'}>
          {showClose && <CloseButton />}
          {children}
        </Box>
      </Dialog.DialogContent>
    )
  }
)

interface CloseButtonProps extends React.ComponentProps<typeof Dialog.Close> {}

function CloseButton({ className, ...props }: CloseButtonProps) {
  return (
    <Dialog.Close className={clsx(close, className)} {...props}>
      <Icon id="Close" size="md" />
    </Dialog.Close>
  )
}
