import { style } from '@vanilla-extract/css'
import { atoms, media } from '@zoralabs/zord'
import { MAX_WIDTH } from 'styles/style-constants'

export const nftGridWrapper = style([
  {
    gridTemplateColumns: 'repeat(1, 1fr)',
    maxWidth: MAX_WIDTH.LG,
    '@media': {
      [media.min576]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      [media.min1024]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
    },
  },
  atoms({
    w: '100%',
    margin: 'auto',
  }),
])

/* Card */
export const cardWrapper = style([
  {
    backgroundColor: '#ffffff',
    border: '1px solid rgba(0,0,0,.075)',
  },
  atoms({
    borderRadius: 'phat',
    position: 'relative',
  }),
])

export const cardImageWrapper = style([
  {
    aspectRatio: '1/1',
  },
  atoms({
    w: '100%',
    position: 'relative',
  }),
])

export const titleWrapper = style([
  {
    whiteSpace: 'nowrap',
  },
  atoms({
    w: '100%',
  }),
])

export const titleScroll = style([
  {
    overflowX: 'scroll',
    maskImage:
      'linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))',
  },
])

export const titleHeading = style([
  {
    paddingRight: 'var(--titlePad)',
  },
])

/* Thumbnail */
export const nftThumbnail = style([
  {
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
  },
])
