import { globalStyle, style } from '@vanilla-extract/css'
import { atoms } from '@zord/atoms'
import { vars } from '@zord/theme'
import { color, media, radii, typography } from '@zord/tokens'

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

globalStyle('*', {
  fontFamily: "'ptBold', Arial, Helvetica, sans-serif!important",
})

globalStyle('h1, h2, h3, h4, h5', {
  fontFamily: 'var(--display-font)!important',
  lineHeight: '1.125!important',
})

globalStyle('p', {
  fontFamily: 'var(--ui-font)!important',
})

globalStyle('light-font', {
  fontWeight: 300,
  fontFamily: "'ptRegular', Arial, Helvetica, sans-serif!important",
})

export const lightFont = style({
  fontFamily: "'ptRegular', Arial, Helvetica, sans-serif!important",
  fontWeight: 300,
})

export const mediumFont = style({
  fontFamily: 'PTRootUIWebLight, Arial, Helvetica, sans-serif!important',
  fontWeight: 600,
})

export const noTextWrap = style({
  whiteSpace: 'nowrap',
})

export const textCenter = style({
  textAlign: 'center',
})

export const leadingTight = style({
  lineHeight: 1.125,
})

export const buttonStyle = style([
  {
    backgroundColor: 'var(--light-grey)',
  },
  atoms({
    p: 'x2',
    borderRadius: 'round',
    justifyContent: 'center',
  }),
])

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

globalStyle('.zord-accordionTrigger > span', {
  fontFamily: "'Londrina Solid', cursive!important",
  fontSize: typography.fontSize[20],
  paddingBottom: 10,
})

globalStyle('.zord-attributesHeading', {
  fontFamily: "'Londrina Solid', cursive!important",
  fontSize: '24px!important', // @BJ todo: replace when zord is vendored
})

globalStyle('.nouns-market-traits h3 > button > span', {
  fontFamily: "'ptBold', Arial, Helvetica, sans-serif!important",
  fontSize: typography.fontSize[14],
  textTransform: 'capitalize',
  paddingBottom: 0,
})

globalStyle('.nouns-market-traits h3 > button', {
  backgroundColor: `${color.background2}!important`,
  padding: 10,
  borderRadius: radii.curved,
  marginBottom: 5,
})

/* PAGE HEADER */
export const pageHeadline = style([
  {
    fontWeight: typography.fontWeight.display,
    fontSize: typography.fontSize[48],
    lineHeight: typography.lineHeight[40],
    '@media': {
      [media.min1024]: {
        lineHeight: typography.lineHeight[50],
      },
    },
  },
])

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

export const hideMobile = style({
  '@media': {
    '(max-width: 500px)': {
      display: 'none',
    },
  },
})

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
  {
    fontWeight: typography.fontWeight.display,
    fontSize: 42, // one-off
    lineHeight: 48,
    '@media': {
      [media.min1024]: {
        fontSize: 96, // one-off
        lineHeight: 94,
      },
    },
  },
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
