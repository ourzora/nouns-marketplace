import { FILTER_HEADER_HEIGHT, FILTER_SIDEBAR_WIDTH } from './filter-constants'
import { style } from '@vanilla-extract/css'
import { atoms, textVariants, vars } from '@zoralabs/zord'
import { HEADER_HEIGHT, HEADER_HEIGHT_MOBILE } from 'styles/style-constants'

export const homepageGrid = style({
  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: `1fr`,
    },
  },
})

export const errorText = style({ color: vars.color.error.default })

export const textButton = style([
  {
    whiteSpace: 'nowrap',
    fontWeight: 600,
  },
])

export const textSmall = style({
  fontSize: textVariants.variant['label-sm'].fontSize,
})

export const checkBox = style({
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

export const activityButton = style([
  {
    gap: 12,
    whiteSpace: 'nowrap',
  },
  atoms({
    flexDirection: 'row-reverse',
    pl: 'x4',
    pr: 'x3',
  }),
])

export const filterWrapper = style({
  top: `${HEADER_HEIGHT}px`,
  background: 'white',
  zIndex: 2,
  '@media': {
    'screen and (max-width: 768px)': {
      top: `${HEADER_HEIGHT_MOBILE}px`,
    },
  },
})

export const openFilterWrapper = style({
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  '@media': {
    'screen and (max-width: 768px)': {
      position: 'fixed',
      left: 0,
      paddingLeft: '32px',
      top: `${HEADER_HEIGHT_MOBILE}px`,
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

export const filterHeader = style({
  height: FILTER_HEADER_HEIGHT,
  zIndex: 1,
})

export const stickyFilterHeader = style({
  top: `${HEADER_HEIGHT}px`,
  backdropFilter: 'blur(20px)',
  backgroundColor: 'rgba(255, 255, 255, 0.92)',
})

export const avatarPadding = style({
  paddingLeft: '3px',
})

export const filterCounter = style({
  whiteSpace: 'nowrap',
})

export const filterSidebar = style({
  overflowY: 'scroll',
  height: `calc(100% - ${HEADER_HEIGHT}px)`,
  '@media': {
    'screen and (max-width: 768px)': {
      position: 'fixed',
      background: vars.color.background.primary,
      width: '100%',
      paddingRight: '64px',
    },
  },
})

export const sideBarSeparator = style({
  borderTop: `2px solid ${vars.color.border.tertiary}`,
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
      backgroundColor: vars.color.background.tertiary,
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
  transition: 'border 100ms $inOut, background 100ms $inOut, transform 200ms $out',
  userSelect: 'none',
  backgroundColor: '$transparent',
  selectors: {
    '&:hover:not([disabled])': {
      backgroundColor: vars.color.background.primary,
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
      color: '$black50',
      pointerEvents: 'none',
    },
    '&:active&[disabled]': {
      transform: 'unset',
      cursor: 'not-allowed', // to discuss: cursor won't show because of pointerEvents directive above
    },
  },
})

export const filterOptionsWrapper = style({
  borderBottom: `2px solid ${vars.color.border.tertiary}`,
})

export const activityModal = style([
  {
    zIndex: 100,
    inset: '0px 0px auto auto',
    transform: `translate(-24px, ${HEADER_HEIGHT + FILTER_HEADER_HEIGHT - 6}px)`,
    width: 230,
  },
  atoms({
    pl: 'x0',
    pr: 'x0',
    pb: 'x0',
    pt: 'x0',
  }),
])

export const filterPropertySelect = style([
  {
    textAlign: 'left',
    justifyContent: 'flex-start',
  },
])
