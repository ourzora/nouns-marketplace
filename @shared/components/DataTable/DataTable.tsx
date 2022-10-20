import React, { useMemo } from 'react'

import { Flex, FlexProps } from '@zoralabs/zord'

import { DataTableItem, DataTableItemProps } from './DataTableItem'
import * as rowStyles from './DataTableItem.css'

interface DataTableProps extends FlexProps {
  items?: DataTableItemProps[]
  rowVariant?: keyof typeof rowStyles.rowVariants['variant']
  rowSize?: 'lg' | 'sm'
}

export function DataTable({
  children,
  items,
  rowSize,
  rowVariant,
  ...props
}: DataTableProps) {
  const gap = useMemo(() => (rowVariant !== 'withBorder' ? 'x3' : 'x0'), [rowVariant])
  return (
    <Flex direction="column" gap={gap} {...props}>
      {!!items?.length &&
        items.map(({ label, ...item }, idx) => (
          <DataTableItem
            size={rowSize}
            label={label}
            key={`${label}-${idx}`}
            {...item}
            variant={rowVariant}
          >
            {label}
          </DataTableItem>
        ))}
      {children}
    </Flex>
  )
}
