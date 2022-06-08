import { style } from '@vanilla-extract/css'
import { atoms } from '@zoralabs/zord'

export const nftGridWrapper = style([
  {
    gridTemplateColumns: 'repeat(3, 1fr)',
    maxWidth: 1440,
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
