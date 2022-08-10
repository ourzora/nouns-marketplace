import mainnetV3 from '@zoralabs/v3/dist/addresses/1.json'
import rinkebyV3 from '@zoralabs/v3/dist/addresses/4.json'
import { NETWORK_CHAIN_ID } from '@shared/utils/connectors'

export const MODULE_MANAGER_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? mainnetV3.ZoraModuleManager : rinkebyV3.ZoraModuleManager

export const ASKS_V11_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? mainnetV3.AsksV1_1 : rinkebyV3.AsksV1_1

export const ERC721_TRANSFER_HELPER_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? mainnetV3.ERC721TransferHelper : rinkebyV3.ERC721TransferHelper

export const ERC20_TRANSFER_HELPER_ADDRESS =
  NETWORK_CHAIN_ID === 1 ? mainnetV3.ERC20TransferHelper : rinkebyV3.ERC20TransferHelper
