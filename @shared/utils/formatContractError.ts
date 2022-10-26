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

// ERROR: cannot estimate gas; transaction may fail or may require manual gas limit [ See: https://links.ethers.org/v5-errors-UNPREDICTABLE_GAS_LIMIT ] (reason="execution reverted", method="estimateGas", transaction={"from":"0x9FefE8a875E7a9b0574751E191a2AF205828dEA4","to":"0x6170B3C3A54C3d8c854934cBC314eD479b2B29A3","data":"0xc4f0ee36000000000000000000000000decc60000ba66700a009b8f9f7d82676b5cfa88a0000000000000000000000000000000000000000000000000000000000002456000000000000000000000000000000000000000000000000000000e8d4a51000","accessList":null}, error={"code":-32000,"message":"execution reverted"}, code=UNPREDICTABLE_GAS_LIMIT, version=providers/5.7.1)

export function formatContractError(error: TransactionError | Error) {
  if ('transaction' in error) {
    switch (error.reason) {
      case 'insufficient funds for intrinsic transaction cost':
        return 'Your balance is too low to make this transaction.'
      case "execution reverted: Auction doesn't exist":
        return 'Auction no longer exists.'
      case 'execution reverted: Must send at least reservePrice':
        return 'Bid value must exceed reserve price.'
    }

    switch (error?.error?.message) {
      case 'execution reverted: ERC721: owner query for nonexistent token':
        return 'This token was burnt and no longer exists.'
      case 'execution reverted: Must send more than last bid by minBidIncrementPercentage amount':
        return 'You need to bid at least 5% more than the last current bid.'
      case 'execution reverted: Auction expired':
        return 'The auction has finished, no more bids can be placed.'
      case 'execution reverted: Caller must be approved or owner for token id':
        return 'Only the current owner of the token can perform this action.'
      case 'execution reverted: Bid invalid for share splitting':
        return 'The value of this bid cannot be correctly split between owners.'
      case 'execution reverted: Media: Only approved or owner':
        return 'The contract has not yet been approved or you are the owner.'
      case 'execution reverted: ONLY_SELLER_OR_TOKEN_OWNER':
        return 'This action can only be initiated by the token owner.'
      case 'execution reverted: ONLY_TOKEN_OWNER_OR_OPERATOR':
        return 'This action can only be initiated by the token owner'
    }
  }

  switch (error?.message) {
    case 'Connector not found':
      return 'You must connect your wallet to place a bid.'
    case 'MetaMask Tx Signature: User denied transaction signature.':
      return 'Transaction rejected. If this was a mistake, try again.'
  }

  if (error?.message?.includes('user rejected transaction')) {
    return 'User rejected transaction.'
  }
  if (error?.message?.includes('UNPREDICTABLE_GAS_LIMIT')) {
    return 'Unpredictable gas limit: may indicate an unknown transaction failure, or a gas limit misconfiguration'
  }

  return (
    error?.message || 'An unknown error occurred, please try again or contact support.'
  )
}
