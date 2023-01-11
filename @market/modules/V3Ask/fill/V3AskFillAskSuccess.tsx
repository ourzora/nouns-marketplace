import React, { useMemo } from 'react'

import { SuccessCheckmark } from '@market/components/SuccessCheckmark'
import { useModal } from '@modal'
import { Button, Stack } from '@zord'

import { CommonV3AskComponentProps } from '../V3AskFlow'
import { V3AskHeadingDescription } from '../V3AskHeadingDescription'
import { PRIVATE_ASK } from '../hooks'
import { useV3AskStateContext } from '../providers'

interface V3AskFillAskSuccessProps extends CommonV3AskComponentProps {}

const privateHeading = 'Private Purchase Completed'
const v3Heading = 'Purchase Completed'

export function V3AskFillAskSuccess({ ...props }: V3AskFillAskSuccessProps) {
  const { requestClose } = useModal()
  const { state } = useV3AskStateContext()
  const heading = useMemo(
    () => (state.flow === PRIVATE_ASK ? privateHeading : v3Heading),
    [state.flow]
  )
  return (
    <Stack gap="x8" {...props}>
      <SuccessCheckmark />

      <V3AskHeadingDescription
        heading={heading}
        description="Find this NFT in your collection soon."
      />

      <Button variant="secondary" onClick={requestClose}>
        Close
      </Button>
    </Stack>
  )
}
