import { style, globalStyle } from '@vanilla-extract/css'
import { atoms, media } from '@zoralabs/zord'
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
