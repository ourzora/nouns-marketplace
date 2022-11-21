import { OffchainOrderWithToken } from 'types/zora.api.generated'

import {
  NOUNS_TREASURY_ADDRESS,
  SEAPORT_CONTRACT_CALL_VALIDATION_ADDRESS,
} from '@shared/constants'

// Validate that offchain orders are still valid
// See: https://docs.zora.co/docs/guides/api-offchain#verifying

export function isSeaportValidationResponseValid(response: any) {
  return response?.message?.includes('successfully simulated contract call')
}

export async function isSeaportOrderValid(
  order?: OffchainOrderWithToken
): Promise<boolean> {
  if (!order) return false

  const { offchainOrder } = order
  const { calldata, contractAddress, price } = offchainOrder
  const { chainTokenPrice } = price

  const contractCall = {
    caller_address: NOUNS_TREASURY_ADDRESS, // This is a clever hack. The Seaport validation endpoint checks a) if the order is open and b) if the address can afford to buy the NFT. So we use the treasury address, which is likely to be quite full
    contract_address: contractAddress,
    calldata: calldata,
    value: chainTokenPrice?.decimal, // Price in Ether (Decimal price)
  }

  const rawResponse = await fetch(SEAPORT_CONTRACT_CALL_VALIDATION_ADDRESS, {
    method: 'POST',
    /* @ts-ignore */
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-API-KEY': process.env.NEXT_PUBLIC_ZORA_API_KEY,
    },
    body: JSON.stringify({
      ...contractCall,
    }),
  })

  const resp = await rawResponse.json()
  const isValid: boolean = await isSeaportValidationResponseValid(resp)

  return isValid
}
