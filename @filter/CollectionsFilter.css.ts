import { HEADER_HEIGHT } from 'styles/style-constants'

import { FILTER_HEADER_HEIGHT, FILTER_SIDEBAR_WIDTH } from '@filter/constants'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { atoms, ease, media, typography, vars } from '@zoralabs/zord'

export const borderStyle = `2px solid ${vars.color.border}`

export const errorText = style({ color: vars.color.negative })

export const textButton = style([
  {
    fontWeight: 600,
  },
  atoms({ whiteSpace: 'nowrap' }),
])

export const textSmall = style({
  fontSize: typography.fontSize[14],
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
    pl: 'x0',
  }),
])

export const activityButton = atoms({
  gap: 'x3',
  whiteSpace: 'nowrap',
  flexDirection: 'row-reverse',
  pl: 'x4',
  pr: 'x3',
})

export const filterWrapper = style({
  top: `var(--filter-offset-desktop)`,
  background: 'white',
  zIndex: 2,
  '@media': {
    'screen and (max-width: 768px)': {
      top: `var(--filter-offset-mobile)`,
    },
  },
})

export const openFilterWrapper = style({
  height: `calc(100vh - var(--filter-offset-desktop))`,
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

export const stickyFilterHeader = style({
  top: `0px`,
  //backdropFilter: 'blur(20px)',
  //backgroundColor: 'rgba(255, 255, 255, 0.92)',
})

export const avatarPadding = style({
  paddingLeft: '3px',
})

export const filterCounter = style({
  whiteSpace: 'nowrap',
})

export const filterSidebar = style([
  {
    overflowY: 'scroll',
    height: `calc(100% - ${HEADER_HEIGHT}px)`,
    '@media': {
      'screen and (max-width: 768px)': {
        position: 'relative',
        background: vars.color.background1,
        width: '100%',
        paddingRight: '0',
        height: '100%',
      },
    },
  },
])

export const sideBarSeparator = style({
  borderTop: borderStyle,
  position: 'relative',
  width: 'calc(100% - 32px)',
  zIndex: 100,
  opacity: 0,
  transition: `opacity 150ms ${vars.ease.in}`,
})

export const filterSidebarScrolled = style({
  opacity: 1,
})

export const collectionBlock = style({
  textAlign: 'left',
  overflow: 'visible',
  selectors: {
    '&:hover&:after': {
      opacity: 1,
      transition: `opacity 50ms ${vars.ease.inOut}`,
    },
    '&:hover': {
      paddingLeft: '3px',
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
      borderRadius: vars.radii.small,
    },
  },
})

export const collectionBlockContent = style({
  zIndex: 1,
})

export const collectionBlockMeta = style({
  alignSelf: 'center',
  gap: 'unset',
  cursor: 'pointer',
})

export const filterOption = style({
  height: '40px',
  width: 'auto',
  minWidth: '76px',
  cursor: 'pointer',
  outline: 0,
  transition: `border 100ms ${ease.inOut}, background 100ms ${ease.inOut}, transform 200ms ${ease.out}`,
  userSelect: 'none',
  backgroundColor: 'transparent',
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
})

export const filterOptionsWrapper = style({
  borderBottom: `2px solid ${vars.color.border}`,
})

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

export const filterPropertySelect = style([
  {
    textAlign: 'left',
    justifyContent: 'flex-start!important', // TODO: remove !important invocations when zord has been vendored into marketplace
    height: 'unset!important',
  },
])

const pill = {
  padding: `0 ${vars.space.x3}`,
  height: vars.space.x10,
  borderRadius: vars.radii.round,
  marginBottom: 0,
  fontSize: typography.fontSize[16],
  fontWeight: typography.fontWeight.label,
  lineHeight: 1,
}

export const currencySelectVariants = {
  variant: {
    large: {
      px: vars.space.x4,
      height: vars.space.x15,
      fontSize: typography.fontSize[16],
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
      fontSize: typography.fontSize[16],
    },
    greyPill: {
      fontSize: typography.fontSize[16],
      fontWeight: typography.fontWeight.label,
    },
    whitePill: {
      fontSize: typography.fontSize[16],
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
    backgroundColor: 'primary',
    w: '100%',
  }),
])
