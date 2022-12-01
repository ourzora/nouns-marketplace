import { Button } from 'components/Button'

import React, { useEffect } from 'react'

import { MarketModalHeading } from '@market/components'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { useListingDataTable } from '@market/hooks'
import { useModal } from '@modal/useModal'
import { DataTable, PrintError, formatContractError } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Flex, Stack } from '@zord'

import { CommonPrivateAskComponentProps } from '../../common'
import * as styles from '../PrivateAskFlow.css'
import { usePrivateAskTransaction } from '../hooks/usePrivateAskTransaction'

interface PrivateAskCancelProps extends CommonPrivateAskComponentProps {
  nft: NFTObject
}

export function PrivateAskCancel({ onNext, ...props }: PrivateAskCancelProps) {
  const { isSubmitting, cancelAsk, txStatus, txInProgress, txError, finalizedTx } =
    usePrivateAskTransaction({ nft: props.nft })
  useEffect(() => finalizedTx!! && onNext && onNext(), [finalizedTx, onNext])
  const { requestClose } = useModal()
  const { formattedListingDataTable } = useListingDataTable({
    nft: props.nft,
  })

  return (
    <Stack gap="x3" {...props}>
      <Stack gap="x4">
        <MarketModalHeading nftObj={props.nft} action="Delist" />

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
