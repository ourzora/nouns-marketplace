import {
  CANCEL,
  UPDATE,
  VIEW_LISTING,
  usePrivateAskStateContext,
  PossibleState,
} from '@market/modules/PrivateAsk/'
import { NFTObject } from '@zoralabs/nft-hooks'
import clsx from 'clsx'
import { Text, PopUp, Stack, Well } from '@zoralabs/zord'
import { Button } from 'components/Button'
import React, { useCallback, useState } from 'react'

import { useRelevantMarket, useAskHelper } from '@market/hooks'
import { useKeyPress } from '@shared'
import * as styles from './PrivateAskFlow.css'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'
interface PrivateAskOwnerTriggerProps {
  nft: NFTObject
  openModal: () => void
}

const dropdownOptions = [
  {
    label: 'Show Listing Data',
    action: 'viewListing' as const,
  },
  {
    label: 'Update Listing',
    action: 'updatePrivateAsk' as const,
  },
  {
    label: 'Delist',
    action: 'cancelPrivateAsk' as const,
    destructive: true,
  },
]

export function PrivateAskOwnerTrigger({ nft, openModal }: PrivateAskOwnerTriggerProps) {
  const { dispatch } = usePrivateAskStateContext()
  const { ask } = useRelevantMarket(nft.markets)
  const { displayAskAmount, usdAskAmount, hasActivePrivateAsk } = useAskHelper({ ask })

  const [open, setOpen] = useState<boolean>(false)
  useKeyPress('Escape', open, () => setOpen(false))

  const handleClick = useCallback(
    (actionType: PossibleState) => {
      setOpen(false)
      dispatch && dispatch({ type: actionType })
      openModal()
    },
    [dispatch, openModal]
  )

  if (hasActivePrivateAsk) {
    return (
      <Well gap="x6" borderRadius="phat">
        {displayAskAmount && (
          <PriceWithLabel
            label="Private Listing"
            symbol="ETH"
            cryptoAmount={displayAskAmount}
            usdAmount={usdAskAmount}
          />
        )}
        <PopUp
          open={open}
          placement="bottom-end"
          wrapperClassName={clsx('privateask-owner-popup-wrapper', styles.popupWrapper)}
          triggerClassName={clsx('privateask-owner-popup-trigger', styles.popupTrigger)}
          trigger={
            <Button
              w="100%"
              variant="secondary"
              onClick={() => setOpen(true)}
              className={['manage-dropdown']}
            >
              Manage Listing...
            </Button>
          }
        >
          <Stack aria-label="Manage Dropdown" w="x64" borderRadius="curved">
            {dropdownOptions.map((option) => (
              <Button
                variant="ghost"
                w="100%"
                justify="space-between"
                style={{
                  whiteSpace: 'nowrap',
                }}
                key={option.label}
                onClick={() => handleClick(option.action)}
              >
                <Text
                  as="span"
                  pr="x10"
                  color={option.destructive ? 'negative' : undefined}
                >
                  {option.label}
                </Text>
              </Button>
            ))}
          </Stack>
        </PopUp>
      </Well>
    )
  }

  return (
    <Button w="100%" onClick={openModal}>
      Create Private Listing
    </Button>
  )
}
