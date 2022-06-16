import { style } from '@vanilla-extract/css'
import { media } from '@zoralabs/zord'

import {
  HEADER_HEIGHT,
  HEADER_HEIGHT_MOBILE,
  MAX_WIDTH,
} from '../../styles/style-constants'

export const HERO_HEIGHT_DESKTOP = 800

export const homepageHeroWrapper = style({
  zIndex: 0,
  backgroundColor: 'var(--hero-color)',
  selectors: {
    '&:before': {
      backgroundColor: 'var(--hero-color)',
      width: '100%',
      height: `${HEADER_HEIGHT}px`,
      transform: `translateY(-${HEADER_HEIGHT}px)`,
      position: 'absolute',
      top: 0,
      '@media': {
        [media.min1024]: {
          content: '',
        },
      },
    },
  },
  '@media': {
    [media.min1024]: {
      height: `calc(${HERO_HEIGHT_DESKTOP}px - ${HEADER_HEIGHT}px)`,
    },
  },
})

export const homepageHeroInner = style({
  maxWidth: MAX_WIDTH.LG,
  gridTemplateColumns: '1fr',
  '@media': {
    [media.min1024]: {
      gridTemplateColumns: '2fr 3fr',
    },
  },
})

export const nounsImage = style([
  {
    width: '100%',
    objectFit: 'contain',
    '@media': {
      [media.min1024]: {
        height: '100%',
        width: 'auto',
        aspectRatio: '1/1',
        justifySelf: 'end',
      },
    },
  },
])
