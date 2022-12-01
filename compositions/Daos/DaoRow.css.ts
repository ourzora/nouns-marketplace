import { style } from '@vanilla-extract/css'
import { atoms, color, media } from '@zord'

export const rowWrap = style([
  {
    height: '96px',
    '@media': {
      [media.min1024]: {
        borderTop: `2px solid ${color.background2}`,
        transition: 'border-color 250ms ease',
      },
      '(hover: hover)': {
        selectors: {
          '&:hover': {
            // backgroundColor: `${color.background2}`,
          },
        },
      },
    },
  },
  atoms({
    display: 'flex',
    alignItems: 'center',
  }),
])
export const noBorder = style([
  {
    borderTop: 'none!important', // hate it
  },
])

export const daoMeta = style([
  {
    width: '304px',
  },
])

export const metadataCells = style([
  {
    marginRight: '32px',
    flexGrow: 1,
    gap: '24px',
  },
  atoms({
    display: 'flex',
  }),
])

export const cell = style([
  {
    width: '33%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
])

export const cardHeader = atoms({
  display: 'flex',
  justifyContent: 'space-between',
})

export const placeholderCell = style([
  {
    width: '88px',
  },
])

export const header = style([
  {
    height: '40px!important',
  },
])

// mobile

export const mobileCardWrapper = style([
  {
    padding: '16px',
    borderRadius: '16px',
    border: `2px solid ${color.background2}`,
    marginBottom: '16px',
  },
])

export const mobileCell = style([
  {
    width: '50%',
    height: '50px',
    marginBottom: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
])
