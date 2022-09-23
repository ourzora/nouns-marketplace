import { Button, Stack } from '@zoralabs/zord'
import React from 'react'
import { HeadingDescription } from '../HeadingDescription'
import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'
import { SuccessCheckmark } from '@market/components/SuccessCheckmark'

interface PrivateAskCreateSuccessProps extends CommonPrivateAskComponentProps {}

export function PrivateAskCreateSuccess({
  nft,
  onNext,
  ...props
}: PrivateAskCreateSuccessProps) {
  return (
    <Stack gap="x8" {...props}>
      <SuccessCheckmark />
      <HeadingDescription
        heading="Private Listing Created"
        description="This listing is now available to the buyer."
      />
      <Button onClick={onNext} borderRadius="curved">
        Done
      </Button>
    </Stack>
  )
}
