import React from 'react'
import { Button, Heading, Paragraph, Stack } from '@zoralabs/zord'
import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'
import { useModal } from '@modal'

interface PrivateAskCancelSuccessProps extends CommonPrivateAskComponentProps {}
export function PrivateAskCancelSuccess({ ...props }: PrivateAskCancelSuccessProps) {
  const { requestClose } = useModal()

  // useEffect(() => {
  //   // if (copied) {
  //   showToast('Cancelled')
  //   // }
  // }, [showToast])

  return (
    <>
      <Stack gap="x5">
        <Stack gap="x2">
          <Heading size="xs">Private Listing Cancelled</Heading>

          <Paragraph size="sm">
            The sale will no longer be available to the buyer.
          </Paragraph>
        </Stack>
        <Button onClick={requestClose}>Close</Button>
      </Stack>
      {/* {toast} */}
    </>
  )
}
