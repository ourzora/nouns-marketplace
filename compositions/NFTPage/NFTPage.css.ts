import { MAX_WIDTH } from 'styles/style-constants'

import { globalStyle, style } from '@vanilla-extract/css'
import { atoms, media, radii, vars } from '@zoralabs/zord'

export const nftPageWrapper = style([
  {
    maxWidth: MAX_WIDTH.MED,
    gridTemplateColumns: 'repeat(4, [col-start] 1fr)',
    gridTemplateRows: 'auto',
    '@media': {
      [media.min1024]: {
        gridTemplateColumns: 'repeat(12, [col-start] 1fr)',
        maxWidth: MAX_WIDTH.XL,
      },
    },
  },
  atoms({
    width: '100%',
    margin: 'auto',
    mt: { '@initial': 'x0', '@1024': 'x10' },
    mb: 'x0',
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
    gridColumn: '1/span 4',
    '@media': {
      [media.min1024]: {
        borderRadius: radii.phat,
        gridColumn: '3/span 5',
        // gridArea: 'nft-hero / 1 / 1 / 1 / 1',
      },
    },
  },
])

export const nftInfoSidebar = style([
  {
    gridColumn: '1/span 4',
    // 'selectors': {
    //   '&:last-child': {
    //     marginTop: 'auto'
    //   }
    // },
    '@media': {
      [media.min1024]: {
        gridColumn: '8/span 3',
        // gridArea: 'nft-sidebar / 1 / 1 / last-line / 1',
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

// export const nftInfoSidebarWrapper = style([
//   {
//     maxWidth: 400,
//   },
//   atoms({
//     width: '100%',
//     overflowX: 'hidden',
//     gap: {
//       '@initial': 'x3',
//       '@1024': 'x6',
//     },
//     position: {
//       '@initial': 'relative',
//       '@1024': 'sticky',
//     },
//     top: {
//       '@initial': 'auto',
//       '@1024': 'x6',
//     },
//   }),
// ])

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
    borderColor: vars.color.background2,
    marginTop: 'auto',
    borderRadius: 0,
    borderWidth: 'none',
    '@media': {
      [media.min1024]: {
        borderWidth: radii.tiny,
        borderRadius: radii.phat,
      },
    },
  },
  atoms({
    mt: 'auto',
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
        // gridArea: 'nft-attributes / 1 / 2',
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
    gridColumn: '1/span 4',
    '@media': {
      [media.min1024]: {
        // gridArea: 'nft-attributes / 1 / 2',
        gridColumn: '3/span 5',
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
    backgroundColor: vars.color.background2,
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

export const nftNextButton = style([
  {
    marginLeft: '.5rem',
    width: '2rem',
    height: '2rem',
    backgroundRepeat: 'no-repeat',
    fontSize: 'large',
    padding: 0,
    fontWeight: 700,
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif!important',
  },
  atoms({
    backgroundSize: 'contain',
    display: 'inline-block',
    borderRadius: 'round',
  }),
])
