import { style } from '@vanilla-extract/css'
import { radii } from '@zord/config'

import { atoms } from '../atoms'
import { vars } from '../theme'

export const baseButton = style([
  atoms({
    borderRadius: 'normal',
    borderStyle: 'solid',
    borderWidth: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    position: 'relative',
    cursor: 'pointer',
  }),
  {
    transition:
      'border 0.1s ease-in-out, background 0.1s ease-in-out, transform 0.1s ease-out',
    userSelect: 'none',
    selectors: {
      '&:focus-visible': {
        outline: '2px solid rgb(32, 103, 243)',
        outlineStyle: 'auto',
      },
      '&:active': {
        transform: 'scale(0.95)',
      },
      '&[disabled]': {
        cursor: 'not-allowed',
        pointerEvents: 'none',
        opacity: 0.6,
      },
      '&[disabled]:active': {
        transform: 'unset',
      },
    },
  },
])

export const buttonSize = {
  sm: style([
    {
      width: 'auto',
      borderRadius: radii.curved,
    },
    atoms({
      display: 'inline-flex',
      px: 'x4',
      py: 'x2',
      height: 'x10',
      minWidth: 'x19',
      fontSize: { '@initial': 16, '@768': 18 },
      fontWeight: 'label',
    }),
  ]),
  md: style([
    {
      borderRadius: radii.phat,
    },
    atoms({
      px: { '@initial': 'x4', '@1024': 'x6' },
      py: { '@initial': 'x2', '@1024': 'x4' },
      height: { '@initial': 'x10', '@1024': 'x14' },
      fontSize: { '@initial': 16, '@768': 18 },
      fontWeight: 'label',
    }),
  ]),
  lg: style([
    {
      borderRadius: radii.phat,
    },
    atoms({
      px: 'x6',
      py: { '@initial': 'x4', '@1024': 'x6' },
      height: 'x15',
      minWidth: 'x23',
      fontSize: { '@initial': 20, '@768': 22 },
      fontWeight: 'label',
    }),
  ]),
}

export const buttonVariants = {
  primary: style([
    {
      selectors: {
        '&:not([disabled]):hover': {
          cursor: 'pointer',
          backgroundColor: vars.color.accentHover,
        },
      },
    },
    atoms({
      color: 'onAccent',
      backgroundColor: 'accent',
    }),
  ]),
  secondary: style([
    {
      selectors: {
        '&:not([disabled]):hover': {
          cursor: 'pointer',
          backgroundColor: vars.color.neutralHover,
        },
      },
    },
    atoms({
      color: 'primary',
      backgroundColor: 'background2',
    }),
  ]),
  positive: style([
    {
      selectors: {
        '&:not([disabled]):hover': {
          cursor: 'pointer',
          backgroundColor: vars.color.positiveHover,
        },
      },
    },
    atoms({
      color: 'onPositive',
      backgroundColor: 'positive',
    }),
  ]),
  destructive: style([
    {
      selectors: {
        '&:not([disabled]):hover': {
          cursor: 'pointer',
          backgroundColor: vars.color.negativeHover,
        },
      },
    },
    atoms({
      color: 'onNegative',
      backgroundColor: 'negative',
    }),
  ]),
  outline: style([
    {
      selectors: {
        '&:not([disabled]):hover': {
          cursor: 'pointer',
          backgroundColor: vars.color.background2,
        },
      },
    },
    atoms({
      color: 'primary',
      borderColor: 'primary',
      borderWidth: 'normal',
      backgroundColor: 'transparent',
    }),
  ]),
  circle: style([
    {
      aspectRatio: '1 / 1',
      minWidth: 0,
      selectors: {
        '&[disabled]': {
          color: vars.color.secondary,
          backgroundColor: 'transparent',
        },
        '&:not([disabled]):hover': {
          cursor: 'pointer',
          borderColor: vars.color.accent,
        },
      },
    },
    atoms({
      p: 'x0',
      color: 'primary',
      display: 'flex',
      alignItems: 'center',
      height: 'auto',
      justifyContent: 'center',
      borderColor: 'borderOnImage',
      borderWidth: 'thin',
      borderRadius: 'round',
      backgroundColor: 'transparent',
    }),
  ]),
  circleSolid: style([
    {
      aspectRatio: '1 / 1',
      minWidth: 0,
      selectors: {
        '&[disabled]': {
          color: vars.color.secondary,
          backgroundColor: 'ghostHoverDisabled',
        },
        '&:not([disabled]):hover': {
          cursor: 'pointer',
          backgroundColor: 'ghostHover',
        },
      },
    },
    atoms({
      p: 'x0',
      color: 'primary',
      display: 'flex',
      alignItems: 'center',
      height: 'auto',
      justifyContent: 'center',
      borderColor: 'transparent',
      borderRadius: 'round',
      backgroundColor: 'background1',
    }),
  ]),
  ghost: style([
    {
      selectors: {
        '&:hover, &:not([disabled]):hover': {
          cursor: 'pointer',
          backgroundColor: vars.color.ghostHover,
        },
      },
    },
    atoms({
      color: 'onGhost',
      borderColor: 'ghost',
      backgroundColor: 'transparent',
    }),
  ]),
  // @TODO: We don't need this. It should be the default.
  // - move to baseButton above and reset all buttons site-wide
  unset: style({
    backgroundColor: 'unset',
    gap: 'unset',
    borderColor: 'unset',
    borderWidth: 'unset',
    borderStyle: 'unset',
    minWidth: 'unset',
    padding: 'unset',
    height: 'unset',
    fontSize: 'unset',
    fontWeight: 'unset',
  }),
}

export const buttonLoading = atoms({ pointerEvents: 'none' })

export const buttonPill = atoms({ borderRadius: 'round' })

export const buttonPillSm = atoms({
  px: 'x4',
  py: 'x1',
})

export const buttonPillMd = atoms({
  px: 'x5',
})

export const buttonPillLg = atoms({
  px: 'x6',
})
