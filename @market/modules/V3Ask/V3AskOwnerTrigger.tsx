import clsx from 'clsx'
import { Button } from 'components/Button'

import React, { useCallback, useState } from 'react'

import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { PossibleV3AskState, useV3AskStateContext } from '@market/modules/V3Ask/'
import { useKeyPress } from '@shared'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'
import { NFTObject } from '@zoralabs/nft-hooks'
import { PopUp, Stack, Text, Well } from '@zoralabs/zord'

import * as styles from './V3AskFlow.css'

interface V3AskOwnerTriggerProps {
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
    action: 'updateV3Ask' as const,
  },
  {
    label: 'Delist',
    action: 'cancelV3Ask' as const,
    destructive: true,
  },
]

export function V3AskOwnerTrigger({ nft, openModal }: V3AskOwnerTriggerProps) {
  const { dispatch } = useV3AskStateContext()
  const { ask } = useRelevantMarket(nft.markets)
  const { displayAskAmount, usdAskAmount, hasActiveV3Ask } = useAskHelper({ ask })

  const [open, setOpen] = useState<boolean>(false)
  useKeyPress('Escape', open, () => setOpen(false))

  const handleClick = useCallback(
    (actionType: PossibleV3AskState) => {
      setOpen(false)
      dispatch && dispatch({ type: actionType })
      openModal()
    },
    [dispatch, openModal]
  )

  if (hasActiveV3Ask) {
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
