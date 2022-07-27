import { style, globalStyle } from '@vanilla-extract/css'
import { atoms, color, media, radii, ease, transitions } from '@zoralabs/zord'
import { MAX_WIDTH } from 'styles/style-constants'

export const rankingWrapper = style([
  {
    maxWidth: MAX_WIDTH.LG,
    minHeight: 550,
  },
  atoms({
    w: '100%',
    m: 'auto',
    gap: 'x4',
  }),
])

export const rankingRow = style([
  {
    gridTemplateColumns: '1fr 3fr',
    overflowX: 'scroll',
    alignItems: 'center',
    '@media': {
      [media.min1024]: {
        gridTemplateColumns: '1fr 3.75fr auto',
      },
      '(hover: hover)': {
        overflow: 'visible',
        zIndex: '10',
        selectors: {
          '&:after': {
            content: '',
            width: 'calc(100% + 30px)',
            height: 'calc(100% + 20px)',
            transform: 'translateX(-15px) translateY(-10px)',
            backgroundColor: color.black5,
            position: 'absolute',
            top: '0',
            left: '0',
            borderRadius: radii.phat,
            zIndex: '1',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.2s ease-out',
          },
          '&:hover&:after': {
            opacity: 0.5,
          },
        },
      },
    },
  },
  atoms({
    gap: 'x4',
    w: '100%',
    pos: 'relative',
  }),
])

globalStyle(`${rankingRow} span`, {
  whiteSpace: 'nowrap',
})

export const rankingRowInfo = style([
  {
    zIndex: '10',
  },
  atoms({
    alignItems: 'center',
    gap: 'x4',
  }),
])

export const rankingHeader = style([
  {
    zIndex: 100,
    backdropFilter: 'blur(5px)',
    backgroundColor: 'rgba(255,255,255,0.5)',
    paddingTop: 20,
    paddingBottom: 0,
    position: 'sticky',
    '@media': {
      [media.min1024]: {
        paddingTop: 0,
        paddingBottom: 0,
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

export const rankingRowLink = style([
  {
    zIndex: '10',
  },
  atoms({
    pos: 'relative',
  }),
])

export const rankingStats = style([
  {
    gridTemplateColumns: 'repeat(4, 1fr) 64px',
    zIndex: '10',
  },
  atoms({
    gap: 'x6',
    alignItems: 'center',
  }),
])
