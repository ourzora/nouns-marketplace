import { Button, Stack } from '@zoralabs/zord'
import React, { useEffect } from 'react'
import { HeadingDescription } from '../HeadingDescription'
import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'
import { SuccessCheckmark } from '@market/components/SuccessCheckmark'
import { useCopyToClipboard } from '@shared'
import { useToast } from '@toast'
import { ToastStatus, ToastVariant } from '@toast/toastReducer'

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
        <Button variant="secondary" onClick={copy} borderRadius="curved">
          Copy Listing URL
        </Button>
        <Button onClick={onNext} borderRadius="curved">
          Done
        </Button>
      </Stack>
    </Stack>
  )
}
