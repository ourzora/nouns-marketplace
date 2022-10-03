import { style } from '@vanilla-extract/css'
import { color, space, atoms, vars, media, typography } from '@zoralabs/zord'
import { MODAL_TAB_LAYER } from '../../constants/layers'

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

export const tabsButton = style([
  {
    zIndex: MODAL_TAB_LAYER,
    backgroundColor: `${color.background1}`,
    fontSize: typography.fontSize[20],
    borderBottom: `2px solid transparent`,
    selectors: {
      '&:first-child': { borderTopLeftRadius: space.x10 },
      '&:last-child': { borderTopRightRadius: space.x10 },
      '&:hover': { borderBottom: `2px solid ${color.accentHover}` }, // previously 0.3, maybe should use accentActive
      '&[data-state="active"]': {
        color: vars.color.text1,
        borderBottom: `2px solid ${color.neutralActive}`,
      },
    },
  },
  atoms({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'x5',
    paddingBottom: 'x2',
    width: '100%',
    cursor: 'pointer',
    borderColor: 'transparent',
    color: 'tertiary',
  }),
])

export const tabsList = style([
  {
    borderBottom: `2px solid ${color.background2}`,
    zIndex: MODAL_TAB_LAYER,
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
