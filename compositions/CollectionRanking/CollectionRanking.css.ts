import { style, globalStyle } from '@vanilla-extract/css'
import { atoms, media } from '@zoralabs/zord'
import { MAX_WIDTH } from 'styles/style-constants'

export const rankingWrapper = style([
  {
    maxWidth: MAX_WIDTH.LG,
    minHeight: 550,
  },
  atoms({
    w: '100%',
    m: 'auto',
    gap: 'x5',
  }),
])

export const rankingRow = style([
  {
    gridTemplateColumns: '1fr 3fr',
    overflowX: 'scroll',
    borderBottom: `1px solid rgba(0,0,0,.2)`,
    alignItems: 'center',
    '@media': {
      [media.min1024]: {
        gridTemplateColumns: '1fr 3.75fr',
      },
    },
  },
  atoms({
    pb: 'x5',
    px: 'x4',
  }),
])

globalStyle(`${rankingRow} span`, {
  whiteSpace: 'nowrap',
})

export const rankingHeader = style([
  {
    zIndex: 100,
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingTop: 20,
    position: 'sticky',
    '@media': {
      [media.min1024]: {
        paddingTop: 0,
        borderBottom: 0,
        backdropFilter: 'blur(0px)',
        backgroundColor: 'transparent',
        position: 'relative',
      },
    },
  },
  atoms({
    top: 'x0',
  }),
])

export const rankingStats = style([
  {
    gridTemplateColumns: 'repeat(4, 1fr) 1fr',
    alignItems: 'center',
  },
  atoms({
    gap: 'x6',
  }),
])
