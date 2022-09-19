import { useModal } from '@modal'
import { Button, Heading, Paragraph, Stack } from '@zoralabs/zord'
import React from 'react'
import { HeadlineDescription } from '../HeadlineDescription'
import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'
import { SuccessCheckmark } from '@market/components/SuccessCheckmark'

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
      <Stack gap="x8">
        <SuccessCheckmark />

        <HeadlineDescription
          heading="Private Purchase Completed"
          description="Find this NFT in your collection soon."
        />

        <Button variant="secondary" onClick={requestClose}>
          Close
        </Button>
      </Stack>

      {/* {toast} */}
    </>
  )
}
