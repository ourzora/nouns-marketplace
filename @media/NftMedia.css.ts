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

/* Thumbnail */
export const nftThumbnail = style([
  {
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
  },
])
