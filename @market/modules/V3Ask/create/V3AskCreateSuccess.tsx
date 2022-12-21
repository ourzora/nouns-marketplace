import React, { useEffect, useMemo } from 'react'

import { SuccessCheckmark } from '@market/components/SuccessCheckmark'
import { useCopyToClipboard } from '@shared'
import { useToast } from '@toast'
import { ToastStatus, ToastVariant } from '@toast/toastReducer'
import { Button, Stack } from '@zord'

import { CommonV3AskComponentProps } from '../V3AskFlow'
import { V3AskHeadingDescription } from '../V3AskHeadingDescription'
import { PRIVATE_ASK } from '../hooks/useV3AskTransaction'
import { useV3AskStateContext } from '../providers'

interface V3AskCreateSuccessProps extends CommonV3AskComponentProps {}

const privateAskCopy = {
  heading: 'Private Listing Created',
  desc: 'This listing is now available to the buyer.',
}
const v3AskCopy = {
  heading: 'Listing Created',
  desc: 'This listing is now available to buyers.',
}

export function V3AskCreateSuccess({
  nft: nftObj,
  onNext,
  ...props
}: V3AskCreateSuccessProps) {
  const { nft } = nftObj
  const askURL = `https://noun.market/collections/${nft?.contract.address}/${nft?.tokenId}`
  const [_, copied, copy] = useCopyToClipboard(askURL)
  const { toastDispatch } = useToast()
  const { state } = useV3AskStateContext()
  const headDesc = useMemo(
    () => (state.flow === PRIVATE_ASK ? privateAskCopy : v3AskCopy),
    [state.flow]
  )

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
      <V3AskHeadingDescription heading={headDesc.heading} description={headDesc.desc} />
      <Stack gap="x2">
        <Button variant="secondary" onClick={copy}>
          Copy Listing URL
        </Button>
        <Button onClick={onNext}>Done</Button>
      </Stack>
    </Stack>
  )
}
