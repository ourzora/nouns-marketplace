import { Button } from 'components/Button'

import React, { useEffect } from 'react'

import { SuccessCheckmark } from '@market/components/SuccessCheckmark'
import { useCopyToClipboard } from '@shared'
import { useToast } from '@toast'
import { ToastStatus, ToastVariant } from '@toast/toastReducer'
import { Stack } from '@zoralabs/zord'

import { HeadingDescription } from '../HeadingDescription'
import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'

interface PrivateAskCreateSuccessProps extends CommonPrivateAskComponentProps {}

export function PrivateAskCreateSuccess({
  nft: nftObj,
  onNext,
  ...props
}: PrivateAskCreateSuccessProps) {
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
      <HeadingDescription
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
