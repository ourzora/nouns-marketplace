import { TOAST_LAYER } from 'constants/layers'

import { keyframes, style } from '@vanilla-extract/css'
import { atoms, mixins } from '@zoralabs/zord'

// const slideRight = keyframes({
//   from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
//   to: { transform: 'translateX(100%)' },
// })
const slideDown = keyframes({
  from: { transform: 'translateY(var(--radix-toast-swipe-end-y))' },
  to: { transform: 'translateY(100%)' },
})

export const root = style([
  {
    background: 'black',
    color: 'white',
    boxShadow: '0px 9px 20px rgba(0, 0, 0, 0.14)',
    outline: 'none',
    maxWidth: 320,
    width: 'calc(100vw - 24px)',
    '@media': {
      '(prefers-reduced-motion: no-preference)': {
        selectors: {
          '&[data-swipe="move"]': {
            transform: 'translateX(var(--radix-toast-swipe-move-x))',
          },
          '&[data-swipe="cancel"]': {
            transform: 'translateX(0)',
            transition: 'transform 0.2s ease-out',
          },
          '&[data-swipe="end"]': {
            animation: `${slideDown} 0.1s ease-out`,
          },
        },
      },
    },
  },
  atoms({
    borderRadius: 'round',
    margin: 'x0',
    px: 'x4',
    py: 'x3',
    bottom: 'x5',
  }),
  mixins({ fadeIn: '0.2' }),
])

export const container = style([
  {
    zIndex: TOAST_LAYER,
  },
  atoms({
    bottom: { '@initial': 'x3', '@480': 'x5' },
    left: 'x0',
    right: 'x0',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
  }),
])

export const viewport = style([
  atoms({
    margin: 'x0',
    padding: 'x0',
    listStyle: 'none',
    bottom: 'x0',
  }),
])

export const icon = atoms({ mr: 'x3' })
