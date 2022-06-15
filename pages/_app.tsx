import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import '@zoralabs/zord/index.css'
import '../styles/globals.css'
import '../styles/reset.css'
import * as gtag from 'lib/gtag'
import { createClient, chain, WagmiProvider } from 'wagmi'
import { NFTFetchConfiguration } from '@zoralabs/nft-hooks'
import { ZDKFetchStrategy } from '@zoralabs/nft-hooks/dist/strategies'
import { ModalContextProvider } from '@modal'
import { V3Provider } from '@market'
import { GALACTUS_BASE_URL } from 'utils/env-vars'
import { CollectionsProvider } from 'providers/CollectionsProvider'
import { useCollections } from 'hooks/zdk/useCollections'
import { ContractProvider } from '@market/providers/ContractProvider'

import NextNProgress from 'nextjs-progressbar'

import { HeaderComposition } from 'compositions/Header'
import { FooterComposition } from 'compositions/Footer'

import 'styles/styles.css'

const infuraId = process.env.INFURA_ID

// const chains = defaultChains
const { chains, provider } = configureChains(
  [chain.mainnet],
  [apiProvider.infura(infuraId)]
)

const { connectors } = getDefaultWallets({
  appName: 'Contract Manager',
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export const strategy = new ZDKFetchStrategy('1', GALACTUS_BASE_URL)

function MyApp({ Component, pageProps }: AppProps) {
  const { collections } = useCollections()

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
    <WagmiProvider client={wagmiClient}>
      <NFTFetchConfiguration networkId="1" strategy={strategy}>
        <RainbowKitProvider
          chains={chains}
          coolMode
          theme={lightTheme({
            accentColor: 'black',
            borderRadius: 'large',
          })}
        >
          <V3Provider>
            <CollectionsProvider collections={collections}>
              <ModalContextProvider>
                <ContractProvider>
                  <HeaderComposition />
                  <NextNProgress
                    color="rgba(0,0,0,.5)"
                    startPosition={0.125}
                    stopDelayMs={200}
                    height={2}
                    showOnShallow={true}
                  />
                  <Component {...pageProps} />
                  <FooterComposition />
                </ContractProvider>
              </ModalContextProvider>
            </CollectionsProvider>
          </V3Provider>
        </RainbowKitProvider>
      </NFTFetchConfiguration>
    </WagmiProvider>
  )
}

export default MyApp
