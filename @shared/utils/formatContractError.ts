export interface TransactionError extends Error {
  reason: string
  code: string
  error: {
    code: number
    message: string
  }
  method: string
  transaction: string
}

export function formatContractError(error: TransactionError | Error) {
  if ('transaction' in error) {
    switch (error.reason) {
      case 'insufficient funds for intrinsic transaction cost':
        return 'Your balance is too low to make this transaction'
      case "execution reverted: Auction doesn't exist":
        return 'Auction no longer exists'
    }

    switch (error?.error?.message) {
      case 'execution reverted: ERC721: owner query for nonexistent token':
        return 'This token was burnt and no longer exists'
      case 'execution reverted: Must send more than last bid by minBidIncrementPercentage amount':
        return 'You need to bid at least 5% more than the last current bid'
      case 'execution reverted: Auction expired':
        return 'The auction has finished, no more bids can be placed'
      case 'execution reverted: Caller must be approved or owner for token id':
        return 'Only the current owner of the token can perform this action'
      case 'execution reverted: Bid invalid for share splitting':
        return 'The value of this bid cannot be correctly split between owners'
      case 'execution reverted: Media: Only approved or owner':
        return 'The contract has not yet been approved or you are the owner'
    }
  }

  switch (error?.message) {
    case 'MetaMask Tx Signature: User denied transaction signature.':
      return 'Transaction rejected. If this was a mistake, try again.'
  }

  return (
    error?.message || 'An unknown error occurred, please try again or contact support.'
  )
}
