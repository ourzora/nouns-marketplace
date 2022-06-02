import Document, { Html, Head, Main, NextScript } from 'next/document'
import { lightTheme } from '@zoralabs/zord'

class MyDocument extends Document {
  render() {
    return (
      <Html className={lightTheme}>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@300;400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
