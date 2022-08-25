import { Button, Heading, Paragraph, Stack } from '@zoralabs/zord'
// import { MotionStack } from 'components/Motion'
import React, { useEffect } from 'react'
import { CommonPrivateAskComponentProps } from '../PrivateAskModal'

interface PrivateAskFillAskSuccessProps extends CommonPrivateAskComponentProps {}

export function PrivateAskFillAskSuccess({
  handleClose,
  ...props
}: PrivateAskFillAskSuccessProps) {
  // const { toast, showToast } = useToast()

  // useEffect(() => {
  //   // if (copied) {
  //   showToast('FillAskled')
  //   // }
  // }, [showToast])

  return (
    <>
      <Stack gap="x6">
        <Stack gap="x2">
          <Heading size="xs">Private Sale Completed</Heading>
          <Paragraph size="sm">You bought the NFT</Paragraph>
        </Stack>
        <Button onClick={handleClose}>Close</Button>
      </Stack>
      {/* {toast} */}
    </>
  )
}
