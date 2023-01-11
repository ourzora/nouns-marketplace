import React, { useMemo } from 'react'

import { SuccessCheckmark } from '@market/components/SuccessCheckmark'
import { Button, Stack } from '@zord'

import { CommonV3AskComponentProps } from '../V3AskFlow'
import { V3AskHeadingDescription } from '../V3AskHeadingDescription'
import { PRIVATE_ASK } from '../hooks/useV3AskTransaction'
import { useV3AskStateContext } from '../providers'

interface V3AskCreateSuccessProps extends CommonV3AskComponentProps {}

export function V3AskUpdateSuccess({ nft, onNext, ...props }: V3AskCreateSuccessProps) {
  const { state } = useV3AskStateContext()
  const heading = useMemo(
    () => (state.flow === PRIVATE_ASK ? 'Private Listing Updated' : 'Listing Updated'),
    [state.flow]
  )
  return (
    <Stack gap="x8" {...props}>
      <SuccessCheckmark />
      <V3AskHeadingDescription
        heading={heading}
        description="The listing price has been changed."
      />
      <Button onClick={onNext}>Done</Button>
    </Stack>
  )
}
