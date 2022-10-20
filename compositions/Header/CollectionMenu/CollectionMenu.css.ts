import { style } from '@vanilla-extract/css'
import { atoms, color, media, space, vars } from '@zoralabs/zord'

export const tabsButton = style([
  {
    all: 'unset',
    fontFamily: 'inherit',
    backgroundColor: `${color.background1}`,
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: vars.color.text2,
    cursor: 'pointer',
    zIndex: 3,
    width: '100%',
    paddingBottom: space.x2,
    borderBottom: `2px solid transparent`,
    selectors: {
      '&:first-child': { borderTopLeftRadius: 40 },
      '&:last-child': { borderTopRightRadius: 40 },
      '&:hover': { borderBottom: `2px solid ${color.accentActive}` },
      '&[data-state="active"]': {
        color: vars.color.text1,
        borderBottom: `2px solid ${color.neutralActive}`,
      },
    },
  },
])

export const tabsList = style([
  {
    borderBottom: `2px solid ${color.background2}`,
    zIndex: 4,
  },
  atoms({
    display: 'flex',
    position: 'absolute',
    width: '100%',
  }),
])

export const label = style({
  color: vars.color.text1,
})

export const collectionTrigger = style([
  {
    gridColumn: '1',
    gridRow: '2',
    height: 42,
    '@media': {
      [media.min1024]: {
        gridColumn: '3',
        gridRow: '1',
      },
    },
  },
  atoms({
    gap: 'x2',
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
