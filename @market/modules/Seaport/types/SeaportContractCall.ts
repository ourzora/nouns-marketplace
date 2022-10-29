export type SeaportContractCall = {
  caller_address: string
  contract_address: string // the contract that fills the orders, eg. Seaport
  calldata: string //
  value: string // Price in Ether (Decimal price)
}
