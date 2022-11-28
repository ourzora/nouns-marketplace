import { style } from '@vanilla-extract/css'

export const iconHover = style({
  selectors: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})
