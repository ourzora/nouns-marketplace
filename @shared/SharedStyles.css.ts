import { style, globalStyle } from '@vanilla-extract/css'
import { atoms, space, color, typography, media, radii } from '@zoralabs/zord'

export const linkButton = style([
  {
    whiteSpace: 'nowrap',
    height: '42px',
  },
  atoms({
    borderRadius: 'curved',
    px: 'x4',
    py: 'x2',
    justifyContent: 'center',
    backgroundColor: 'tertiary',
    color: 'primary',
  }),
])
