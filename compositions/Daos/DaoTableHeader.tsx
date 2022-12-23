import React from 'react'

import { lightFont } from '@noun-auction'
import { Box, BoxProps, Label } from '@zoralabs/zord'

import {
  cell,
  daoMeta,
  metadataCells,
  noBorder,
  placeholderCell,
  rowWrap,
} from './DaoRow.css'
import { header } from './Daos.css'

export function DaoTableHeader({ className, ...props }: BoxProps) {
  return (
    <Box className={[rowWrap, noBorder, header, className]}>
      <Box className={[daoMeta]}></Box>
      <Box className={[metadataCells]}>
        <Box className={[cell]}>
          <Label color="tertiary" className={[lightFont]}>
            Treasury
          </Label>
        </Box>
        <Box className={[cell]}>
          <Label color="tertiary" className={[lightFont]}>
            Auction Status
          </Label>
        </Box>
        <Box className={[cell]}>
          <Label color="tertiary" className={[lightFont]}>
            Current Bid
          </Label>
        </Box>
      </Box>
      <Box className={[placeholderCell]}></Box>
    </Box>
  )
}
