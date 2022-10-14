import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { atoms, media, typography } from '@zoralabs/zord'

// globalStyle('h1, h2, h3, h4, h5', {
//   fontFamily: 'var(--display-font)!important',
//   lineHeight: '1.125!important',
// })

// globalStyle('p', {
//   fontFamily: 'var(--ui-font)!important',
// })

// globalStyle('light-font', {
//   fontWeight: 300,
//   fontFamily: "'ptRegular', Arial, Helvetica, sans-serif!important",
// })

// export const lightFont = style({
//   fontFamily: "'ptRegular', Arial, Helvetica, sans-serif!important",
//   fontWeight: 300,
// })

// export const mediumFont = style({
//   fontFamily: 'PTRootUIWebLight, Arial, Helvetica, sans-serif!important',
//   fontWeight: 600,
// })

// export const fontWeight = { // in zord's typography.ts
//   paragraph: '400',
//   heading: '500',
//   label: '600',
//   display: '700',
// }

export const textVariants = {
  italic: {
    true: {
      fontStyle: 'italic',
    },
  },
  variant: {
    // code: atoms({
    //   fontSize: 14,
    //   lineHeight: 20,
    // }),
    eyebrow: style([
      atoms({
        color: 'tertiary',
        textTransform: 'uppercase',
        fontSize: 12,
        fontWeight: 'heading',
        lineHeight: 20,
      }),
      style({
        letterSpacing: '0.05em',
      }),
    ]),
    'heading-xs': style([
      // h5
      {
        // fontFamily: 'var(--display-font)!important',
        fontFamily: 'var(--ui-font)!important',
        // fontFamily: "'ptBold', Arial, Helvetica, sans-serif!important",
        fontSize: '16px',
        lineHeight: '24px',
        '@media': {
          [media.min1024]: {
            fontSize: '18px',
            lineHeight: '24px',
          },
        },
        fontWeight: 700,
      },
    ]),
    'heading-sm': style([
      // h4
      {
        fontFamily: 'var(--display-font)!important',
        fontSize: '20px',
        lineHeight: '24px',
        '@media': {
          [media.min1024]: {
            fontSize: '24px',
            lineHeight: '28px',
          },
        },
      },
      atoms({
        fontWeight: 'heading',
      }),
    ]),
    'heading-md': style([
      // h3
      {
        fontFamily: 'var(--display-font)!important',
        fontSize: '30px',
        lineHeight: '32px',
        '@media': {
          [media.min1024]: {
            fontSize: '36px',
            lineHeight: '40px',
          },
        },
      },
      atoms({
        fontWeight: 'heading',
      }),
    ]),
    'heading-lg': style([
      // h2
      {
        fontFamily: 'var(--display-font)!important',
        fontSize: '42px',
        lineHeight: '48px',
        '@media': {
          [media.min1024]: {
            fontSize: '52px',
            lineHeight: '62px',
          },
        },
      },
      atoms({
        fontWeight: 'heading',
      }),
    ]),
    'heading-xl': style([
      // h1
      {
        fontFamily: 'var(--display-font)!important',
        fontSize: '42px',
        lineHeight: '48px',
        '@media': {
          [media.min1024]: {
            fontSize: '64px',
            lineHeight: '72px',
          },
        },
      },
      atoms({
        fontWeight: 'heading',
      }),
    ]),
    // 'label-xs': atoms({
    //   fontSize: 12,
    //   fontWeight: 'label',
    //   lineHeight: 20,
    // }),
    // 'label-sm': atoms({
    //   fontSize: 14,
    //   fontWeight: 'label',
    //   lineHeight: 24,
    // }),
    // 'label-md': atoms({
    //   fontSize: 16,
    //   fontWeight: 'label',
    //   lineHeight: 25,
    // }),
    // 'label-lg': atoms({
    //   fontSize: 18,
    //   fontWeight: 'label',
    //   lineHeight: 30,
    // }),
    // 'menu-lg': atoms({
    //   fontSize: 28,
    //   fontWeight: 'label',
    //   lineHeight: 34,
    // }),
    // 'paragraph-xs': atoms({
    //   fontSize: 12,
    //   fontWeight: 'paragraph',
    //   lineHeight: 20,
    // }),
    // 'paragraph-sm': atoms({
    //   fontSize: 14,
    //   fontWeight: 'paragraph',
    //   lineHeight: 24,
    // }),
    'paragraph-sm': style([
      // 'span' in noun.market Figma
      {
        fontFamily: 'var(--ui-font)!important',
      },
      atoms({
        fontSize: 16,
        fontWeight: 'paragraph',
        lineHeight: 24,
      }),
    ]),
    'paragraph-md': style([
      // p in noun.market Figma
      {
        // fontFamily: 'var(--display-font)!important',
        fontFamily: 'var(--ui-font)!important',
        // fontFamily: 'PTRootUIWebLight, Arial, Helvetica, sans-serif!important',
      },
      atoms({
        fontSize: { '@initial': 16, '@1024': 18 },
        fontWeight: 'paragraph',
        lineHeight: 24,
      }),
    ]),
    // 'paragraph-lg': atoms({
    //   fontSize: 18,
    //   fontWeight: 'paragraph',
    //   lineHeight: 30,
    // }),
    // 'display-xs': atoms({
    //   fontSize: 40,
    //   fontWeight: 'display',
    //   lineHeight: 50,
    // }),
    // 'display-sm': atoms({
    //   fontSize: 50,
    //   fontWeight: 'display',
    //   lineHeight: 65,
    // }),
    // 'display-md': atoms({
    //   fontSize: 65,
    //   fontWeight: 'display',
    //   lineHeight: 85,
    // }),
    // 'display-lg': atoms({
    //   fontSize: 80,
    //   fontWeight: 'display',
    //   lineHeight: 95,
    // }),
    link: style([
      atoms({
        textDecoration: 'underline',
        fontSize: 14,
        fontWeight: 'paragraph',
        lineHeight: 20,
      }),
      style({
        textUnderlineOffset: '0.15em',
      }),
    ]),
  },
} as const

export const text = recipe({
  variants: textVariants,
})

// export type TextVariants = RecipeVariants<typeof text>
