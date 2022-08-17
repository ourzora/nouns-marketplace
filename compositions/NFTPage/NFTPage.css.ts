import { style, globalStyle } from '@vanilla-extract/css'
import { atoms, vars, typography, media, radii } from '@zoralabs/zord'
import { MAX_WIDTH } from 'styles/style-constants'

export const nftPageWrapper = style([
  {
    maxWidth: MAX_WIDTH.MED,
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    '@media': {
      [media.min1024]: {
        gridTemplateColumns: '5fr 3fr',
      },
    },
  },
  atoms({
    width: '100%',
    margin: 'auto',
    my: 'x0',
    px: {
      '@initial': 'x0',
      '@1024': 'x4',
    },
    gap: {
      '@initial': 'x4',
      '@1024': 'x6',
    },
    position: {
      '@initial': 'relative',
      '@1024': 'sticky',
    },
    top: {
      '@initial': 'auto',
      '@1024': 'x0',
    },
  }),
])

export const nftPageHero = style([
  {
    '@media': {
      [media.min1024]: {
        borderRadius: radii.phat,
        gridArea: 'nft-hero / 1 / 1 / 1 / 1',
      },
    },
  },
])

export const nftInfoSidebar = style([
  {
    '@media': {
      [media.min1024]: {
        gridArea: 'nft-sidebar / 1 / 1 / last-line / 1',
      },
    },
  },
  atoms({
    width: '100%',
    gap: {
      '@initial': 'x3',
      '@1024': 'x6',
    },
    px: {
      '@initial': 'x4',
      '@1024': 'x0',
    },
    position: {
      '@initial': 'relative',
      '@1024': 'sticky',
    },
    top: {
      '@initial': 'auto',
      '@1024': 'x6',
    },
  }),
])

export const nftInfoSidebarWrapper = style([
  {
    maxWidth: 400,
  },
  atoms({
    width: '100%',
    overflowX: 'hidden',
    gap: {
      '@initial': 'x3',
      '@1024': 'x6',
    },
    position: {
      '@initial': 'relative',
      '@1024': 'sticky',
    },
    top: {
      '@initial': 'auto',
      '@1024': 'x6',
    },
  }),
])

globalStyle(
  `
  ${nftInfoSidebar} .zora-modal-trigger,
  ${nftInfoSidebar} .zora-modal-trigger-wrapper,
  ${nftInfoSidebar} .zora-market-cardMarketTrigger
`,
  {
    width: '100%',
  }
)

export const nftMarketWrapper = style([
  {
    borderColor: vars.color.background.secondary,
  },
  atoms({
    borderRadius: 'phat',
    borderWidth: 'normal',
    borderStyle: 'solid',
    p: {
      '@initial': 'x4',
      '@1024': 'x6',
    },
    gap: {
      '@initial': 'x2',
      '@1024': 'x4',
    },
  }),
])

export const nftAttributes = style([
  {
    '@media': {
      [media.min1024]: {
        gridArea: 'nft-attributes / 1 / 2',
      },
    },
  },
  atoms({
    w: '100%',
    px: {
      '@initial': 'x4',
      '@1024': 'x0',
    },
  }),
])

export const attributesHistoryWrapper = style([
  {
    '@media': {
      [media.min1024]: {
        gridArea: 'nft-attributes / 1 / 2',
      },
    },
  },
  atoms({
    w: '100%',
    gap: {
      '@initial': 'x4',
      '@1024': 'x6',
    },
  }),
])

export const nftAttributesWrapper = style([
  {
    gridTemplateColumns: '1fr',
    '@media': {
      [media.min1024]: {
        gridTemplateColumns: '1fr 1fr',
      },
    },
  },
  atoms({
    width: '100%',
    gap: {
      '@initial': 'x2',
      '@1024': 'x4',
    },
  }),
])

export const nftAttribute = style([
  {
    backgroundColor: vars.color.background.tertiary,
  },
  atoms({
    width: '100%',
    alignItems: 'center',
    borderRadius: 'curved',
    p: {
      '@initial': 'x2',
      '@1024': 'x4',
    },
  }),
])
