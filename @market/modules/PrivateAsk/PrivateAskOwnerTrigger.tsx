import {
  CANCEL,
  UPDATE,
  VIEW_LISTING,
  usePrivateAskStateContext,
} from '@market/modules/PrivateAsk/'
import { NFTObject } from '@zoralabs/nft-hooks'
import clsx from 'clsx'
import { Text, Button, PopUp, Stack } from '@zoralabs/zord'
import React, { useCallback, useState } from 'react'

import { useRelevantMarket, useAskHelper } from '@market/hooks'
import { useKeyPress } from '@shared'
import * as styles from './PrivateAskFlow.css'
interface PrivateAskOwnerTriggerProps {
  nft: NFTObject
  openModal: () => void
}

const dropdownOptions = [
  {
    label: 'View Listing',
    action: VIEW_LISTING,
  },
  {
    label: 'Update Listing',
    action: UPDATE,
  },
  {
    label: 'Delist',
    action: CANCEL,
    destructive: true,
  },
]

export function PrivateAskOwnerTrigger({ nft, openModal }: PrivateAskOwnerTriggerProps) {
  const { dispatch } = usePrivateAskStateContext()
  const { ask } = useRelevantMarket(nft.markets)
  const { hasActivePrivateAsk } = useAskHelper({ ask })

  const [open, setOpen] = useState<boolean>(false)
  useKeyPress('Escape', open, () => setOpen(false))

  const handleClick = useCallback(
    (actionType: string) => {
      setOpen(false)
      dispatch && dispatch({ type: actionType })
      openModal()
    },
    [dispatch, openModal]
  )

  if (hasActivePrivateAsk) {
    return (
      <PopUp
        // padding="x2"
        open={open}
        placement="bottom-end"
        wrapperClassName={clsx('privateask-owner-popup-wrapper', styles.popupWrapper)}
        // triggerClassName={clsx('privateask-owner-popup-trigger', styles.popupTrigger)}
        triggerClassName={styles.popupTrigger}
        trigger={
          <Button
            w="100%"
            variant="secondary"
            borderRadius="curved"
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
              display="flex"
              justify="space-between"
              style={{
                whiteSpace: 'nowrap',
              }}
              key={option.label}
              onClick={() => handleClick(option.action)}
            >
              <Text as="span" pr="x10" color={option.destructive && 'negative'}>
                {option.label}
              </Text>
            </Button>
          ))}
        </Stack>
      </PopUp>
    )
  }

  return (
    <Button w="100%" onClick={openModal}>
      Create Private Listing
    </Button>
  )
}
