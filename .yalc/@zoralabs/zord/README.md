# ZORA Design System

```bash
yarn add @zoralabs/zord
```

or

```bash
npm install @zoralabs/zord
```

## Setup

Adding to your project boils down to;

1. Add webfonts
2. Attach the className to a root-level element with `zord()`
3. Import the `@zoralabs/zord/style.css` global stylesheet

### Usage with Next.js

Add webfonts and `zord()` className to document.

```tsx
// pages/_document.tsx

import { zord } from '@zoralabs/zord'
import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className={zord()}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
```

Import bundled `style.css`

```tsx
// pages/_app.tsx

import type { AppProps } from 'next/app'
import '@zoralabs/zord/style.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

## Customising & Overriding

Switch to dark mode

```tsx
import { zord, darkColorScheme } from '@zoralabs/zord'

zord({ colorScheme: darkColorScheme })
```

Use custom color scheme

```tsx
// TODO
```

Use custom font

```tsx
// TODO
```
