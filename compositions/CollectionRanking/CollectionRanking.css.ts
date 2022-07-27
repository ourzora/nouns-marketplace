import { style, globalStyle } from '@vanilla-extract/css'
import { atoms, color, media, radii } from '@zoralabs/zord'
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
    pt: {
      '@initial': 'x4',
      '@1024': 'x14',
    },
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

export const rankingRow = style([
  {
    gridTemplateColumns: '2fr 1fr',
    gridTemplateRows: 'auto',
    borderRadius: radii.phat,
    border: `2px solid ${color.black10}`,
    '@media': {
      [media.min1024]: {
        gridTemplateColumns: '1fr 3.75fr 100px',
        gridTemplateRows: '1fr',
        borderRadius: 0,
        border: 'none',
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
    w: '100%',
    pos: 'relative',
    gap: {
      '@initial': 'x3',
      '@1024': 'x4',
    },
    p: {
      '@initial': 'x4',
      '@1024': 'x0',
    },
  }),
])

export const rankingRowInfo = style([
  {
    zIndex: '10',
    gridArea: '1',
  },
  atoms({
    alignItems: 'center',
    gap: {
      '@initial': 'x3',
      '@1024': 'x4',
    },
  }),
])

export const rankingRowLink = style([
  {
    zIndex: '10',
    gridArea: '1',
    '@media': {
      [media.min1024]: {
        gridArea: '1',
        gridColumn: '3',
      },
    },
  },
  atoms({
    pos: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
  }),
])

globalStyle(`${rankingRow} span`, {
  whiteSpace: 'nowrap',
  '@media': {
    [media.min1024]: {
      textAlign: 'right',
    },
  },
})

export const rankingStats = style([
  {
    gridTemplateColumns: 'repeat(2, 1fr)',
    zIndex: '10',
    gridArea: '2',
    gridColumn: '1 / 3',
    borderTop: `2px solid ${color.black5}`,
    '@media': {
      [media.min1024]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridArea: '1',
        gridColumn: '2',
        borderTop: 'none',
      },
    },
  },
  atoms({
    gap: {
      '@initial': 'x4',
      '@1024': 'x6',
    },
    alignItems: 'center',
    pt: {
      '@initial': 'x4',
      '@1024': 'x0',
    },
  }),
])
