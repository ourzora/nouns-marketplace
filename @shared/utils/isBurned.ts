import { AddressZero } from '@ethersproject/constants'
import { isAddressMatch } from '@shared/utils/isAddressMatch'
import { NFTObject } from '@zoralabs/nft-hooks/dist/types/NFTInterface'

export function isBurned(nft: NFTObject) {
  return nft?.nft?.owner?.address && isAddressMatch(nft?.nft?.owner.address, AddressZero)
}
