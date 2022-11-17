import { style } from '@vanilla-extract/css'
import { color, space } from '@zoralabs/zord'

export const arrowButton = style({
  // @TODO BJ: remove !important when zord has been vendored in
  borderRadius: '100px!important',
  // padding: `${space.x1}!important`,
  padding: `6px!important`,
  background: `${color.background2}!important`,
})

export const arrow = style({
  color: color.onAccentDisabled,

  selectors: {
    '&:hover': {
      color: color.accentHover,
    },
  },
})
