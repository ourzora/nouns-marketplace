import { Button } from 'components/Button'

import React from 'react'

import { SuccessCheckmark } from '@market/components/SuccessCheckmark'
import { useModal } from '@modal'
import { Stack } from '@zoralabs/zord'

import { CommonV3AskComponentProps } from '../V3AskFlow'
import { V3AskHeadingDescription } from '../V3AskHeadingDescription'

interface V3AskFillAskSuccessProps extends CommonV3AskComponentProps {}

export function V3AskFillAskSuccess({ ...props }: V3AskFillAskSuccessProps) {
  const { requestClose } = useModal()

  return (
    <Stack gap="x8" {...props}>
      <SuccessCheckmark />

      <V3AskHeadingDescription
        heading="Private Purchase Completed"
        description="Find this NFT in your collection soon."
      />

      <Button variant="secondary" onClick={requestClose}>
        Close
      </Button>
    </Stack>
  )
}
