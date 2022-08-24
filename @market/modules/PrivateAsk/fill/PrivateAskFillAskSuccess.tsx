import { Button, Heading, Paragraph, Stack } from '@zoralabs/zord'
// import { MotionStack } from 'components/Motion'
import React, { useEffect } from 'react'
import { CommonPrivateAskComponentProps } from '../PrivateAskModal'

interface PrivateAskFillAskSuccessProps extends CommonPrivateAskComponentProps {}

export function PrivateAskFillAskSuccess({
  // onNext,
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
      <Stack gap="x5">
        <Heading size="xs">Private Sale Completed</Heading>

        <Paragraph size="sm">You bought the NFT</Paragraph>

        <Button onClick={handleClose}>Close</Button>
      </Stack>
      {/* {toast} */}
    </>
  )
}
