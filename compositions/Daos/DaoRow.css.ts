import { style } from '@vanilla-extract/css'
import { atoms, color, media } from '@zord/config'

export const rowWrap = style([
  {
    height: '96px',
    '@media': {
      [media.min1024]: {
        borderTop: `2px solid ${color.background2}`,
      },
    },
    selectors: {
      '&:first-child': {
        borderTop: 'none',
      },
    },
  },
  atoms({
    display: 'flex',
    alignItems: 'center',
  }),
])

export const daoMeta = style([
  {
    width: '304px',
  },
])

export const metadataCells = style([
  {
    flexGrow: 1,
  },
  atoms({
    marginRight: 'x8',
    gap: 'x6',
    display: 'flex',
  }),
])

export const cell = style([
  {
    width: '33%',
  },
  atoms({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  }),
])

export const cardHeader = atoms({
  display: 'flex',
  justifyContent: 'space-between',
})

export const placeholderCell = style([
  {
    width: '88px',
  },
])

export const header = style([
  atoms({
    height: 'x10',
  }),
])

// mobile

export const mobileCardWrapper = style([
  {
    border: `2px solid ${color.background2}`,
  },
  atoms({
    p: 'x4',
    borderRadius: 'phat',
    mb: 'x4',
  }),
])

export const mobileCell = style([
  {
    width: '50%',
    height: '50px',
  },
  atoms({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    mb: 'x3',
  }),
])
