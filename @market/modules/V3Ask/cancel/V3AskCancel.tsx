import { Button } from 'components/Button'

import React, { useEffect } from 'react'

import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { useListingDataTable } from '@market/hooks'
import { useModal } from '@modal/useModal'
import { DataTable, PrintError, formatContractError } from '@shared'
import { Flex, Stack } from '@zoralabs/zord'

import { CommonV3AskComponentProps } from '../V3AskFlow'
import * as styles from '../V3AskFlow.css'
import { V3AskModalHeading } from '../V3AskModalHeading'
import { useV3AskTransaction } from '../hooks/useV3AskTransaction'

interface V3AskCancelProps extends CommonV3AskComponentProps {}

export function V3AskCancel({ onNext, ...props }: V3AskCancelProps) {
  const { isSubmitting, cancelAsk, txStatus, txInProgress, txError, finalizedTx } =
    useV3AskTransaction({ nft: props.nft })
  useEffect(() => finalizedTx!! && onNext && onNext(), [finalizedTx, onNext])
  const { requestClose } = useModal()
  const { formattedListingDataTable } = useListingDataTable({
    nft: props.nft,
  })

  return (
    <Stack gap="x3" {...props}>
      <Stack gap="x4">
        <V3AskModalHeading nftObj={props.nft} action="Delist" />

        <DataTable
          rowSize="lg"
          rowVariant="withBorder"
          items={formattedListingDataTable}
        />

        {txError && <PrintError errorMessage={formatContractError(txError)} />}
      </Stack>

      <Flex gap="x2" justify="space-between" pt="x3" className={styles.stretch}>
        <Button flex={1} variant="secondary" size="lg" onClick={requestClose}>
          Cancel
        </Button>
        <TransactionSubmitButton
          flex={1}
          type="submit"
          size="lg"
          txStatus={txStatus}
          txInProgress={txInProgress}
          onClick={cancelAsk}
          variant="destructive"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Delist
        </TransactionSubmitButton>
      </Flex>
    </Stack>
  )
}
