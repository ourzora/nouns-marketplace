import { style } from '@vanilla-extract/css'
import { atoms } from '@zoralabs/zord'

import { HEADER_HEIGHT, MAX_WIDTH } from '../../styles/style-constants'

export const HERO_HEIGHT_DESKTOP = 800

export const homepageHeroWrapper = style({
  zIndex: 0,
  height: `calc(${HERO_HEIGHT_DESKTOP}px - ${HEADER_HEIGHT}px)`,
  backgroundColor: 'var(--hero-color)',
  selectors: {
    '&:before': {
      content: '',
      backgroundColor: 'var(--hero-color)',
      width: '100%',
      height: `${HEADER_HEIGHT}px`,
      transform: `translateY(-${HEADER_HEIGHT}px)`,
      position: 'absolute',
      top: 0,
    },
  },
})

export const homepageHeroInner = style({
  maxWidth: MAX_WIDTH.LG,
  gridTemplateColumns: '2fr 3fr',
})

export const nounsImage = style({
  aspectRatio: '1/1',
  justifySelf: 'end',
})
