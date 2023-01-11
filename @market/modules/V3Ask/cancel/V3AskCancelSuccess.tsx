import React, { useMemo } from 'react'

import { SuccessCheckmark } from '@market/components/SuccessCheckmark'
import { useModal } from '@modal'
import { Button, Stack } from '@zord'

import { CommonV3AskComponentProps } from '../V3AskFlow'
import { V3AskHeadingDescription } from '../V3AskHeadingDescription'
import { PRIVATE_ASK } from '../hooks'
import { useV3AskStateContext } from '../providers'

const privateHeading = 'Private Listing Canceled'
const v3Heading = 'Listing Canceled'

interface V3AskCancelSuccessProps extends CommonV3AskComponentProps {}
export function V3AskCancelSuccess({ ...props }: V3AskCancelSuccessProps) {
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
        description="The listing is no longer available to the buyer."
      />
      <Button variant="secondary" onClick={requestClose}>
        Close
      </Button>
    </Stack>
  )
}
