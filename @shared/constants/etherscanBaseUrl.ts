import { NETWORK_CHAIN_ID } from '@shared/utils/connectors'

export const ETHERSCAN_BASE_URL =
  NETWORK_CHAIN_ID === 1 ? 'https://etherscan.io' : 'https://rinkeby.etherscan.io'
