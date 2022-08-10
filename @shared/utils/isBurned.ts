import { AddressZero } from '@ethersproject/constants'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'
import { isAddressMatch } from '@shared/utils/isAddressMatch'

export function isBurned(nft: NFTObject) {
  return nft?.nft?.owner?.address && isAddressMatch(nft?.nft?.owner.address, AddressZero)
}
