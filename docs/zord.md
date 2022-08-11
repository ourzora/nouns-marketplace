# Zord Documentation

Zord uses a heavily-adapted styling implementation based on the Vanilla Extract styling framework. At Zora, we've found that this system allows us to develop front-end code rapidly with a core set of design primitives that can be customized using a large set of pre-defined CSS properties that adhere to Zora's theme specs. At its core, Zord makes extensive use of Vanilla Extract's [Sprinkles](https://vanilla-extract.style/documentation/packages/sprinkles/) package to statically generate CSS classes that can be re-used without continually adding to an app's CSS footprint.

## Themes

Theming with Zord is done by defining an object known as a "_Theme Contract_", a term for a common interface of consistent design tokens defined in a central theme file and then used throughout a site's components. Themes are most commonly used to define theme colors, but can also be used to specify typefaces, spacing conventions, borders, animation standards, and more.

Multiple implementations of a Theme Contract can exist on a single site, and the themes can be swapped in + out to enable, for example, dark and light theme variations, or themes designed to assist users who are visually impaired.

Zora's standard theme defines colors, borders + radii, container sizing, animation easing, and spacing increments.

TODO: How can we easily let people customize themes?

- fonts
- colors
- spacing
- breakpoints

## Atoms

At the heart of Zord are a broad set of the most commonly-used CSS properties, which we call atoms, which enable a developer to apply styles to components in a number of ways:

- in a separate stylesheet
- as props
- directly into a className attribute using the atoms() function

**Separate Stylesheets**

**_Stylesheet_**

```
import { atoms } from '../atoms'
import { style } from '@vanilla-extract/css'

export const box = atoms({
  width: '100%',
  height: 'x10'
})
```

You can also combine atoms with styles that aren't included in the atomic presets:

```
export const box = style([
  {
    boxSizing: 'border-box',
    backgroundImage: url("paper.gif")
  },
  atoms({
   width: '100%',
   height: 'x10'
  }),
])
```

So in the above example, the styles defined within atoms() will apply the pre-existing static styles, and not add to the size of the stylesheet.

**_Markup_**

```
import * as styles from 'Box.css.ts'
<Box className={styles.box} />
```

**Atoms As Props**

```
<Box
  width='100%'
  height='x10'
/>
```

**In className attributes**

```
<Box className={atoms({
  width: '100%',
  height: 'x10'
})} />
```

## Shorthands

Zord also allows the use of a small set of shorthand convenience properties that are often found in other styling systems. They can be especially useful for defining multiple properties at once, eg. `py='x4'` sets both paddingTop and paddingBottom to 16px.

```
  shorthands: {
    minW: ['minWidth'],
    minH: ['minHeight'],
    maxW: ['maxWidth'],
    maxH: ['maxWidth'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    m: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
    mt: ['marginTop'],
    mb: ['marginBottom'],
    ml: ['marginLeft'],
    mr: ['marginRight'],
    pos: ['position'],
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    p: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
    pt: ['paddingTop'],
    pb: ['paddingBottom'],
    pl: ['paddingLeft'],
    pr: ['paddingRight'],
    w: ['width'],
    h: ['height'],
    t: ['top'],
    l: ['left'],
    b: ['bottom'],
    r: ['right'],
    size: ['width', 'height'],
  },
```

## Responsive Styling

Media queries are defined using the following breakpoints:

```
const conditions = {
  '@initial': {},
  '@480': { '@media': '(min-width: 480px)' },
  '@576': { '@media': '(min-width: 576px)' },
  '@768': { '@media': '(min-width: 768px)' },
  '@1024': { '@media': '(min-width: 1024px)' },
  '@1440': { '@media': '(min-width: 1440px)' },
} as const
```

There are a few ways of applying styles using the breakpoints:

**_In Props_**

```
 <Stack
   px="x4"
   py={{
     '@initial': 'x4',
     '@1024': 'x12',
   }}
   align="center"
 >
```

**_In Stylesheets_**

```
import { atoms, media } from '@zoralabs/zord'

export const marginTop = atoms({
  mt: { '@initial': 'x32', '@768': 'x64' },
})

export const paddingX = atoms({
  px: { '@initial': 'x5', '@768': 'x8' },
})

export const filterGridHeader = style([
  {
    background: 'rgba(255, 255, 255, 0.92)',
    backdropFilter: 'blur(10px)',
    '@media': {
      [media.min1024]: {
        zIndex: HEADER_LAYER,
      },
    },
  },
  atoms({
    position: { '@initial': 'relative', '@768': 'sticky' },
    top: 'x16',
  }),
])

```

## Spacing

You'll notice that the Box component above `height='x10'`

Zora implements spacing increment

```
export const space = {
  n2: '-8px',
  n1: '-4px',
  x0: '0px',
  x1: '4px',
  x2: '8px',
  x3: '12px',
  x4: '16px',
  x5: '20px'
  ... (+ many more)
}
```
