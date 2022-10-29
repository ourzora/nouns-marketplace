export function formatSeaportErrorMsg(message: string) {
  let errorMsg = 'Could not validate the order from SeaPort'

  if (message.includes('insufficient funds')) {
    errorMsg = 'Wallet has insufficient funds for purchase'
  }
  if (message.includes('contract call simulation failed')) {
    errorMsg =
      'Contract call simulation failed. This order may no longer be available from SeaPort'
  }

  return errorMsg
}
