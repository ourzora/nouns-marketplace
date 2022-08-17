import { useContractContext } from '@market/providers'
import { usePrivateAskContext } from '@market/providers/PrivateAskProvider'
import { DataTable, shortenAddress, useToast } from '@shared'
import { CopyStatus, useCopyToClipboard } from '@shared/hooks/useCopyToClipboard'
import { NFTObject } from '@zoralabs/nft-hooks'
import {
  Button,
  Eyebrow,
  Heading,
  Paragraph,
  Separator,
  Stack,
  StackProps,
} from '@zoralabs/zord'
// import { MotionStack } from 'components/Motion'
import React, { useEffect, useMemo } from 'react'

import { LearnMoreButton } from './LearnMoreButton'

// @TODO: Add ask details from private ask

interface PrivateAskSuccessProps extends StackProps {
  nft: NFTObject
  onNext: () => void
}

export function PrivateAskSuccess({ onNext, ...props }: PrivateAskSuccessProps) {
  const { PrivateAsks } = useContractContext() // Should this all be moved to usePrivateAskContext?
  const { finalizedPrivateAskTx } = usePrivateAskContext()
  const { toast, showToast } = useToast()

  console.log('finalizedPrivateAskTx', finalizedPrivateAskTx)

  const askDetails = useMemo(
    () => [
      {
        label: 'Private asks contract address',
        value: shortenAddress(PrivateAsks.address),
        copyValue: PrivateAsks.address,
        url: {
          href: `https://etherscan.io/address/${PrivateAsks.address}`,
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      {
        label: 'Token contract',
        value: '0х44J8...GHH7',
        copyValue: '0х44J8...GHH7',
        url: {
          href: 'https://zora.co',
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      {
        label: 'Token ID',
        value: '0х24O8...JKQ9',
        copyValue: '0х24O8...JKQ9',
        url: {
          href: 'https://zora.co',
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      {
        label: 'Price',
        value: '3 ETH',
        copyValue: '3 ETH',
        url: {
          href: '',
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      {
        label: 'Buyer',
        value: 'miley7777.eth',
        copyValue: 'miley7777.eth',
        url: {
          href: 'https://zora.co',
          target: '_blank',
          rel: 'noreferrer',
        },
        address: '0x17cd072cBd45031EFc21Da538c783E0ed3b25DCc',
      },
    ],
    []
  )

  const copyValue = useMemo(
    () => askDetails.map(({ label, value }) => `${label}: ${value}`).join('\r\n'),
    [askDetails]
  )

  const [status, handleCopy] = useCopyToClipboard(copyValue)
  const copied = status === CopyStatus.COPIED

  useEffect(() => {
    if (copied) {
      showToast('Address copied to clipboard')
    }
  }, [copied, showToast])

  return (
    <>
      <Stack gap="x5">
        {/* <MotionStack
        gap="x5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        {...props}
      > */}
        <Heading size="xs">Private Ask Created</Heading>

        <Stack gap="x3">
          <Eyebrow>Sale data</Eyebrow>

          <DataTable items={askDetails} />
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
