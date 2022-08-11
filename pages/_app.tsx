import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

import '@zoralabs/zord/index.css'
import '../styles/globals.css'
import '../styles/reset.css'
import 'styles/styles.css'

import * as gtag from 'utils/gtag'
import { createClient, chain, configureChains, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { NFTFetchConfiguration } from '@zoralabs/nft-hooks'
import { ZDKFetchStrategy } from '@zoralabs/nft-hooks/dist/strategies'
import { ModalContextProvider } from '@modal'
import { ContractProvider } from '@market'

import { GALACTUS_BASE_URL } from 'utils/env-vars'

import { CollectionsProvider } from 'providers/CollectionsProvider'
import { useCollections } from 'hooks'

import { SWRConfig } from 'swr'
import NextNProgress from 'nextjs-progressbar'

import { HeaderComposition } from 'compositions/Header'
import { FooterComposition } from 'compositions/Footer'

const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_KEY

const { chains, provider } = configureChains(
  [chain.mainnet],
  [alchemyProvider({ alchemyId: alchemyKey }), publicProvider()]
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
  const { collections, daos } = useCollections()
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
    <WagmiConfig client={wagmiClient}>
      <SWRConfig
        value={{
          refreshInterval: 3000,
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
            <CollectionsProvider collections={collections} daos={daos}>
              <ModalContextProvider>
                <ContractProvider>
                  <HeaderComposition />
                  <NextNProgress
                    color="rgba(0,0,0,.5)"
                    startPosition={0.125}
                    stopDelayMs={200}
                    height={2}
                    showOnShallow={true}
                    options={{ showSpinner: false }}
                  />
                  <Component {...pageProps} />
                  <FooterComposition />
                </ContractProvider>
              </ModalContextProvider>
            </CollectionsProvider>
          </RainbowKitProvider>
        </NFTFetchConfiguration>
      </SWRConfig>
    </WagmiConfig>
  )
}

export default MyApp
