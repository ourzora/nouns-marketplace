import { globalStyle, style } from '@vanilla-extract/css'
import { atoms, color, media, radii, typography, vars } from '@zord/config'

import {
  FOOTER_HEIGHT,
  FOOTER_HEIGHT_MOBILE,
  HEADER_HEIGHT,
  HEADER_HEIGHT_MOBILE,
  MAX_WIDTH,
} from './style-constants'

globalStyle('html, body', {
  margin: 0,
  padding: 0,
})

export const noTextWrap = style({
  whiteSpace: 'nowrap',
})

export const pageWrapper = style([
  {
    minHeight: `calc(100vh - ${HEADER_HEIGHT_MOBILE + FOOTER_HEIGHT_MOBILE}px)`,
    '@media': {
      [media.min1024]: {
        minHeight: `calc(100vh - ${HEADER_HEIGHT + FOOTER_HEIGHT}px)`,
      },
    },
  },
  atoms({
    justifyContent: 'flex-start',
  }),
])

export const fullHeightPageWrapper = style([
  {
    minHeight: '100vh',
  },
])

export const maxWidthSm = style([
  {
    maxWidth: MAX_WIDTH.SM,
  },
  atoms({
    width: '100%',
    margin: 'auto',
  }),
])

/* PAGE HEADER */

export const pageHeaderWrapper = style([
  {
    maxWidth: MAX_WIDTH.SM,
    gridColumn: 2,
  },
  atoms({
    width: '100%',
    mx: 'auto',
    my: 'x0',
  }),
])

export const stat = style({
  whiteSpace: 'nowrap',
  lineHeight: `1!important`,
})

export const pageGrid = style([
  {
    width: '100%',
    maxWidth: MAX_WIDTH.MED,
    gridTemplateColumns: 'repeat(4, [col-start] 1fr)',
    gridTemplateRows: 'auto',
    '@media': {
      [media.min1024]: {
        gridTemplateColumns: 'repeat(12, [col-start] 1fr)',
        maxWidth: `calc(${MAX_WIDTH.XL}px + (2 * ${vars.space.x8}))`,
      },
    },
  },
  atoms({
    px: { '@initial': 'x0', '@1024': 'x8' },
    gap: { '@initial': 'x4', '@1024': 'x6' },
  }),
])

export const homepageTable = style({
  gridColumn: '1/span 4',
  '@media': {
    [media.min1024]: {
      gridColumn: '2/span 10',
    },
  },
})

export const homepageHeadline = style([
  // {
  //   fontWeight: typography.fontWeight.display,
  //   lineHeight: 48,
  //   '@media': {
  //     [media.min1024]: {
  //       lineHeight: 1,
  //     },
  //   },
  // },
  atoms({
    fontWeight: 'display',
    fontSize: { '@initial': 42, '@1024': 96 },
    lineHeight: { '@initial': 48, '@1024': 1 },
  }),
])

export const homepageHeaderWrapper = style([
  {
    gridColumn: '1/span 4',
    '@media': {
      [media.min1024]: {
        gridColumn: '4/span 6',
      },
    },
  },
  atoms({
    width: '100%',
    mx: 'auto',
    my: 'x0',
  }),
])
