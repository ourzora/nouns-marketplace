import { chain, defaultChains } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import { JsonRpcProvider } from '@ethersproject/providers'

export const NETWORK_URL = process.env.NEXT_PUBLIC_NETWORK_URL
export const NETWORK_CHAIN_ID: number = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID ?? '1')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`NEXT_PUBLIC_NETWORK_URL must be a defined environment variable`)
}

export const defaultProvider = new JsonRpcProvider(NETWORK_URL, NETWORK_CHAIN_ID)

const chains = defaultChains
const defaultChain = chain.mainnet

export function connectors() {
  const appChainId = NETWORK_CHAIN_ID || defaultChain.id
  const chain = chains.find((x) => x.id === appChainId) ?? defaultChain
  const rpcUrl = NETWORK_URL || chain.rpcUrls.default

  return [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'Zora',
        chainId: appChainId,
        jsonRpcUrl: rpcUrl,
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        rpc: { [appChainId]: rpcUrl },
        bridge: 'https://zora.bridge.walletconnect.org',
        qrcode: true,
        qrcodeModalOptions: {
          mobileLinks: ['rainbow', 'metamask', 'trust', 'imtoken', 'argent'],
        },
        clientMeta: {
          icons: [],
          name: 'Zora',
          url: 'zora.co',
          description: 'zora.co decentralised NFT house',
        },
      },
    }),
    new InjectedConnector({
      chains,
      options: { name: 'Injected' },
    }),
  ]
}
