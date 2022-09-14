import {
  Button,
  Eyebrow,
  Flex,
  Heading,
  Paragraph,
  Separator,
  Stack,
} from '@zoralabs/zord'
import React, { useEffect, useMemo } from 'react'
import { TransactionSubmitButton } from '@market/components/TransactionSubmitButton'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'
import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'
import { CollectionThumbnail } from '@media/CollectionThumbnail'
import { useRelevantMarket } from '@market/hooks/useRelevantMarket'
import { useAskHelper } from '@market/hooks/useAskHelper'
import { usePrivateAskTransaction } from '../hooks/usePrivateAskTransaction'
import { PrintError } from '@shared/components/PrintError'
import { useAuth } from '@shared/hooks/useAuth'
import { useModal } from '@modal'
import { DataTable } from '@shared'
import { useFormattedPrivateAskInfo } from '../hooks'

interface PrivateAskFillAskProps extends CommonPrivateAskComponentProps {}

export function PrivateAskFillAsk({ onNext, ...props }: PrivateAskFillAskProps) {
  const { markets, nft } = props.nft
  const { modalType, requestClose, requestOpen } = useModal()
  const { formattedAskDetails } = useFormattedPrivateAskInfo({ nft: props.nft })
  const { ask } = useRelevantMarket(markets)
  // const { balance: walletBalance } = useAuth()
  const { displayAskAmount, usdAskAmount, hasSufficientFunds } = useAskHelper({
    ask,
  })
  const { txStatus, txInProgress, txError, finalizedTx, fillAsk } =
    usePrivateAskTransaction({ nft: props.nft })
  const isDisabled = useMemo(
    () => txInProgress || !hasSufficientFunds || !displayAskAmount,
    [displayAskAmount, hasSufficientFunds, txInProgress]
  )
  useEffect(() => finalizedTx!! && onNext && onNext(), [finalizedTx, onNext])

  return (
    <Stack gap="x6">
      <Heading as="h2" size="md">
        {`Buy ${nft?.contract.name} #${nft?.tokenId}`}
      </Heading>
      <Flex w="100%" justify="space-between" textAlign="right">
        {/* @BJ TODO: This component causes 500 error when it hits the useNounsToken contract call */}
        {/* <CollectionThumbnail
          initialNFT={props.nft}
          collectionAddress={nft?.contract.address}
          tokenId={nft?.tokenId}
        /> */}

        {/* {displayAskAmount && (
          <PriceWithLabel
            label="Private Listing"
            symbol="ETH"
            cryptoAmount={displayAskAmount}
            usdAmount={usdAskAmount}
          />
        )} */}
      </Flex>

      {/* <Separator />
      <Flex justify="space-between">
        <Paragraph size="sm" color="text3">
          Your balance
        </Paragraph>
        <Eyebrow color="text1" inline>
          {walletBalance?.formatted} {walletBalance?.symbol}
        </Eyebrow>
      </Flex> */}

      <DataTable rowVariant="withBorder" items={formattedAskDetails} />

      <Flex>TODO: Add relevant data for sale. Owned By? Minted By? Price? TBD</Flex>
      <Paragraph size="sm" color="text4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, voluptatibus tempora
        rerum ea expedita cumque perspiciatis sed suscipit nesciunt doloribus
      </Paragraph>

      {txError && <PrintError errorMessage={txError} />}

      <Flex alignItems="stretch" gap="x2" justify="space-between">
        <Button flex="1" variant="secondary" borderRadius="curved" onClick={requestClose}>
          Cancel
        </Button>
        <TransactionSubmitButton
          type="submit"
          txStatus={txStatus}
          txInProgress={txInProgress}
          onClick={() => fillAsk({ price: displayAskAmount })}
          disabled={isDisabled}
          w="auto"
          flex={1}
        >
          {hasSufficientFunds ? `Buy NFT` : 'Insufficient Funds'}
        </TransactionSubmitButton>
      </Flex>
    </Stack>
  )
}
