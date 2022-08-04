import { style } from '@vanilla-extract/css'
import { atoms, media } from '@zoralabs/zord'
import { recipe } from '@vanilla-extract/recipes'

export const nftGridWrapperVariants = {
  layout: {
    grid: [
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
    ],
    activityRows: [{}],
  },
}

export const nftGridWrapper = recipe({
  variants: nftGridWrapperVariants,
  base: style([
    atoms({
      w: '100%',
      pos: 'relative',
      margin: 'auto',
      gap: 'x4',
    }),
  ]),
  defaultVariants: {
    layout: 'grid',
  },
})

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
    '@supports': {
      'not (aspect-ratio: 1/1)': {
        width: '100%',
        height: '0',
        paddingBottom: '100%',
      },
    },
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
    aspectRatio: '1/1',
    '@supports': {
      'not (aspect-ratio: 1/1)': {
        width: '0',
        paddingRight: '100%',
      },
    },
  },
  atoms({
    backgroundColor: 'tertiary',
    position: 'relative',
    overflow: 'hidden',
  }),
])
