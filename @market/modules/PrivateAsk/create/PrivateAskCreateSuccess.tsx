import { DataTable, MotionStack, useToast } from '@shared'
import { CopyStatus, useCopyToClipboard } from '@shared/hooks/useCopyToClipboard'
import { Button, Eyebrow, Heading, Paragraph, Separator, Stack } from '@zoralabs/zord'
import React, { useEffect } from 'react'
import { useFormattedPrivateAskInfo } from '../hooks/useFormattedPrivateAskInfo'

import { LearnMoreButton } from '../LearnMoreButton'
import { CommonPrivateAskComponentProps } from '../PrivateAskModal'

interface PrivateAskCreateSuccessProps extends CommonPrivateAskComponentProps {}

export function PrivateAskCreateSuccess({
  nft,
  onNext,
  ...props
}: PrivateAskCreateSuccessProps) {
  const { toast, showToast } = useToast()
  const { formattedAskDetails, copyableValue } = useFormattedPrivateAskInfo({ nft })

  const [status, handleCopy] = useCopyToClipboard(copyableValue)
  const copied = status === CopyStatus.COPIED

  useEffect(() => {
    if (copied) {
      showToast('Address copied to clipboard')
    }
  }, [copied, showToast])

  return (
    <>
      {/* <MotionStack
        gap="x5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        {...props}
      > */}
      <Stack gap="x6">
        <Heading size="xs">Private Ask Created</Heading>

        <Stack gap="x3">
          <Eyebrow>Sale data</Eyebrow>
          <DataTable items={formattedAskDetails} />
        </Stack>

        <Button variant="secondary" onClick={handleCopy}>
          Copy All Data
        </Button>

        <Paragraph size="sm" color="tertiary" align="center">
          You can copy all data later from the NFT page
        </Paragraph>

        <Separator my="x1" />

        <Button onClick={onNext}>Done</Button>

        <LearnMoreButton>Learn more about private asks</LearnMoreButton>
        {/* </MotionStack> */}
      </Stack>
      {toast}
    </>
  )
}
