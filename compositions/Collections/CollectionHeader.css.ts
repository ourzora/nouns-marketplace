import { style } from '@vanilla-extract/css'
import { atoms, media } from '@zoralabs/zord'

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

export const daoPageHero = style([
  {
    // gridTemplateColumns: '1fr',
    // '@media': {
    //   [media.min1024]: {
    //     gridTemplateColumns: '1fr 1fr',
    //   },
    // },
    gridColumn: '1/span 4',
    '@media': {
      [media.min1024]: {
        gridColumn: 'span 12',
      },
    },
  },
  atoms({
    w: '100%',
    // overflowX: 'hidden',
    // mx: 'auto',
    // pb: {
    //   '@initial': 'x2',
    //   '@1024': 'x6',
    // },
  }),
])
export const activeAuction = style([
  {
    // gridTemplateColumns: '1fr',
    // '@media': {
    //   [media.min1024]: {
    //     gridTemplateColumns: '1fr 1fr',
    //   },
    // },
    gridColumn: '1/span 4',
    '@media': {
      [media.min1024]: {
        gridColumn: '3/span 8',
      },
    },
  },
  atoms({
    // w: '100%',
    // overflowX: 'hidden',
    // mx: 'auto',
    // pb: {
    //   '@initial': 'x2',
    //   '@1024': 'x6',
    // },
  }),
])
