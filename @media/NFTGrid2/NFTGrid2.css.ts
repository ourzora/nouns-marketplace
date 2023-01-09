import { MAX_WIDTH } from 'styles/style-constants'

import { style } from '@vanilla-extract/css'

export const nftPageWrapper = style([
  {
    width: '100%',
    maxWidth: MAX_WIDTH.XL,
    margin: '0 auto',
  },
])
