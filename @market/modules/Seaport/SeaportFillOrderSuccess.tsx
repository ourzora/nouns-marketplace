import { Button } from 'components/Button'

import React from 'react'

import { HeadingDescription, SuccessCheckmark } from '@market/components/'
import { useModal } from '@modal'
import { Stack } from '@zoralabs/zord'

import { CommonSeaportFillOrderProps } from './SeaportFillOrderFlow'

export function SeaportFillOrderSuccess({ ...props }: CommonSeaportFillOrderProps) {
  const { requestClose, modalType } = useModal()

  return (
    <Stack gap="x8" {...props}>
      <SuccessCheckmark />

      <HeadingDescription
        heading="Seaport Purchase Completed"
        description="Find this NFT in your collection soon."
      />

      <Button variant="secondary" onClick={requestClose}>
        Close
      </Button>
    </Stack>
  )
}
