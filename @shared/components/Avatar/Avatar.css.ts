import { avatarSizes } from 'styles/avatarSizes.css'

import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { atoms, vars } from '@zord/config'

export const avatarVariants = {
  size: avatarSizes,
  variant: {
    hairlineDark: style({
      selectors: {
        '&:before': {
          boxShadow: `inset 0 0 0 1px ${vars.color.accentDisabled}`,
          opacity: 0.7,
        },
      },
    }),
    hairlineLight: style({
      selectors: {
        '&:before': {
          boxShadow: `inset 0 0 0 1px ${vars.color.accentDisabled}`,
          opacity: 0.3,
        },
      },
    }),
    thickLight: style({
      selectors: {
        '&:before': {
          boxShadow: `inset 0 0 0 3px ${vars.color.background1}`,
        },
      },
    }),
  },
}

export const avatar = recipe({
  variants: avatarVariants,

  base: [
    style({
      selectors: {
        '&:before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          borderRadius: vars.radii.round,
          zIndex: 1,
        },
      },
    }),
    atoms({
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 'round',
    }),
  ],

  defaultVariants: {
    size: '30',
    variant: 'hairlineDark',
  },
})
