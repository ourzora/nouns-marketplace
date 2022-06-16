import { AddressZero } from '@ethersproject/constants'
import {
  AUDIUS_ADDRESS,
  BANK_ADDRESS,
  COIN_ADDRESS,
  DAI_ADDRESS,
  ENS_ADDRESS,
  FAME_ADDRESS,
  FOREFRONT_ADDRESS,
  FWB_ADDRESS,
  FWB_PROD_ADDRESS,
  LAMP_ADDRESS,
  LPT_ADDRESS,
  MEME_ADDRESS,
  RAC_ADDRESS,
  ROBOT_ADDRESS,
  SOCKS_ADDRESS,
  UNI_ADDRESS,
  USDC_ADDRESS,
  WETH_ADDRESS,
  WHALE_ADDRESS,
  YUP_ADDRESS,
} from './addresses'
import { isAddressMatch } from './validators'
import { NETWORK_CHAIN_ID } from './connectors'

export interface Currency {
  id: string
  decimals: number
  symbol: string
}

export function getCurrency({ address }: { address: string }) {
  return [ETH_CURRENCY_SHIM, ...SUPPORTED_CURRENCIES].find((c) =>
    isAddressMatch(c.id, address)
  ) as Currency
}

export const ETH_CURRENCY_SHIM = { id: AddressZero, decimals: 18, symbol: 'ETH' }
export const DAI_CURRENCY_SHIM = { id: DAI_ADDRESS, decimals: 18, symbol: 'DAI' }

export const SUPPORTED_CURRENCIES: Currency[] =
  NETWORK_CHAIN_ID === 1
    ? [
        {
          id: DAI_ADDRESS,
          symbol: 'DAI',
          decimals: 18,
        },
        {
          id: USDC_ADDRESS,
          symbol: 'USDC',
          decimals: 6,
        },
        {
          id: WETH_ADDRESS,
          symbol: 'WETH',
          decimals: 18,
        },
        {
          id: RAC_ADDRESS,
          symbol: 'RAC',
          decimals: 18,
        },
        {
          id: SOCKS_ADDRESS,
          symbol: 'SOCKS',
          decimals: 18,
        },
        {
          id: FAME_ADDRESS,
          symbol: 'FAME',
          decimals: 18,
        },
        {
          id: UNI_ADDRESS,
          symbol: 'UNI',
          decimals: 18,
        },
        {
          id: AUDIUS_ADDRESS,
          symbol: 'AUDIO',
          decimals: 18,
        },
        {
          id: ENS_ADDRESS,
          symbol: 'ENS',
          decimals: 18,
        },
        {
          id: FWB_ADDRESS,
          symbol: 'FWB',
          decimals: 4,
        },
        {
          id: FWB_PROD_ADDRESS,
          symbol: 'FWB Pro',
          decimals: 18,
        },
        {
          id: FOREFRONT_ADDRESS,
          symbol: 'FF',
          decimals: 18,
        },
        {
          id: LAMP_ADDRESS,
          symbol: 'LAMP',
          decimals: 18,
        },
        {
          id: LPT_ADDRESS,
          symbol: 'LPT',
          decimals: 18,
        },
        {
          id: WHALE_ADDRESS,
          symbol: 'WHALE',
          decimals: 18,
        },
        {
          id: MEME_ADDRESS,
          symbol: 'MEME',
          decimals: 18,
        },
        {
          id: ROBOT_ADDRESS,
          symbol: 'ROBOT',
          decimals: 18,
        },
        {
          id: COIN_ADDRESS,
          symbol: 'COIN',
          decimals: 18,
        },
        {
          id: BANK_ADDRESS,
          symbol: 'BANK',
          decimals: 18,
        },
        {
          id: YUP_ADDRESS,
          symbol: 'YUP',
          decimals: 18,
        },
      ]
    : [
        {
          id: WETH_ADDRESS,
          symbol: 'WETH',
          decimals: 18,
        },
        {
          id: DAI_ADDRESS,
          symbol: 'DAI',
          decimals: 18,
        },
        {
          id: USDC_ADDRESS,
          symbol: 'USDC',
          decimals: 6,
        },
      ]

export const AUCTION_CURRENCY_OPTIONS = [
  ETH_CURRENCY_SHIM,
  ...SUPPORTED_CURRENCIES.filter((c) => c.symbol !== 'WETH'),
]
