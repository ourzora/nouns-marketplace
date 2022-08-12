import { style, globalStyle } from '@vanilla-extract/css'
import { atoms, color, radii, space, typography } from '@zoralabs/zord'

export const codeWrapper = style([
  atoms({
    w: '100%',
    backgroundColor: 'tertiary',
    px: 'x5',
    py: 'x3',
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
    color: color.black70,
    borderLeft: `3px solid ${color.black30}`,
  },
  atoms({
    pl: 'x2',
  }),
])

globalStyle(`${blockQuoteSelector} > p`, {
  fontSize: typography.size[10],
})

export const ulSelector = style([
  {
    listStyleType: 'disc',
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
    color: 'success',
  }),
])

export const hrSelector = style([
  {
    border: `1px solid ${color.black10}`,
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
  paddingLeft: space.x2,
  paddingRight: space.x2,
  paddingTop: space.x1,
  paddingBottom: space.x1,
  backgroundColor: color.black5,
  borderRadius: radii.small,
})

globalStyle(`${pSelector} strong, ${pSelector} strong em`, {
  fontFamily: 'var(--display-font)!important',
})
