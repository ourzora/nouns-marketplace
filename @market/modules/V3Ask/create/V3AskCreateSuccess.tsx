import { Button } from 'components/Button'

import React, { useEffect } from 'react'

import { SuccessCheckmark } from '@market/components/SuccessCheckmark'
import { useCopyToClipboard } from '@shared'
import { useToast } from '@toast'
import { ToastStatus, ToastVariant } from '@toast/toastReducer'
import { Stack } from '@zoralabs/zord'

import { CommonV3AskComponentProps } from '../V3AskFlow'
import { V3AskHeadingDescription } from '../V3AskHeadingDescription'

interface V3AskCreateSuccessProps extends CommonV3AskComponentProps {}

export function V3AskCreateSuccess({
  nft: nftObj,
  onNext,
  ...props
}: V3AskCreateSuccessProps) {
  const { nft } = nftObj
  const askURL = `https://noun.market/collections/${nft?.contract.address}/${nft?.tokenId}`
  const [_, copied, copy] = useCopyToClipboard(askURL)
  const { toastDispatch } = useToast()

  useEffect(() => {
    if (copied) {
      toastDispatch({
        type: ToastStatus.REPLACE,
        item: {
          duration: 3500,
          description: 'Copied to clipboard.',
          variant: ToastVariant.SUCCESS,
        },
      })
    }
  }, [copied, toastDispatch])

  return (
    <Stack gap="x8" {...props}>
      <SuccessCheckmark />
      <V3AskHeadingDescription
        heading="Private Listing Created"
        description="This listing is now available to the buyer."
      />
      <Stack gap="x2">
        <Button variant="secondary" onClick={copy}>
          Copy Listing URL
        </Button>
        <Button onClick={onNext}>Done</Button>
      </Stack>
    </Stack>
  )
}
