import { Button } from 'components/Button'

import React from 'react'

import { SuccessCheckmark } from '@market/components/SuccessCheckmark'
import { useModal } from '@modal'
import { Stack } from '@zoralabs/zord'

import { CommonV3AskComponentProps } from '../V3AskFlow'
import { V3AskHeadingDescription } from '../V3AskHeadingDescription'

interface V3AskCancelSuccessProps extends CommonV3AskComponentProps {}
export function V3AskCancelSuccess({ ...props }: V3AskCancelSuccessProps) {
  const { requestClose } = useModal()

  return (
    <Stack gap="x8" {...props}>
      <SuccessCheckmark />
      <V3AskHeadingDescription
        heading="Private Listing Canceled"
        description="The listing is no longer available to the buyer."
      />
      <Button variant="secondary" onClick={requestClose}>
        Close
      </Button>
    </Stack>
  )
}
