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
          <svg style={{ display: 'none' }}>
            <filter
              style={{ display: 'none' }}
              id="mosaic"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
              filterRes="1"
            >
              <feFlood x="4" y="4" height="2" width="2" />
              <feComposite width="8" height="8" />
              <feTile result="a" />
              <feComposite in="SourceGraphic" in2="a" operator="in" />
              <feMorphology operator="dilate" radius="4" />
            </filter>
          </svg>
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
