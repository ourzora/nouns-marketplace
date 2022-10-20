import { PRIMARY_LAYER } from 'constants/layers'
import { avatarSizes } from 'styles/avatarSizes.css'

import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { atoms, vars } from '@zoralabs/zord'

export const indexPrimary = style({
  zIndex: PRIMARY_LAYER,
})

export const sizeVariants = {
  size: avatarSizes,
}

export const avatar = recipe({
  variants: sizeVariants,

  base: style(
    [
      {
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      },
    ],
    atoms({
      flexShrink: 0,
      overflow: 'hidden',
    })
  ),

  defaultVariants: {
    size: '30',
  },
})

export const borderVariants = {
  variant: {
    hairlineDark: style({
      boxShadow: `inset 0 0 0 1px ${vars.color.accentDisabled}`,
      opacity: 0.7,
    }),
    hairlineLight: style({
      boxShadow: `inset 0 0 0 1px ${vars.color.accent}`,
      opacity: 0.03,
    }),
    thickLight: style({
      boxShadow: `inset 0 0 0 3px ${vars.color.background1}`,
    }),
  },
}

export const border = recipe({
  variants: borderVariants,

  defaultVariants: {
    variant: 'hairlineDark',
  },
})
