import { style } from '@vanilla-extract/css'
import { atoms, vars } from '@zoralabs/zord'

export const container = style([
  {
    transition: `background-color 0.1s ${vars.ease.out}`,
    borderRadius: '16px', // @BJ TODO: Replace with atom
  },
  atoms({
    w: '100%',
    h: { '@initial': 'x12', '@1024': 'x18' },
    p: 'x0',
    borderWidth: 'normal',
    borderStyle: 'solid',
    backgroundColor: 'background2',
    borderColor: 'border',
  }),
])

export const focused = atoms({
  borderColor: 'background2',
  backgroundColor: 'background1',
})

export const input = style([
  {
    cursor: 'inherit',
    outline: 'none',
    selectors: {
      '&::placeholder': {
        color: vars.color.tertiary,
      },
      '&:focus': {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        outline: 'none',
      },
      '&[disabled]': {
        cursor: 'not-allowed',
      },
    },
  },
  atoms({
    backgroundColor: 'transparent',
    fontSize: 18,
    lineHeight: 24,
    borderColor: 'transparent',
    w: '100%',
    h: '100%',
  }),
])
