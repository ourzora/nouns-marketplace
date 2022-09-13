import { DataTable } from '@shared'
// import { useToast } from '@shared/hooks/useToast'
import {
  // CopyStatus,
  useCopyToClipboard,
} from '@shared/hooks/useCopyToClipboard'
import { Button, Eyebrow, Heading, Paragraph, Separator, Stack } from '@zoralabs/zord'
import React from 'react'
import { useFormattedPrivateAskInfo } from '../hooks/'

import { LearnMoreButton } from '../LearnMoreButton'
import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'

interface PrivateAskCreateSuccessProps extends CommonPrivateAskComponentProps {}

export function PrivateAskCreateSuccess({
  nft,
  onNext,
  ...props
}: PrivateAskCreateSuccessProps) {
  // const { toast, showToast } = useToast()
  const { formattedAskDetails, copyableValue } = useFormattedPrivateAskInfo({ nft })

  const [
    // status,
    _,
    handleCopy,
  ] = useCopyToClipboard(copyableValue)
  // const copied = status === CopyStatus.COPIED

  // useEffect(() => {
  //   if (copied) {
  //     showToast('Address copied to clipboard')
  //   }
  // }, [copied, showToast])

  return (
    <>
      <Stack gap="x6">
        <Heading size="xs">Private Listing Created</Heading>

        <Stack gap="x3">
          <Eyebrow>Sale data</Eyebrow>
          <DataTable items={formattedAskDetails} />
        </Stack>

        <Button variant="secondary" onClick={handleCopy}>
          Copy All Data
        </Button>

        <Paragraph size="sm" color="text3" align="center">
          You can copy all data later from the NFT page
        </Paragraph>

        <Separator my="x1" />

        <Button onClick={onNext}>Done</Button>

        <LearnMoreButton>Learn more about private listings</LearnMoreButton>
      </Stack>
      {/* {toast} */}
    </>
  )
}
