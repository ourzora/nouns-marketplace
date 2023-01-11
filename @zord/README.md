# ZORD

Custom implementation of [@zoralabs/zord](https://www.npmjs.com/package/@zoralabs/zord), configured with custom spacing, typography, radii, etc.

Zord is a highly-customized theme configuration and set of base React elements implemented with the [Vanilla Extract](https://vanilla-extract.style/) styling framework. View [Zord docs](https://github.com/ourzora/nouns-marketplace/blob/main/docs/zord.md)

---

# Usage:

NOTE: In a NextJS environment, we need to work around an issue that occurs in the dev environment that causes an out-of-memory error because Next's ReactRefreshWebpackPlugin dependency can't handle [Barrel exports](https://basarat.gitbook.io/typescript/main-1/barrel) when exporting both PascalCase React components _*and*_ Vanilla Extract's `createTheme`: [Out-of-memory error with ReactRefreshWebpackPlugin + CamelCase barrel exports](https://github.com/vanilla-extract-css/vanilla-extract/issues/679)

As a result, here we explicitly export Zord components from `@zord`, and theme configuration items like tokens, spacing, radii, color, and media breakpoints from `@zord/config`:

> Import Zord React Components

```
import { Flex, Label, Button } from '@zord'

<Flex>
  <Label size="sm">Example Zord Component Import</Label>
  <Button variant="primary">Got it</Button>
</Flex>

```

> Import Zord's custom Noun.Market config constants

```
import { atoms, media, space } from '@zord/config'

...

export const footer = style([
  {
    columnGap: space['x6'],
    '@media': {
      [media.min1024]: {
        order: 'nowrap',
        columnGap: space['x0'],
      },
    },
  },
  atoms({
    pos: 'relative',
    w: '100%',
    py: 'x10',
  }),
])
```
