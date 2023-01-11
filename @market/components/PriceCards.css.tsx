import { style } from '@vanilla-extract/css'
import { atoms, color } from '@zord/config'

export const arrowButton = style([
  {
    padding: `6px`,
  },
  atoms({ borderRadius: 'round', backgroundColor: 'background2' }),
])

export const arrow = style({
  color: color.onAccentDisabled,

  selectors: {
    '&:hover': {
      color: color.accentHover,
    },
  },
})

export const wrap = style({
  transform: 'translateY(8px)', // ideally neg margins, but affects layout of Traits/History
})

export const cardStack = style({
  boxShadow: `0 10px 0 -5px #FFF, 0 10px 2px -4px ${color.border}, 0 20px 0 -10px #FFF,0 20px 2px -9px ${color.border}`,
})

export const buyNowButton = style({
  selectors: {
    '&:hover': {
      opacity: 0.8,
    },
  },
})
