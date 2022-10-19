import { globalStyle, style } from '@vanilla-extract/css'
import { atoms, color, radii, space, typography } from '@zoralabs/zord'

export const codeWrapper = style([
  atoms({
    w: '100%',
    px: 'x5',
    py: 'x3',
    // backgroundColor: 'tertiary', // black5
    backgroundColor: 'background2', // black10
    borderRadius: 'curved',
    overflowX: 'scroll',
    textAlign: 'left',
  }),
])

export const code = {
  fontSize: '12px',
  fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace!important',
  lineHeight: '1.125!important',
}

export const codeSelector = style([
  {
    ...code,
  },
])

globalStyle(`${codeWrapper} pre`, {
  ...code,
})

export const h1Selector = style([
  {
    paddingTop: 50,
    marginTop: -50,
  },
  atoms({
    pos: 'relative',
  }),
])

export const blockQuoteSelector = style([
  {
    color: color.text3,
    borderLeft: `3px solid ${color.accentActive}`,
  },
  atoms({
    pl: 'x2',
  }),
])

globalStyle(`${blockQuoteSelector} > p`, {
  fontSize: typography.fontSize[16],
})

export const ulSelector = style([
  {
    listStyleType: 'disc',
    lineHeight: '1.5',
  },
  atoms({
    pl: 'x5',
  }),
])

export const olSelector = style([
  {
    listStyle: 'number',
    lineHeight: '1.5',
  },
  atoms({
    pl: 'x5',
  }),
])

globalStyle(`${ulSelector} ul`, {
  listStyleType: 'circle',
})

export const aSelector = style([
  atoms({
    textDecoration: 'underline',
    color: 'positive',
  }),
])

export const hrSelector = style([
  {
    border: `1px solid ${color.border}`,
  },
  atoms({
    w: '100%',
    h: 'x0',
  }),
])

export const pSelector = style({})

globalStyle(`${pSelector} em`, {
  fontStyle: 'italic',
})

globalStyle(`${pSelector} code`, {
  padding: `${space.x1} ${space.x2}`,
  backgroundColor: color.background2,
  borderRadius: radii.small,
})

globalStyle(`${pSelector} strong, ${pSelector} strong em`, {
  fontFamily: 'var(--display-font)!important',
})
