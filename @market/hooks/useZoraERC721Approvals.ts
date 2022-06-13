import { useERC721TokenApproval } from './useERC721TokenApproval'
import {
  AUCTION_HOUSE_ADDRESS,
  ERC721_TRANSFER_HELPER_ADDRESS,
} from '@market/utils/addresses'

/**
 * Hook to fetch approval status for all zora protocol contracts
 * for a particular ERC721 / ERC1155??(I think) tokenAddress
 * @param tokenAddress
 */
export function useZoraERC721Approvals(tokenAddress: string) {
  const { approved: transferHelper } = useERC721TokenApproval(
    tokenAddress,
    ERC721_TRANSFER_HELPER_ADDRESS
  )

  const { approved: auctionHouse } = useERC721TokenApproval(
    tokenAddress,
    AUCTION_HOUSE_ADDRESS
  )

  return { transferHelper, auctionHouse }
}
