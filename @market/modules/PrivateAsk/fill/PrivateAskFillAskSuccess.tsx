import { Button } from 'components/Button'

import React from 'react'

import { HeadingDescription, SuccessCheckmark } from '@market/components'
import { useModal } from '@modal'
import { Stack } from '@zoralabs/zord'

import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'

interface PrivateAskFillAskSuccessProps extends CommonPrivateAskComponentProps {}

export function PrivateAskFillAskSuccess({ ...props }: PrivateAskFillAskSuccessProps) {
  const { requestClose } = useModal()

  return (
    <Stack gap="x8" {...props}>
      <SuccessCheckmark />

      <HeadingDescription
        heading="Private Purchase Completed"
        description="Find this NFT in your collection soon."
      />

      <Button variant="secondary" onClick={requestClose}>
        Close
      </Button>
    </Stack>
  )
}
