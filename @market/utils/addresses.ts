import { WETH } from '@uniswap/sdk'
import mainnetAuction from '@zoralabs/auction-house/dist/addresses/1.json'
import rinkebyAuction from '@zoralabs/auction-house/dist/addresses/4.json'
import mainnetV3 from '@zoralabs/v3/dist/addresses/1.json'
import rinkebyV3 from '@zoralabs/v3/dist/addresses/4.json'
import { addresses } from '@zoralabs/zdk'
import { NETWORK_CHAIN_ID } from './connectors'

export const DAI_ADDRESS =
  NETWORK_CHAIN_ID === 1
    ? '0x6b175474e89094c44da98b954eedeac495271d0f'
    : '0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa'

export const USDC_ADDRESS =
  NETWORK_CHAIN_ID === 1
    ? '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
    : '0x4D725235e41b0D79BBDCC1b4c16B550522BEE6c5'

export const WETH_ADDRESS = NETWORK_CHAIN_ID === 1 ? WETH['1'].address : WETH['4'].address

export const DEPRECATED_ASK_V1_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? mainnetV3.AsksV1 : rinkebyV3.AsksV1

export const ASK_V11_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? mainnetV3.AsksV1_1 : rinkebyV3.AsksV1_1

export const AUCTION_HOUSE_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? mainnetAuction.auctionHouse : rinkebyAuction.auctionHouse

export const MODULE_MANAGER_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? mainnetV3.ZoraModuleManager : rinkebyV3.ZoraModuleManager

export const VULNERABLE_ASKS_V1_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? mainnetV3.AsksV1 : rinkebyV3.AsksV1

export const ASKS_V11_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? mainnetV3.AsksV1_1 : rinkebyV3.AsksV1_1

export const ERC721_TRANSFER_HELPER_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? mainnetV3.ERC721TransferHelper : rinkebyV3.ERC721TransferHelper

export const ERC20_TRANSFER_HELPER_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? mainnetV3.ERC20TransferHelper : rinkebyV3.ERC20TransferHelper

export const RAC_ADDRESS = '0xc22b30e4cce6b78aaaadae91e44e73593929a3e9'

export const SOCKS_ADDRESS = '0x23b608675a2b2fb1890d3abbd85c5775c51691d5'

export const FAME_ADDRESS = '0x06f65b8cfcb13a9fe37d836fe9708da38ecb29b2'

export const UNI_ADDRESS = '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'

export const AUDIUS_ADDRESS = '0x18aaa7115705e8be94bffebde57af9bfc265b998'

export const FWB_ADDRESS = '0x7d91e637589ec3bb54d8213a9e92dc6e8d12da91'

export const FWB_PROD_ADDRESS = '0x35bd01fc9d6d5d81ca9e055db88dc49aa2c699a8'

export const FOREFRONT_ADDRESS = '0x7e9d8f07a64e363e97a648904a89fb4cd5fb94cd'

export const LAMP_ADDRESS = '0x861fb212947454ffa6635681ab4736fcd78c2db5'

export const LPT_ADDRESS = '0x58b6a8a3302369daec383334672404ee733ab239'

export const ENS_ADDRESS = '0xc18360217d8f7ab5e7c516566761ea12ce7f9d72'

export const WHALE_ADDRESS = '0x9355372396e3F6daF13359B7b607a3374cc638e0'

export const MEME_ADDRESS = '0xd5525d397898e5502075ea5e830d8914f6f0affe'

export const ROBOT_ADDRESS = '0xfb5453340c03db5ade474b27e68b6a9c6b2823eb'

export const COIN_ADDRESS = '0x87b008e57f640d94ee44fd893f0323af933f9195'

export const BANK_ADDRESS = '0x2d94aa3e47d9d5024503ca8491fce9a2fb4da198'

export const YUP_ADDRESS = '0x69bbc3f8787d573f1bbdd0a5f40c7ba0aee9bcc9'

export const SUPERRARE_TOKEN_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? '0xb932a70A57673d89f4acfFBE830E8ed7f75Fb9e0' : ''

export const ZORA_TOKEN_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? addresses.mainnet.media : addresses.rinkeby.media
// TODO - can remove duplicates when fully migrated
export const ZORA_RINKEBY_TOKEN_ADDRESS = addresses.rinkeby.media
export const ZORA_MAINNET_TOKEN_ADDRESS = addresses.mainnet.media

export const FOUNDATION_TOKEN_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? '0x3B3ee1931Dc30C1957379FAc9aba94D1C48a5405' : ''

export const ARTBLOCKS_TOKEN_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? '0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270' : ''

export const KnownContracts = [
  ZORA_TOKEN_ADDRESS,
  FOUNDATION_TOKEN_ADDRESS,
  SUPERRARE_TOKEN_ADDRESS,
  ARTBLOCKS_TOKEN_ADDRESS,
]

interface Contract {
  [key: string]: string | undefined
}
export const KnownContractsByName: Contract = {
  zora: ZORA_TOKEN_ADDRESS,
  foundation: FOUNDATION_TOKEN_ADDRESS,
  superrare: SUPERRARE_TOKEN_ADDRESS,
  artblocks: ARTBLOCKS_TOKEN_ADDRESS,
}
