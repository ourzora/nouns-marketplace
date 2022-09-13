import { useModal } from '@modal'
import { Button, Heading, Paragraph, Stack } from '@zoralabs/zord'
import React from 'react'
import { CommonPrivateAskComponentProps } from '../PrivateAskModal'

interface PrivateAskFillAskSuccessProps extends CommonPrivateAskComponentProps {}

export function PrivateAskFillAskSuccess({ ...props }: PrivateAskFillAskSuccessProps) {
  const { requestClose } = useModal()

  // const { toast, showToast } = useToast()

  // useEffect(() => {
  //   // if (copied) {
  //   showToast('Ask Filled')
  //   // }
  // }, [showToast])

  return (
    <>
      <Stack gap="x6">
        <Stack gap="x2">
          <Heading size="xs">Private Purchase Completed</Heading>
          <Paragraph size="sm">You bought the NFT</Paragraph>
        </Stack>
        <Button onClick={requestClose}>Close</Button>
      </Stack>
      {/* {toast} */}
    </>
  )
}
