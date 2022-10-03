import { Button, Stack } from '@zoralabs/zord'
import React from 'react'
import { HeadingDescription } from '../HeadingDescription'
import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'
import { SuccessCheckmark } from '@market/components/SuccessCheckmark'

interface PrivateAskCreateSuccessProps extends CommonPrivateAskComponentProps {}

export function PrivateAskUpdateSuccess({
  nft,
  onNext,
  ...props
}: PrivateAskCreateSuccessProps) {
  return (
    <Stack gap="x8" {...props}>
      <SuccessCheckmark />
      <HeadingDescription
        heading="Private Listing Updated"
        description="The listing price has been changed."
      />
      <Button onClick={onNext} borderRadius="curved">
        Done
      </Button>
    </Stack>
  )
}
