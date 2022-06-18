import { style, globalStyle } from '@vanilla-extract/css'
import { atoms, media, typography, colorTheme, radii } from '@zoralabs/zord'
import {
  FOOTER_HEIGHT,
  FOOTER_HEIGHT_MOBILE,
  HEADER_HEIGHT,
  HEADER_HEIGHT_MOBILE,
} from './style-constants'

globalStyle('html, body', {
  margin: 0,
  padding: 0,
})

globalStyle('*', {
  fontFamily: "'ptBold', Arial, Helvetica, sans-serif!important",
})

globalStyle('h1, h2, h3', {
  fontFamily: "'Londrina Solid', cursive!important",
})

globalStyle('light-font', {
  fontWeight: 300,
})

export const lightFont = style({
  fontWeight: 300,
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
  borderRadius: radii.curved,
  marginBottom: 5,
})
