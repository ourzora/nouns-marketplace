import { style } from '@vanilla-extract/css'
import { atoms, color, media, space } from '@zord/config'

export const collectionGrid = style([
  {
    gridColumn: '1/span 4',
    gridTemplateColumns: 'repeat(4, [col-start] 1fr)',
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
])
export const activeAuction = style([
  {
    gridTemplateColumns: 'repeat(4, [col-start] 1fr)',
    gridColumn: '1/span 4',
    display: 'grid',
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
export const collectionNameAndStats = style([
  {
    gridColumn: 'span 5',
  },
])

export const collectionLinks = style([
  {
    gridColumn: 'span 3',
  },
])

export const activeAuctionForm = style([
  {
    gridColumn: 'span 4',
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

export const collectionThumb = style([
  {
    aspectRatio: '1/1',
    width: '80px',
  },
])
export const menu = style({
  borderBottom: `2px solid ${color.background2}`,
})
