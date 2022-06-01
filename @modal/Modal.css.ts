import { atoms } from '@zoralabs/zord'
import { keyframes, style } from '@vanilla-extract/css'

const MODAL_BACKDROP_LAYER = 20

export const overlay = style([
  {
    background: 'rgba(0, 0, 0, 0.45)',
    inset: 0,
    placeItems: 'center',
    zIndex: MODAL_BACKDROP_LAYER,
  },
  atoms({ position: 'fixed', display: 'grid' }),
])

export const content = style([
  {
    position: 'fixed',
    left: '50%',
    top: '40%',
    transform: 'translate(-50%)',
    width: 'calc(100vw - 30px)',
    maxWidth: 750,

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
    borderRadius: 40,
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
    animation: `0.3s cubic-bezier(0.65, 0, 0.35, 1), ${keyframes({
      '0%': { opacity: 0, transform: 'scale(0.95)' },
      '100%': { opacity: 1, transform: 'scale(1)' },
    })}`,
  },
  atoms({ borderRadius: 'normal' }),
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
