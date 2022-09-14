import { Flex, FlexProps } from '@zoralabs/zord'
import React, { useMemo } from 'react'

import { DataTableItem } from './DataTableItem'
import { Hyperlink } from './DataTableItem'

import * as rowStyles from './DataTableItem.css'

/**
 * Data table to display a list of `DataTableItem`
 */

export interface DataTableItemProps {
  copyValue?: string
  url?: Hyperlink
  label: string
  value?: string
  address?: string
  rowVariant?: keyof typeof rowStyles.rowVariants['variant']
}

interface DataTableProps extends FlexProps {
  items?: DataTableItemProps[]
  rowVariant?: keyof typeof rowStyles.rowVariants['variant']
}

export function DataTable({ children, items, rowVariant, ...props }: DataTableProps) {
  const gap = useMemo(() => (rowVariant !== 'withBorder' ? 'x3' : 'x0'), [rowVariant])
  return (
    <Flex direction="column" gap={gap} {...props}>
      {!!items?.length &&
        items.map(({ label, ...item }, idx) => (
          <DataTableItem key={`${label}-${idx}`} {...item} variant={rowVariant}>
            {label}
          </DataTableItem>
        ))}
      {children}
    </Flex>
  )
}
