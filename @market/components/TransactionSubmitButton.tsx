import { useMemo } from 'react'
import { Box, Button, ButtonProps } from '@zoralabs/zord'
import { WalletCallStatus } from '@shared'

/**
 * Render a button that will submit a transaction to the blockchain.
 * This button handles loading, disabling, and error states.
 */

interface TransactionSubmitButtonProps extends ButtonProps {
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  txInProgress: boolean
  txStatus: WalletCallStatus
}

export function TransactionSubmitButton({
  children,
  disabled,
  loading,
  txInProgress,
  txStatus,
  ...props
}: TransactionSubmitButtonProps) {
  const isLoading = useMemo(
    () => txStatus === WalletCallStatus.CONFIRMING || txInProgress || loading,
    [loading, txInProgress, txStatus]
  )

  const isDisabled = isLoading || disabled

  return (
    <Button
      className="transaction-submit-button"
      loading={isLoading}
      disabled={isDisabled}
      w="100%"
      borderRadius="curved"
      {...props}
    >
      {txStatus === WalletCallStatus.ERRORED ? (
        'Try Again'
      ) : txStatus === WalletCallStatus.PROMPTED ? (
        <>
          <Box as="span" display={{ '@initial': 'none', '@480': 'block' }}>
            Confirm the transaction in your wallet
          </Box>
          <Box as="span" display={{ '@initial': 'none', '@480': 'block' }}>
            Awaiting confirmation
          </Box>
        </>
      ) : (
        children
      )}
    </Button>
  )
}
