import { globalStyle, style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

import { atoms } from '../atoms'

export const textVariants = {
  italic: {
    true: {
      fontStyle: 'italic',
    },
  },
  variant: {
    code: atoms({
      fontSize: 14,
      lineHeight: 20,
    }),
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
      {
        fontFamily: 'var(--ui-font)', // h5 font intentionally differs
        fontWeight: 700,
      },
      atoms({
        fontSize: { '@initial': 16, '@1024': 18 },
        lineHeight: 24,
      }),
    ]),
    'heading-sm': style([
      {
        fontFamily: 'var(--display-font)',
      },
      atoms({
        fontWeight: 'heading',
        fontSize: { '@initial': 20, '@1024': 24 },
        lineHeight: { '@initial': 24, '@1024': 28 },
      }),
    ]),
    'heading-md': style([
      {
        fontFamily: 'var(--display-font)',
      },
      atoms({
        fontWeight: 'heading',
        fontSize: { '@initial': 30, '@1024': 36 },
        lineHeight: { '@initial': 32, '@1024': 40 },
      }),
    ]),
    'heading-lg': style([
      {
        fontFamily: 'var(--display-font)',
      },
      atoms({
        fontWeight: 'heading',
        fontSize: { '@initial': 42, '@1024': 52 },
        lineHeight: { '@initial': 48, '@1024': 62 },
      }),
    ]),
    'heading-xl': style([
      {
        fontFamily: 'var(--display-font)',
      },
      atoms({
        fontWeight: 'heading',
        fontSize: { '@initial': 42, '@1024': 64 },
        lineHeight: { '@initial': 48, '@1024': 72 },
      }),
    ]),
    'label-xs': atoms({
      fontSize: 12,
      fontWeight: 'label',
      lineHeight: 20,
    }),
    'label-sm': atoms({
      fontSize: 14,
      fontWeight: 'label',
      lineHeight: 24,
    }),
    'label-md': atoms({
      fontSize: 16,
      fontWeight: 'label',
      lineHeight: 25,
    }),
    'label-lg': atoms({
      fontSize: 18,
      fontWeight: 'label',
      lineHeight: 30,
    }),
    'paragraph-sm': style([
      // <span> in noun.market Figma
      {
        fontFamily: 'var(--ui-font)',
      },
      atoms({
        fontSize: 16,
        fontWeight: 'paragraph',
        lineHeight: 24,
      }),
    ]),
    'paragraph-md': style([
      // <p> in noun.market Figma
      {
        fontFamily: 'var(--ui-font)',
      },
      atoms({
        fontSize: { '@initial': 16, '@1024': 18 },
        fontWeight: 'paragraph',
        lineHeight: 24,
      }),
    ]),
    default: style([
      {
        fontFamily: 'inherit',
      },
    ]),
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
  defaultVariants: {
    variant: 'default',
  },
})

globalStyle(
  `
  ${textVariants.variant['paragraph-md']} > a,
  ${textVariants.variant['paragraph-sm']} > a,
  ${textVariants.variant['paragraph-md']} > strong,
  ${textVariants.variant['paragraph-sm']} > strong
`,
  {
    fontWeight: 'bold',
  }
)

// export type TextVariants = RecipeVariants<typeof text>
