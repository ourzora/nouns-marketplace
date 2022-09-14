import { style } from '@vanilla-extract/css'
import { color, space, atoms, vars, media } from '@zoralabs/zord'

export const tabsButton = style([
  {
    all: 'unset',
    fontFamily: 'inherit',
    backgroundColor: `${color.white100}`,
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: vars.color.text.secondary,
    cursor: 'pointer',
    zIndex: 3,
    width: '100%',
    paddingBottom: space.x2,
    borderBottom: `2px solid transparent`,
    selectors: {
      '&:first-child': { borderTopLeftRadius: 40 },
      '&:last-child': { borderTopRightRadius: 40 },
      '&:hover': { borderBottom: `2px solid ${color.black30}` },
      '&[data-state="active"]': {
        color: vars.color.text.primary,
        borderBottom: `2px solid ${color.black70}`,
      },
    },
  },
])

export const tabsList = style([
  {
    borderBottom: `2px solid ${color.black10}`,
    zIndex: 4,
  },
  atoms({
    display: 'flex',
    position: 'absolute',
    width: '100%',
  }),
])

export const label = style({
  color: vars.color.text.primary,
})

export const collectionTrigger = style([
  {
    gridColumn: '1',
    gridRow: '2',
    height: 42,
    gridGap: space.x2,
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
    borderRadius: 'curved',
    display: 'flex',
  }),
])

export const modalWrapper = style([
  {
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '::-webkit-scrollbar': {
      display: 'none',
    },
    height: 400,
  },
  atoms({
    overflowY: 'scroll',
  }),
])
