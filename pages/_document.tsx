import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ThemeProvider, lightTheme } from '@zoralabs/zord'
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Londrina+Solid:wght@300;400&display=swap"
            rel="stylesheet"
          />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            /**
             @@@@@@@@@@@@@@@@@@@   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*              @@@@@@
            @@@@@@@@@@@@@@@@@@  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*           @@@@@@@@@
                    @@@@@@@   @@@@@@@        @@@@@@@        @@@@@         @@@@@@@@@@@
                  @@@@@@@    @@@@@@            @@@@@@     @@@@@@@      @@@@@@@@*@@@@@
                @@@@@@*       @@@@@              @@@@@   @@@@@@@      @@@@@@@    @@@@@
            @@@@@@@*         @@@@@@            @@@@@@  @@@@@@     @@@@@@@@      @@@@@
            @@@@@@*           @@@@@@@        @@@@@@@    @@@@@@@ @@@@@@@         @@@@@
              @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@       @@@@@@@@@@@           @@@@@
              *@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@           @@@@@@**            @@@@@
            */
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <ThemeProvider theme={lightTheme}>
            <Main />
            <NextScript />
          </ThemeProvider>
        </body>
      </Html>
    )
  }
}

export default MyDocument
