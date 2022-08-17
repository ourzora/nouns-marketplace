import { style } from '@vanilla-extract/css'
import { vars } from '@zoralabs/zord'
import { MODAL_FOREGROUND_LAYER } from 'constants/layers'

export const toast = style([
  {
    left: 'calc(50% - 125px);',
    zIndex: MODAL_FOREGROUND_LAYER,
    backgroundColor: vars.color.foreground.primary,
  },
])
