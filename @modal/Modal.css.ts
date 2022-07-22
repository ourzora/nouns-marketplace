import { atoms, media, ease, vars } from '@zoralabs/zord'
import { keyframes, style } from '@vanilla-extract/css'

const MODAL_BACKDROP_LAYER = 2000

export const overlay = style([
  {
    background: 'rgba(0, 0, 0, 0.4)',
    inset: 0,
    placeItems: 'center',
    zIndex: MODAL_BACKDROP_LAYER,
  },
  atoms({ position: 'fixed', display: 'grid' }),
])

export const content = style([
  {
    width: 'calc(100vw - 30px)',
    zIndex: MODAL_BACKDROP_LAYER + 1,
    selectors: {
      '&:focus': {
        outline: 'none',
      },
    },
  },
  atoms({ position: 'fixed' }),
])

export const background = style([
  {
    width: '100%',
    maxHeight: 'calc(100vh - 30px)',
    overflowY: 'auto',
    background: 'white',
  },
  atoms({ borderRadius: 'normal' }),
])

export const customContent = style([
  {
    maxWidth: 500,
  },
])

export const customBackground = style([
  {
    overflowY: 'scroll',
    background: vars.color.background.primary,
    borderRadius: 40,
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
    animation: `0.3s cubic-bezier(0.65, 0, 0.35, 1), ${keyframes({
      '0%': { opacity: 0, transform: 'scale(0.95)' },
      '100%': { opacity: 1, transform: 'scale(1)' },
    })}`,
  },
])

export const close = style([
  {
    top: 0,
    right: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
  atoms({
    position: 'absolute',
    p: 'x3',
  }),
])
