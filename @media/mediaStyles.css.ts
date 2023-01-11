import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { atoms, media } from '@zord/config'

export const nftGridWrapperVariants = {
  layout: {
    grid: [
      {
        gridTemplateColumns: 'repeat(1, 1fr)',
        '@media': {
          [media.min576]: {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          [media.min1440]: {
            gridTemplateColumns: 'repeat(3, 1fr)',
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
      p: 'x0',
    }),
  ]),
  defaultVariants: {
    layout: 'grid',
  },
})

/* Card */
export const cardWrapper = style([
  {
    border: '1px solid rgba(0,0,0,.075)',
  },
  atoms({
    backgroundColor: 'background1',
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
  atoms({
    whiteSpace: 'nowrap',
    w: '100%',
  }),
])

export const titleScroll = style([
  {
    maskImage:
      'linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))',
  },
  atoms({
    overflowX: { '@initial': 'scroll', '@768': 'auto' },
  }),
])

export const titlePadding = atoms({
  paddingRight: 'x10',
})

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
    backgroundColor: 'background2',
    position: 'relative',
    overflow: 'hidden',
  }),
])
