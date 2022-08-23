import { style, globalStyle } from '@vanilla-extract/css'
import { atoms, media, typography, colorTheme, radii, fontWeight } from '@zoralabs/zord'
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

globalStyle('light-font', {
  fontWeight: 300,
  fontFamily: "'ptRegular', Arial, Helvetica, sans-serif!important",
})

export const lightFont = style({
  fontWeight: 300,
  fontFamily: "'ptRegular', Arial, Helvetica, sans-serif!important",
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

export const lightGreyType = style({
  color: 'var(--dk-grey)',
})

export const buttonStyle = style([
  {
    backgroundColor: 'var(--light-grey)',
  },
  atoms({
    borderRadius: 'round',
    px: 'x2',
    py: 'x2',
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

export const maxWidthSm = style([
  {
    maxWidth: MAX_WIDTH.SM,
  },
  atoms({
    width: '100%',
    margin: 'auto',
  }),
])

globalStyle('.zord-acccordionTrigger > span', {
  fontFamily: "'Londrina Solid', cursive!important",
  fontSize: typography.size[8],
  paddingBottom: 10,
})

globalStyle('.zord-attributesHeading', {
  fontFamily: "'Londrina Solid', cursive!important",
  fontSize: typography.size[8],
  paddingTop: 10,
})

globalStyle('.nouns-market-traits h3 > button > span', {
  fontFamily: "'ptBold', Arial, Helvetica, sans-serif!important",
  fontSize: `${typography.size[10]}!important`,
  textTransform: 'capitalize',
  paddingBottom: 0,
})

globalStyle('.nouns-market-traits h3 > button', {
  backgroundColor: `${colorTheme.background.tertiary}!important`,
  paddingLeft: 10,
  paddingRight: 10,
  paddingBottom: 10,
  borderRadius: radii.curved,
  marginBottom: 5,
})

export const clickAnimation = style({
  transition:
    'border 0.1s ease-in-out, background 0.1s ease-in-out, transform 0.1s ease-out',
  userSelect: 'none',
  selectors: {
    '&:focus-visible': {
      outline: '2px solid rgb(32, 103, 243)',
      outlineStyle: 'auto',
    },
    '&:active': {
      transform: 'scale(0.95)',
    },
    '&[disabled]': {
      cursor: 'not-allowed',
      pointerEvents: 'none',
      opacity: 0.6,
    },
    '&[disabled]:active': {
      transform: 'unset',
    },
  },
})

/* PAGE HEADER */
export const pageHeadline = style([
  {
    fontWeight: fontWeight.display,
    lineHeight: '40px',
    '@media': {
      [media.min1024]: {
        lineHeight: '50px',
      },
    },
  },
  atoms({
    fontSize: {
      '@initial': '48px',
      '@1024': typography.size[1],
    },
  }),
])

export const pageHeaderWrapper = style([
  {
    maxWidth: MAX_WIDTH.SM,
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

export const collectionHeaderWrapper = style([
  {
    maxWidth: MAX_WIDTH.LG,
  },
  atoms({
    w: '100vw',
    overflowX: 'hidden',
    m: 'auto',
  }),
])

export const daoHeaderWrapper = style([
  {
    gridTemplateColumns: '1fr',
    '@media': {
      [media.min1024]: {
        gridTemplateColumns: '1fr 1fr',
      },
    },
  },
  atoms({
    pb: {
      '@initial': 'x2',
      '@1024': 'x6',
    },
  }),
])

export const collectionNameThumbDao = style([
  {
    gridTemplateColumns: '1fr',
    '@media': {
      [media.min1024]: {
        gridTemplateColumns: '100px auto',
      },
    },
  },
  atoms({
    gap: {
      '@initial': 'x0',
      '@1024': 'x4',
    },
  }),
])

export const marketStatsWrapper = atoms({
  overflowX: 'scroll',
  w: {
    '@initial': '100vw',
    '@1024': 'auto',
  },
  px: {
    '@initial': 'x4',
    '@1024': 'x0',
  },
  mb: {
    '@initial': 'x2',
    '@1024': 'x0',
  },
})

export const stat = style({
  whiteSpace: 'nowrap',
})
