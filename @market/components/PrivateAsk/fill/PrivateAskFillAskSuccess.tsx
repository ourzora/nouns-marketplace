import { useContractContext } from '@market/providers'
import { usePrivateAskContext } from '@market/providers/PrivateAskProvider'
// import { DataTable, shortenAddress, useToast } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Button, Heading, Paragraph, Stack, StackProps } from '@zoralabs/zord'
// import { MotionStack } from 'components/Motion'
import React, { useEffect } from 'react'
import { CommonPrivateAskComponentProps } from '../PrivateAskModal'

// import { LearnMoreButton } from './LearnMoreButton'

// @TODO: Add ask details from private ask

interface PrivateAskFillAskSuccessProps extends CommonPrivateAskComponentProps {}

export function PrivateAskFillAskSuccess({
  // onNext,
  handleClose,
  ...props
}: PrivateAskFillAskSuccessProps) {
  const { PrivateAsks } = useContractContext() // Should this all be moved to usePrivateAskContext?
  // const { finalizedPrivateAskDetails } = usePrivateAskContext()
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
