import { style } from '@vanilla-extract/css'
import { atoms } from '@zord/atoms'
import { vars } from '@zord/theme'
import { media } from '@zord/tokens'

export const content = style([
  {
    background: vars.color.background1,
    '@media': {
      [media.min480]: {
        height: 'auto',
      },
    },
  },
  atoms({
    width: '100vw',
    height: '100%',
  }),
])

export const round = atoms({ borderRadius: 'normal' })

export const modalBackground = style([
  {
    backgroundColor: vars.color.background1,
    '@media': {
      [media.min480]: {
        backgroundColor: 'transparent',
      },
    },
  },
])
