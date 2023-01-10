import clsx from 'clsx'

import React, { useCallback, useMemo, useState } from 'react'

import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { PossibleV3AskState, useV3AskStateContext } from '@market/modules/V3Ask/'
import { useKeyPress } from '@shared'
import { PriceWithLabel } from '@shared/components/PriceWithLabel'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Button, PopUp, Stack, Text, Well } from '@zord'

import { UniversalListAskFlow } from './UniversalListAskFlow'
import * as styles from './V3AskFlow.css'

interface V3AskOwnerTriggerProps {
  nft: NFTObject
  openModal: () => void
}

const v3AskDropdownOptions = [
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

const privateAskDropdownOptions = [
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

export function V3AskOwnerTrigger({ nft, openModal }: V3AskOwnerTriggerProps) {
  const { dispatch } = useV3AskStateContext()
  const { ask } = useRelevantMarket(nft.markets)

  const { displayAskAmount, usdAskAmount, hasActivePrivateAsk, isActiveAsk } =
    useAskHelper({
      ask,
    })

  const dropdownOptions = useMemo(
    () => (hasActivePrivateAsk ? privateAskDropdownOptions : v3AskDropdownOptions),
    [hasActivePrivateAsk]
  )

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

  const label = useMemo(
    () => (hasActivePrivateAsk ? 'Private Listing' : 'Listing'),
    [hasActivePrivateAsk]
  )

  if (isActiveAsk) {
    return (
      <Well gap="x6" borderRadius="phat">
        {displayAskAmount && (
          <PriceWithLabel
            label={label}
            symbol="ETH"
            cryptoAmount={displayAskAmount}
            usdAmount={usdAskAmount}
          />
        )}
        <PopUp
          open={open}
          placement="bottom-end"
          wrapperClassName={clsx('privateask-owner-popup-wrapper')}
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

  return <UniversalListAskFlow nftObj={nft} />
}
