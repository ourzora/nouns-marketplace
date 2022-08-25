import { Button, Heading, Paragraph, Stack } from '@zoralabs/zord'
// import { MotionStack } from 'components/Motion'
import React, { useEffect } from 'react'
import { CommonPrivateAskComponentProps } from '../PrivateAskModal'

interface PrivateAskCancelSuccessProps extends CommonPrivateAskComponentProps {}
export function PrivateAskCancelSuccess({
  handleClose,
  ...props
}: PrivateAskCancelSuccessProps) {
  // const { toast, showToast } = useToast()

  // useEffect(() => {
  //   // if (copied) {
  //   showToast('Cancelled')
  //   // }
  // }, [showToast])

  return (
    <>
      <Stack gap="x5">
        <Stack gap="x2">
          <Heading size="xs">Private Sale Cancelled</Heading>

          <Paragraph size="sm">
            The sale will no longer be available to the buyer.
          </Paragraph>
        </Stack>
        <Button onClick={handleClose}>Close</Button>
      </Stack>
      {/* {toast} */}
    </>
  )
}
