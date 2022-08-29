import {
  CANCEL,
  UPDATE,
  PrivateAskAction,
  APPROVE_MODULE_FOR_FILL,
} from '@market/modules/PrivateAsk/'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Button, Paragraph, Stack, Well } from '@zoralabs/zord'
import React, { useMemo } from 'react'

import { useRelevantMarket, useAskHelper } from '@market/hooks'
import { isAddressMatch, useAuth, useIsOwner } from '@shared'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'

interface PrivateAskTriggerProps {
  nft: NFTObject
  openModal: () => void
  dispatch: React.Dispatch<PrivateAskAction>
}

export function PrivateAskTrigger({ nft, openModal, dispatch }: PrivateAskTriggerProps) {
  const { ask } = useRelevantMarket(nft.markets)
  const { isActiveAsk, isPrivateAsk, buyerAddress, displayAskAmount, usdAskAmount } =
    useAskHelper({ ask })
  const { isOwner } = useIsOwner(nft)
  const { address: userAddress } = useAuth()
  const hasActivePrivateAsk = isActiveAsk && isPrivateAsk
  const isValidBuyer = useMemo(
    () => hasActivePrivateAsk && isAddressMatch(userAddress, buyerAddress),
    [buyerAddress, hasActivePrivateAsk, userAddress]
  )

  return isOwner ? (
    <>
      {hasActivePrivateAsk ? (
        <Stack gap="x2">
          <Button
            w="100%"
            onClick={() => {
              dispatch && dispatch({ type: UPDATE })
              openModal()
            }}
          >
            Update Private Listing
          </Button>
          <Button
            variant="destructive"
            w="100%"
            onClick={() => {
              dispatch && dispatch({ type: CANCEL })
              openModal()
            }}
          >
            Cancel Private Listing
          </Button>
        </Stack>
      ) : (
        <Button w="100%" onClick={openModal}>
          Create Private Listing
        </Button>
      )}
    </>
  ) : (
    isValidBuyer && (
      <Well gap="x6">
        {displayAskAmount && (
          <PriceWithLabel
            label="Private Listing"
            symbol="ETH"
            cryptoAmount={displayAskAmount}
            usdAmount={usdAskAmount}
          />
        )}

        <Paragraph size="xs">
          You have a private offer of sale from {nft.nft?.owner?.address}
        </Paragraph>

        <Button
          w="100%"
          onClick={() => {
            dispatch && dispatch({ type: APPROVE_MODULE_FOR_FILL })
            openModal()
          }}
        >
          Buy NFT Privately
        </Button>
      </Well>
    )
  )
}
