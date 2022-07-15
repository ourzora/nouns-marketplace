import { style } from '@vanilla-extract/css'
import { atoms, media } from '@zoralabs/zord'

export const nftGridWrapper = style([
  {
    gridTemplateColumns: 'repeat(1, 1fr)',
    '@media': {
      [media.min576]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      [`(min-width: 1240px)`]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      [`(min-width: 2000px)`]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
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
    aspectRatio: '1/1',
  },
  atoms({
    backgroundColor: 'tertiary',
    position: 'relative',
    overflow: 'hidden',
  }),
])
