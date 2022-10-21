import { Button } from 'components/Button'

import React from 'react'

import { SuccessCheckmark } from '@market/components/SuccessCheckmark'
import { Stack } from '@zoralabs/zord'

import { CommonV3AskComponentProps } from '../V3AskFlow'
import { V3AskHeadingDescription } from '../V3AskHeadingDescription'

interface V3AskCreateSuccessProps extends CommonV3AskComponentProps {}

export function V3AskUpdateSuccess({ nft, onNext, ...props }: V3AskCreateSuccessProps) {
  return (
    <Stack gap="x8" {...props}>
      <SuccessCheckmark />
      <V3AskHeadingDescription
        heading="Private Listing Updated"
        description="The listing price has been changed."
      />
      <Button onClick={onNext}>Done</Button>
    </Stack>
  )
}
