import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { atoms, media } from '@zoralabs/zord'
import { FOOTER_HEIGHT, FOOTER_HEIGHT_MOBILE } from 'styles/style-constants'

export const footerWrapper = style([
  {
    height: FOOTER_HEIGHT_MOBILE,
    gridTemplateColumns: '1fr',
    '@media': {
      [media.min1024]: {
        height: FOOTER_HEIGHT,
        gridTemplateColumns: '1fr 1fr 1fr',
      },
    },
  },
  atoms({
    marginTop: 'x8',
    w: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    px: 'x8',
  }),
])

const footerColVariants = {
  variant: {
    left: {
      justifySelf: 'center',
      '@media': {
        [media.min1024]: {
          justifySelf: 'left',
        },
      },
    },
    right: {
      justifySelf: 'center',
      '@media': {
        [media.min1024]: {
          justifySelf: 'right',
        },
      },
    },
  },
}

export const footerCol = recipe({
  variants: footerColVariants,
  base: {
    justifySelf: 'center',
  },
})
