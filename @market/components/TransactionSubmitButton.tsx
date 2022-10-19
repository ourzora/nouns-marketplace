import { Button, NounButtonProps } from 'components/Button'

import { useMemo } from 'react'

import { WalletCallStatus, useButtonRequiresAuth } from '@shared/hooks'
import { Box } from '@zoralabs/zord'

/**
 * Render a button that will submit a transaction to the blockchain.
 * This button handles loading, disabling, and error states.
 */

interface TransactionSubmitButtonProps extends NounButtonProps {
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  txInProgress: boolean
  txStatus: WalletCallStatus
  variant?: 'primary' | 'destructive'
  size?: 'md' | 'lg'
}

export function TransactionSubmitButton({
  children,
  disabled,
  loading,
  variant = 'primary',
  txInProgress,
  txStatus,
  size = 'md',
  onClick,
  ...props
}: TransactionSubmitButtonProps) {
  const isLoading = useMemo(
    () => txStatus === WalletCallStatus.CONFIRMING || txInProgress || loading,
    [loading, txInProgress, txStatus]
  )

  const isDisabled = isLoading || disabled
  const variableButtonBehavior = useButtonRequiresAuth(onClick)

  return (
    <Button
      className="transaction-submit-button"
      loading={isLoading}
      disabled={isDisabled}
      w="100%"
      variant={variant}
      size={size}
      onClick={variableButtonBehavior}
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
