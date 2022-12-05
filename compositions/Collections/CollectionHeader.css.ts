import { style } from '@vanilla-extract/css'
import { atoms, media, space } from '@zoralabs/zord'

// export const collectionPageHero = style([
//   {
//     // gridColumn: '3/span 8',
//     border: '1px solid red',
//     gridColumn: '1/span 4',
//     '@media': {
//       [media.min1024]: {
//         gridColumn: '3/span 8',
//       },
//     },
//   },
//   atoms({
//     borderColor: 'negative',
//   }),
// ])

// export const daoPageHero = style([
//   {
//     // gridTemplateColumns: '1fr',
//     // '@media': {
//     //   [media.min1024]: {
//     //     gridTemplateColumns: '1fr 1fr',
//     //   },
//     // },
//     gridColumn: '1/span 4',
//     '@media': {
//       [media.min1024]: {
//         gridColumn: 'span 12',
//       },
//     },
//   },
//   atoms({
//     w: '100%',
//     // overflowX: 'hidden',
//     // mx: 'auto',
//     // pb: {
//     //   '@initial': 'x2',
//     //   '@1024': 'x6',
//     // },
//   }),
// ])
export const collectionGrid = style([
  {
    gridColumn: '1/span 4',
    gridTemplateColumns: 'repeat(4, [col-start] 1fr)',
    // gap: space.x6,
    // gap: space.x6,
    // gridRowGap: space.x13,
    gridColumnGap: space.x4,
    gridRowGap: space.x4,
    '@media': {
      [media.min1024]: {
        gridColumn: '1/span 12',
        gridColumnGap: space.x6,
        gridRowGap: space.x13,
        gridTemplateColumns: 'repeat(12, [col-start] 1fr)',
      },
    },
  },
  atoms({
    // gap: {'@initial': 'x4','@1024': 'x6'}
  }),
])
export const activeAuction = style([
  {
    gridTemplateColumns: 'repeat(4, [col-start] 1fr)',
    gridColumn: '1/span 4',
    '@media': {
      [media.min1024]: {
        gridTemplateColumns: 'repeat(8, [col-start] 1fr)',
        gridColumn: '3/span 8',
      },
    },
  },
  atoms({
    gap: { '@initial': 'x4', '@1024': 'x6' },
  }),
])

export const activeAuctionImage = style([
  {
    gridColumn: 'span 4',
  },
  atoms({
    borderRadius: 'curved',
  }),
])

export const activeAuctionForm = style([
  {
    '@media': {
      [media.min1024]: {
        gridColumn: '5/span 4',
      },
    },
  },
  atoms({
    pl: { '@initial': 'x0', '@1024': 'x4' },
  }),
])
