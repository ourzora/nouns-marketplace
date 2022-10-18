import { style } from '@vanilla-extract/css'
import { atoms, media, color, space } from '@zoralabs/zord'
import { HEADER_LAYER } from 'constants/layers'
import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE, MAX_WIDTH } from 'styles/style-constants'

export const collectionFilter = style([
  {
    maxWidth: MAX_WIDTH.XL,
  },
  atoms({
    alignSelf: 'center',
  }),
])
