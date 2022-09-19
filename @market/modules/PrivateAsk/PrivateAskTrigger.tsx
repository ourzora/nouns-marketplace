import {
  CANCEL,
  UPDATE,
  APPROVE_MODULE_FOR_FILL,
  useFormattedPrivateAskInfo,
  usePrivateAskStateContext,
  APPROVE_TRANSFER,
  CANCEL_SUCCESS,
  CREATE_SUCCESS,
  UPDATE_SUCCESS,
  FILLASK_SUCCESS,
  CANCEL_ASK,
} from '@market/modules/PrivateAsk/'
import { NFTObject } from '@zoralabs/nft-hooks'
import {
  Button,
  // Separator,
  Stack,
  Well,
} from '@zoralabs/zord'
import React from 'react'

import { useRelevantMarket, useAskHelper } from '@market/hooks'
import {
  // DataTable,
  useIsOwner,
} from '@shared'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'

interface PrivateAskTriggerProps {
  nft: NFTObject
  openModal: () => void
}

export function PrivateAskTrigger({ nft, openModal }: PrivateAskTriggerProps) {
  const { dispatch } = usePrivateAskStateContext()
  const { ask } = useRelevantMarket(nft.markets)
  const { hasActivePrivateAsk, displayAskAmount, usdAskAmount, isValidPrivateAskBuyer } =
    useAskHelper({ ask })
  const { isOwner } = useIsOwner(nft)
  // const { formattedAskDetails } = useFormattedPrivateAskInfo({ nft })

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
    isValidPrivateAskBuyer && (
      <Well gap="x6">
        {displayAskAmount && (
          <PriceWithLabel
            label="Private Listing"
            symbol="ETH"
            cryptoAmount={displayAskAmount}
            usdAmount={usdAskAmount}
          />
        )}

        {/* <Separator /> */}
        {/* {formattedAskDetails && <DataTable items={formattedAskDetails} />} */}

        <Button
          w="100%"
          onClick={() => {
            dispatch && dispatch({ type: APPROVE_MODULE_FOR_FILL }) // INITIAL STATE IN FLOW
            // dispatch && dispatch({ type: APPROVE_TRANSFER }) // FOR TESTING
            // dispatch && dispatch({ type: CANCEL_SUCCESS }) // FOR TESTING
            dispatch && dispatch({ type: CANCEL_ASK }) // FOR TESTING
            // dispatch && dispatch({ type: CREATE_SUCCESS }) // FOR TESTING
            // dispatch && dispatch({ type: UPDATE_SUCCESS }) // FOR TESTING
            // dispatch && dispatch({ type: FILLASK_SUCCESS }) // FOR TESTING
            openModal()
          }}
        >
          Buy Now
        </Button>
      </Well>
    )
  )
}
