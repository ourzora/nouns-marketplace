import { style } from '@vanilla-extract/css'
import { atoms } from '@zoralabs/zord'

export const avatarSizes = {
  '16': atoms({
    size: 'x4',
    minWidth: 'x4',
  }),
  '20': atoms({
    size: 'x5',
    minWidth: 'x5',
  }),
  '24': atoms({
    size: 'x6',
    minWidth: 'x6',
  }),
  '30': style({
    height: 30,
    width: 30,
    minWidth: 30,
  }),
  '40': atoms({
    size: 'x10',
    minW: 'x10',
  }),
  '48': atoms({
    size: 'x12',
    minWidth: 'x12',
  }),
  '52': atoms({
    size: 'x13',
    minWidth: 'x13',
  }),
  '64': atoms({
    size: 'x16',
    minWidth: 'x16',
  }),
  '80': atoms({
    size: 'x20',
    minWidth: 'x20',
  }),
  '90': style({
    height: 90,
    width: 90,
    minWidth: 90,
  }),
  '120': atoms({
    size: 'x30',
    minWidth: 'x30',
  }),
  '164': style({
    height: 164,
    width: 164,
    minWidth: 164,
  }),
}
