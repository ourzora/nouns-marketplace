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
import type { AppProps } from 'next/app'
import { createClient, defaultChains, WagmiProvider } from 'wagmi'
import { HeaderComposition } from 'compositions/Header/HeaderComposition'
import { NFTFetchConfiguration } from '@zoralabs/nft-hooks'
import { ZDKFetchStrategy } from '@zoralabs/nft-hooks/dist/strategies'
import { ModalContextProvider } from '@modal'
import { V3Provider } from '@market'
import { GALACTUS_BASE_URL } from 'utils/env-vars'
import { CollectionsProvider } from 'providers/CollectionsProvider'
import { useCollections } from 'hooks/zdk/useCollections'

import 'styles/styles.css'

const infuraId = process.env.INFURA_ID

// const chains = defaultChains
const { chains, provider } = configureChains(defaultChains, [
  apiProvider.infura(infuraId),
])

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

  return (
    <WagmiProvider client={wagmiClient}>
      <NFTFetchConfiguration networkId="1" strategy={strategy}>
        <RainbowKitProvider
          chains={chains}
          coolMode
          theme={lightTheme({
            accentColor: 'black',
            borderRadius: 'small',
          })}
        >
          <V3Provider>
            <CollectionsProvider
              /* @ts-ignore */
              collections={collections}
            >
              <ModalContextProvider>
                <>
                  <HeaderComposition />
                  <Component {...pageProps} />
                </>
              </ModalContextProvider>
            </CollectionsProvider>
          </V3Provider>
        </RainbowKitProvider>
      </NFTFetchConfiguration>
    </WagmiProvider>
  )
}

export default MyApp
