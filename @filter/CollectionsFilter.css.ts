import { PRIMARY_LAYER } from 'constants/layers'
import { HEADER_HEIGHT } from 'styles/style-constants'

import {
  FILTER_HEADER_HEIGHT,
  FILTER_OPEN_STICKY_OFFSET,
  FILTER_OPEN_STICKY_OFFSET_MOBILE,
  FILTER_SIDEBAR_WIDTH,
} from '@filter/constants'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { atoms, color, ease, media, space, typography, vars } from '@zord/config'

export const borderStyle = `2px solid ${vars.color.border}`

export const errorText = style({ color: vars.color.negative })

export const textButton = style([
  {
    fontWeight: 600,
  },
  atoms({ whiteSpace: 'nowrap' }),
])

export const textSmall = style({
  fontSize: 14,
})

export const checkBox = atoms({
  width: '100%',
  height: '100%',
})

export const filtersButton = style([
  {
    gap: 6,
  },
  atoms({
    pl: 'x4',
    pr: 'x3',
  }),
])

export const activityButton = style([
  atoms({
    gap: 'x3',
    pl: 'x4',
    pr: 'x3',
    whiteSpace: 'nowrap',
    flexDirection: 'row-reverse',
  }),
])

export const filterWrapper = style({
  top: `${FILTER_OPEN_STICKY_OFFSET}px`,
  background: 'white',
  zIndex: 2,
  '@media': {
    'screen and (max-width: 768px)': {
      top: `${FILTER_OPEN_STICKY_OFFSET_MOBILE}px`,
    },
  },
})

export const openFilterWrapper = style({
  height: `calc(100vh - ${FILTER_OPEN_STICKY_OFFSET}px)`,
  '@media': {
    'screen and (max-width: 768px)': {
      position: 'fixed',
      left: 0,
      paddingLeft: '16px',
      top: `var(--filter-offset-mobile)`,
    },
  },
})

export const filterWrapperContainer = style({
  top: `${FILTER_HEADER_HEIGHT + HEADER_HEIGHT}px`,
  gridTemplateColumns: '1fr',
})

export const filterOpen = style({
  gridTemplateColumns: `${FILTER_SIDEBAR_WIDTH + 32}px 1fr`,
})

export const gridFilterHeaderPanel = style({
  '@media': {
    [media.min1024]: {
      height: FILTER_HEADER_HEIGHT,
    },
  },
})

export const filterHeader = style([
  {
    zIndex: 1,
    '@media': {
      [media.min1024]: {
        height: FILTER_HEADER_HEIGHT,
      },
    },
  },
  atoms({
    position: 'sticky',
    justifyContent: { '@initial': 'space-between', '@1024': 'flex-start' },
    alignItems: 'center',
    py: {
      '@initial': 'x4',
      '@1024': 'x0',
    },
  }),
])

export const stickyFilterHeader = atoms({ top: 'x0' })

export const avatarPadding = style({
  paddingLeft: '3px',
})

export const filterSidebar = style([
  atoms({
    overflowY: 'scroll',
    backgroundColor: 'background1',
    pr: { '@initial': 'x0' },
    w: '100%',
    h: { '@initial': '100%', '@768': '100vh' },
  }),
])

export const sideBarSeparator = style([
  {
    borderTop: borderStyle,
    width: 'calc(100% - 32px)',
    zIndex: 100,
    opacity: 0,
    transition: `opacity 150ms ${vars.ease.in}`,
  },
  atoms({
    position: 'relative',
  }),
])

export const filterSidebarScrolled = style({
  opacity: 1,
})

export const collectionBlock = style([
  {
    selectors: {
      '&:hover&:after': {
        opacity: 1,
        transition: `opacity 50ms ${vars.ease.inOut}`,
      },
      '&:hover': {
        transition: `padding 150ms ${vars.ease.inOut}`,
      },
      '&:after': {
        content: '',
        position: 'absolute',
        zIndex: 0,
        width: '100%',
        height: '100%',
        inset: '0',
        opacity: 0,
        backgroundColor: vars.color.background2,
        cursor: 'pointer',
        borderRadius: vars.radii.curved,
      },
    },
  },
  atoms({
    textAlign: 'left',
    overflow: 'visible',
    pl: 'x1',
  }),
])

export const collectionBlockContent = style({
  zIndex: 1,
})

export const collectionBlockMeta = style([
  {
    gap: 'unset',
  },
  atoms({
    alignSelf: 'center',
    cursor: 'pointer',
  }),
])

export const filterOption = style([
  {
    outline: 0,
    transition: `border 100ms ${ease.inOut}, background 100ms ${ease.inOut}, transform 200ms ${ease.out}`,
    cursor: 'pointer',
    selectors: {
      '&:hover:not([disabled])': {
        backgroundColor: vars.color.background1,
      },
      '&:focus-visible': {
        outline: '2px solid rgb(32, 103, 243)',
        outlineStyle: 'auto',
      },
      '&:active': {
        transform: 'scale(0.95)',
      },
      '&[disabled]': {
        cursor: 'not-allowed',
        color: vars.color.text3,
        pointerEvents: 'none',
      },
      '&:active&[disabled]': {
        transform: 'unset',
        cursor: 'not-allowed', // to discuss: cursor won't show because of pointerEvents directive above
      },
    },
  },
  atoms({
    height: 'x10',
    width: 'auto',
    minWidth: 'x19', // 76px
    userSelect: 'none',
    backgroundColor: 'transparent',
  }),
])

export const activityModal = style([
  {
    zIndex: 100,
    inset: '0px 0px auto auto',
    transform: `translate(-24px, ${HEADER_HEIGHT + FILTER_HEADER_HEIGHT - 6}px)`,
    width: 230,
  },
  atoms({
    p: 'x0',
  }),
])

const pill = {
  padding: `0 ${vars.space.x3}`,
  height: vars.space.x10,
  borderRadius: vars.radii.round,
  marginBottom: 0,
  fontSize: 16,
  fontWeight: typography.fontWeight.label,
  lineHeight: 1,
}

export const currencySelectVariants = {
  variant: {
    large: {
      px: vars.space.x4,
      height: vars.space.x15,
      fontSize: 16,
    },
    greyPill: {
      ...pill,
      selectors: {
        '&:focus': {
          border: 0,
        },
      },
    },
    whitePill: {
      ...pill,
      boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1), 0px 0.8px 2.6px rgba(0, 0, 0, 0.05)',
      backgroundColor: vars.color.background1,
    },
  },
}

export const currencySelect = recipe({
  variants: currencySelectVariants,

  base: {},
})

const symbolTextVariants = {
  variant: {
    large: {
      fontSize: 16,
    },
    greyPill: {
      fontSize: 16,
      fontWeight: typography.fontWeight.label,
    },
    whitePill: {
      fontSize: 16,
      fontWeight: typography.fontWeight.label,
    },
  },
}

export const symbolText = recipe({
  variants: symbolTextVariants,

  base: [
    style({
      visibility: 'hidden',
    }),
    atoms({
      position: 'absolute',
      pointerEvents: 'none',
      width: 'auto',
    }),
  ],
})

export const filterSidebarModalContent = style([
  {
    transform: 'none',
  },
  atoms({
    position: 'fixed',
    inset: 'x0',
  }),
])

export const filterSidebarModalBackground = style([
  {
    borderRadius: 0,
  },
  atoms({
    position: 'fixed',
    height: '100vh',
    padding: 'x0',
    inset: 'x0',
    maxHeight: '100vh',
  }),
])

export const mobileFiltersFooter = style([
  {
    borderTop: borderStyle,
    zIndex: 100,
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  atoms({
    display: {
      '@initial': 'grid',
      '@1024': 'none',
    },
    pos: 'fixed',
    bottom: 'x0',
    left: 'x0',
    p: 'x4',
    gap: 'x4',
    w: '100%',
  }),
])

export const selectLabel = style([
  {
    zIndex: PRIMARY_LAYER,
    textIndent: space.x4,
  },
  atoms({
    lineHeight: 55,
    pointerEvents: 'none',
    userSelect: 'none',
  }),
])

export const selectDropdown = style([
  {
    appearance: 'none',
  },
  atoms({
    userSelect: 'none',
    backgroundColor: 'background2',
  }),
])
