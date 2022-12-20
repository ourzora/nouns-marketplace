import { Button } from 'components/Button'

import React from 'react'

import { ModalTitleAndDescription, SuccessCheckmark } from '@market/components/'
import { useModal } from '@modal'
import { Stack } from '@zord'

import { CommonSeaportFillOrderProps } from '../common'

export function SeaportFillOrderSuccess({ ...props }: CommonSeaportFillOrderProps) {
  const { requestClose } = useModal()

  return (
    <Stack gap="x8" {...props}>
      <SuccessCheckmark />

      <ModalTitleAndDescription
        title="Seaport Purchase Completed"
        description="Find this NFT in your collection soon."
      />

      <Button variant="secondary" onClick={requestClose}>
        Close
      </Button>
    </Stack>
  )
}
