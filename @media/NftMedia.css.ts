import { style } from '@vanilla-extract/css'

export const nftGridWrapper = style({
  gridTemplateColumns: 'repeat(4, 1fr)',
})

/* Card */
export const cardWrapper = style({
  borderRadius: 40,
  boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
  backgroundColor: '#ffffff',
})
