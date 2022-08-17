import { Flex, FlexProps } from '@zoralabs/zord'
import React from 'react'

import { DataTableItem } from './DataTableItem'
import { Hyperlink } from './DataTableItem'

/**
 * Data table to display a list of `DataTableItem`
 */

export interface DataTableItemProps {
  copyValue?: string
  url?: Hyperlink
  label: string
  value?: string
  address?: string
}

interface DataTableProps extends FlexProps {
  items?: DataTableItemProps[]
}

export function DataTable({ children, items, ...props }: DataTableProps) {
  return (
    <Flex direction="column" gap="x3" {...props}>
      {!!items?.length &&
        items.map(({ label, ...item }, idx) => (
          <DataTableItem key={`${label}-${idx}`} {...item}>
            {label}
          </DataTableItem>
        ))}
      {children}
    </Flex>
  )
}
