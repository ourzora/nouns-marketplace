import { style } from '@vanilla-extract/css'
import { atoms } from '@zoralabs/zord'
import { MAX_WIDTH } from 'styles/style-constants'

export const rankingWrapper = style([
  {
    maxWidth: MAX_WIDTH.LG,
  },
  atoms({
    w: '100%',
    m: 'auto',
    py: 'x14',
    gap: 'x5',
  }),
])

export const rankingRow = style([
  {
    gridTemplateColumns: '1fr 3fr',
    borderBottom: `1px solid rgba(0,0,0,.2)`,
    alignItems: 'center',
  },
  atoms({
    pb: 'x5',
  }),
])

export const rankingStats = style([
  {
    gridTemplateColumns: 'repeat(4, 1fr) 1.5fr',
    alignItems: 'center',
  },
  atoms({
    gap: 'x6',
  }),
])
