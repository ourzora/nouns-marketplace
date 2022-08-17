import { useContractContext } from '@market/providers'
import { usePrivateAskContext } from '@market/providers/PrivateAskProvider'
// import { DataTable, shortenAddress, useToast } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'
import {
  Button,
  // Eyebrow,
  Heading,
  Paragraph,
  // Separator,
  Stack,
  StackProps,
} from '@zoralabs/zord'
// import { MotionStack } from 'components/Motion'
import React, { useEffect } from 'react'

// import { LearnMoreButton } from './LearnMoreButton'

// @TODO: Add ask details from private ask

interface PrivateAskCancelSuccessProps extends StackProps {
  nft: NFTObject
  // onNext: () => void
  handleClose?: () => void
}

export function PrivateAskCancelSuccess({
  // onNext,
  handleClose,
  ...props
}: PrivateAskCancelSuccessProps) {
  const { PrivateAsks } = useContractContext() // Should this all be moved to usePrivateAskContext?
  // const { finalizedPrivateAskTx } = usePrivateAskContext()
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
