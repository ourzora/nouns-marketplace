import { style, globalStyle } from '@vanilla-extract/css'
import { atoms, media, color } from '@zoralabs/zord'
import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE, HEADER_Z } from 'styles/style-constants'

export const headerWrapper = style([
  {
    height: HEADER_HEIGHT_MOBILE,
    zIndex: HEADER_Z,
    alignContent: 'center',
    alignItems: 'center',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'auto',
    borderBottom: `2px solid ${color.black10}`,
    '@media': {
      [media.min1024]: {
        height: HEADER_HEIGHT,
        gridTemplateColumns: 'repeat(24, 1fr)',
        borderBottom: 'none',
      },
    },
  },
  atoms({
    w: '100%',
    p: {
      '@initial': 'x4',
      '@1024': 'x4',
    },
    pos: 'relative',
    gap: 'x4',
  }),
])

export const nounsGlassesLink = style([
  {
    gridColumn: '1',
    aspectRatio: '70 / 24',
    maxHeight: '30px',
  },
  atoms({
    cursor: 'pointer',
    pos: 'relative',
    h: '100%',
  }),
])

export const nounsGlasses = style([
  atoms({
    w: '100%',
    h: '100%',
    inset: 'x0',
  }),
])

export const collectionTrigger = style([
  atoms({
    borderRadius: 'curved',
    gap: 'x2',
    px: 'x4',
  }),
])

export const collectionTriggerWrapper = style([
  {
    gridColumn: '1',
    gridRow: '2',
    '@media': {
      [media.min1024]: {
        gridColumn: '3',
        gridRow: '1',
      },
    },
  },
  atoms({
    w: '100%',
    justifyContent: 'flex-start',
  }),
])

export const modalWrapper = style({
  overflowY: 'scroll',
  height: 400,
})

export const manageButtonWrapper = style([
  {
    gridColumn: '2',
    gridRow: '2',
    '@media': {
      [media.min1024]: {
        gridColumn: '23',
        gridRow: '1',
      },
    },
  },
  atoms({
    w: '100%',
    justifyContent: 'flex-end',
  }),
])

export const manageButton = style([
  {
    width: 130,
  },
  atoms({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    h: '100%',
    backgroundColor: 'tertiary',
    py: {
      '@initial': 'x1',
      '@1024': 'x2',
    },
  }),
])

export const connectWrapper = style([
  {
    gridColumn: '2',
    gridRow: '1',
    '@media': {
      [media.min1024]: {
        gridColumn: '24',
        gridRow: '1',
      },
    },
  },
  atoms({
    w: '100%',
    justifyContent: 'flex-end',
  }),
])
