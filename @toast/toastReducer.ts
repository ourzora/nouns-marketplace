import { ReactNode } from 'react'

import { uniqueId } from 'lodash'

export enum ToastVariant {
  ERROR = 'error',
  SUCCESS = 'success',
  PROGRESS = 'progress',
}

export type ToastItem = {
  duration?: number
  buttonLabel?: string
  description?: string
  title?: ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  showClose?: boolean
  variant?: ToastVariant
  id?: string
}

export interface ToastProps {
  items?: ToastItem[]
}

export enum ToastStatus {
  RESET = 'reset',
  ADD = 'add',
  REPLACE = 'replace',
  REMOVE = 'remove',
}

export type ToastAction = {
  type: ToastStatus
  item?: ToastItem
  id?: string
}

export function reducer(state: ToastProps, action: ToastAction): ToastProps {
  switch (action.type) {
    case ToastStatus.ADD:
      return {
        items: [
          ...(state.items as ToastItem[]),
          { ...action.item, id: uniqueId() } as ToastItem,
        ],
      }

    case ToastStatus.REPLACE:
      return {
        items: [{ ...action.item, id: uniqueId() } as ToastItem],
      }

    case ToastStatus.REMOVE:
      const items = [...(state.items as ToastItem[])]
      const index = items.findIndex((item) => item.id === action.id)
      items.splice(index, 1)
      return { items }

    case ToastStatus.RESET:

    default:
      return { items: [] }
  }
}
