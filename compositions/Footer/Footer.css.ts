import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { atoms, media } from '@zoralabs/zord'
import { FOOTER_HEIGHT, FOOTER_HEIGHT_MOBILE } from 'styles/style-constants'

export const footerWrapper = style([
  {
    height: FOOTER_HEIGHT_MOBILE,
    gridTemplateAreas: `
      'leftLink leftLink rightLink rightLink' 
      'poweredBy poweredBy poweredBy poweredBy'
    `,
    '@media': {
      [media.min1024]: {
        height: FOOTER_HEIGHT,
        gridTemplateRows: '1fr',
        gridTemplateAreas: `
          'leftLink poweredBy poweredBy rightLink'
          'leftLink poweredBy poweredBy rightLink'
          `,
      },
    },
  },
  atoms({
    w: '100%',
    px: 'x8',
    marginTop: 'x10',
  }),
])

const footerColVariants = {
  variant: {
    left: {
      gridArea: 'leftLink',
      justifySelf: 'right',
      '@media': {
        [media.min1024]: {
          justifySelf: 'left',
        },
      },
    },
    right: {
      gridArea: 'rightLink',
      justifySelf: 'left',
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
    gridArea: 'poweredBy',
  },
})
