import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { atoms, color } from '@zoralabs/zord'

export const center = atoms({ alignItems: 'center' })

export const rowVariants = {
  variant: {
    withBorder: [
      style({
        selectors: {
          '&:not(:first-of-type)': {
            borderTop: `2px solid ${color.background2}`,
          },
        },
      }),
      atoms({
        py: 'x3',
      }),
    ],
  },
}

export const row = recipe({
  variants: rowVariants,
})
