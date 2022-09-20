import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { atoms, media } from '@zoralabs/zord'
import { FOOTER_HEIGHT, FOOTER_HEIGHT_MOBILE, MAX_WIDTH } from 'styles/style-constants'

export const footerWrap = style({
  // strictly by design
  borderTop: `2px solid #F2F2F2`,
})

export const footerWrapper = style([
  {
    height: FOOTER_HEIGHT_MOBILE,
    margin: '0 auto',
    maxWidth: MAX_WIDTH.XL,
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
    marginTop: 'x10',
  }),
])

const footerColVariants = {
  // x-values do not work here. bug?
  variant: {
    left: {
      gridArea: 'leftLink',
      justifySelf: 'right',
      paddingLeft: '32px',
      paddingRight: '8px',
      paddingTop: '20px',
      '@media': {
        [media.min1024]: {
          justifySelf: 'left',
        },
      },
    },
    right: {
      gridArea: 'rightLink',
      justifySelf: 'left',
      paddingRight: '32px',
      paddingLeft: '8px',
      paddingTop: '20px',
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
    paddingTop: '0px',
    '@media': {
      [media.min1024]: {
        paddingTop: '60px',
      },
    },
  },
})
