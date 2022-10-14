import React from 'react'
import { useModal } from '@modal'
import { Stack } from '@zoralabs/zord'
import { Button } from 'components/Button'
import { HeadingDescription } from '../HeadingDescription'
import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'
import { SuccessCheckmark } from '@market/components/SuccessCheckmark'

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
