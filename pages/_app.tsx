import { GALACTUS_BASE_URL } from 'utils/env-vars'
import * as gtag from 'utils/gtag'
import { WagmiConfig, chain, configureChains, createClient } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { Footer, Header } from 'compositions'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'
import { BlocklistGuard, CollectionsProvider } from 'providers'

import 'styles/styles.css'

import { SWRConfig } from 'swr'

import { StrictMode, useEffect } from 'react'
import React from 'react'

import '@fontsource/inter/500.css'

import { ContractProvider, V3AskContractProvider } from '@market'
import { ModalContextProvider } from '@modal'
import { RainbowKitProvider, getDefaultWallets, lightTheme } from '@rainbow-me/rainbowkit'

import '@rainbow-me/rainbowkit/styles.css'

import { ToastContextProvider } from '@toast'
import { NFTFetchConfiguration } from '@zoralabs/nft-hooks'
import { ZDKFetchStrategy } from '@zoralabs/nft-hooks/dist/strategies'

import '../styles/reset.css'
import '../styles/globals.css'

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY

export const { chains, provider } = configureChains(
  [chain.mainnet],
  [alchemyProvider({ apiKey: alchemyKey }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: 'Noun Market',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export const strategy = new ZDKFetchStrategy('1', GALACTUS_BASE_URL)

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <StrictMode>
      <WagmiConfig client={wagmiClient}>
        <SWRConfig
          value={{
            refreshInterval: 10000,
            fetcher: (resource, init) => fetch(resource, init).then((res) => res.json()),
          }}
        >
          <NFTFetchConfiguration networkId="1" strategy={strategy}>
            <RainbowKitProvider
              chains={chains}
              coolMode
              theme={lightTheme({
                accentColor: 'black',
                borderRadius: 'large',
              })}
            >
              <BlocklistGuard>
                <CollectionsProvider>
                  <ModalContextProvider>
                    <ToastContextProvider>
                      <ContractProvider>
                        <V3AskContractProvider>
                          <Header />
                          <NextNProgress
                            color="rgba(0,0,0,.5)"
                            startPosition={0.125}
                            stopDelayMs={200}
                            height={2}
                            showOnShallow={true}
                            options={{ showSpinner: false }}
                          />
                          <Component {...pageProps} />
                          <Footer />
                        </V3AskContractProvider>
                      </ContractProvider>
                    </ToastContextProvider>
                  </ModalContextProvider>
                </CollectionsProvider>
              </BlocklistGuard>
            </RainbowKitProvider>
          </NFTFetchConfiguration>
        </SWRConfig>
      </WagmiConfig>
    </StrictMode>
  )
}

export default MyApp
