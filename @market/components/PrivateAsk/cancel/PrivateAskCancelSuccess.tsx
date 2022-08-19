import { useContractContext } from '@market/providers'
import { Button, Heading, Paragraph, Stack, StackProps } from '@zoralabs/zord'
// import { MotionStack } from 'components/Motion'
import React, { useEffect } from 'react'
import { CommonPrivateAskComponentProps } from '../PrivateAskModal'

// @TODO: Add ask details from private ask

interface PrivateAskCancelSuccessProps extends CommonPrivateAskComponentProps {}
export function PrivateAskCancelSuccess({
  // onNext,
  handleClose,
  ...props
}: PrivateAskCancelSuccessProps) {
  const { PrivateAsks } = useContractContext() // Should this all be moved to usePrivateAskContext?
  // const { finalizedPrivateAskDetails } = usePrivateAskContext()
  // const { toast, showToast } = useToast()

  // useEffect(() => {
  //   // if (copied) {
  //   showToast('Cancelled')
  //   // }
  // }, [showToast])

  return (
    <>
      <Stack gap="x5">
        <Heading size="xs">Private Sale Cancelled</Heading>

        <Paragraph size="sm">
          The sale will no longer be available to the buyer.
        </Paragraph>

        <Button onClick={handleClose}>Close</Button>
      </Stack>
      {/* {toast} */}
    </>
  )
}
