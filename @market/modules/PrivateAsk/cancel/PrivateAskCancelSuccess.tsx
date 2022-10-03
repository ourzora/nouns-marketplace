import React from 'react'
import { Button, Stack } from '@zoralabs/zord'
import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'
import { useModal } from '@modal'
import { SuccessCheckmark } from '@market/components/SuccessCheckmark'
import { HeadingDescription } from '../HeadingDescription'

interface PrivateAskCancelSuccessProps extends CommonPrivateAskComponentProps {}
export function PrivateAskCancelSuccess({ ...props }: PrivateAskCancelSuccessProps) {
  const { requestClose } = useModal()

  return (
    <Stack gap="x8" {...props}>
      <SuccessCheckmark />
      <HeadingDescription
        heading="Private Listing Canceled"
        description="The listing is no longer available to the buyer."
      />
      <Button variant="secondary" onClick={requestClose} borderRadius="curved">
        Close
      </Button>
    </Stack>
  )
}
