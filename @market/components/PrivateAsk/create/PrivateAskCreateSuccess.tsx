import { useContractContext } from '@market/providers'
import { usePrivateAskContext } from '@market/providers/PrivateAskProvider'
import { DataTable, MotionStack, shortenAddress, useToast } from '@shared'
import { CopyStatus, useCopyToClipboard } from '@shared/hooks/useCopyToClipboard'
import { Button, Eyebrow, Heading, Paragraph, Separator, Stack } from '@zoralabs/zord'
import React, { useEffect, useMemo } from 'react'

import { LearnMoreButton } from '../LearnMoreButton'
import { CommonPrivateAskComponentProps } from '../PrivateAskModal'

// @TODO: Add ask details from private ask

interface PrivateAskCreateSuccessProps extends CommonPrivateAskComponentProps {}

export function PrivateAskCreateSuccess({
  nft: nftData,
  onNext,
  ...props
}: PrivateAskCreateSuccessProps) {
  const { PrivateAsks } = useContractContext() // Should this all be moved to usePrivateAskContext?
  const { finalizedPrivateAskDetails } = usePrivateAskContext()
  const { toast, showToast } = useToast()
  const { nft } = nftData

  console.log('finalizedPrivateAskDetails', finalizedPrivateAskDetails)

  const askDetails = useMemo(
    () => [
      {
        label: 'Private Asks contract address',
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
        value: shortenAddress(nft?.contract.address),
        copyValue: nft?.contract.address,
        url: {
          href: `https://etherscan.io/address/${nft?.contract.address}`,
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      {
        label: 'Token ID',
        value: nft?.tokenId,
        copyValue: nft?.tokenId,
        url: {
          href: `https://zora.co/collections/${nft?.contract.address}/${nft?.tokenId}`,
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      {
        label: 'Price',
        value: `${finalizedPrivateAskDetails?.price} ETH`,
        copyValue: `${finalizedPrivateAskDetails?.price} ETH`,
        url: {
          href: '',
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      {
        label: 'Buyer',
        value: shortenAddress(finalizedPrivateAskDetails?.buyerAddress),
        copyValue: finalizedPrivateAskDetails?.buyerAddress,
        url: {
          href: `https://zora.co/${finalizedPrivateAskDetails?.buyerAddress}`,
          target: '_blank',
          rel: 'noreferrer',
        },
        address: finalizedPrivateAskDetails?.buyerAddress,
      },
    ],
    [
      PrivateAsks.address,
      finalizedPrivateAskDetails?.price,
      finalizedPrivateAskDetails?.buyerAddress,
      nft?.contract.address,
      nft?.tokenId,
    ]
  )

  const copyValue = useMemo(
    () => askDetails.map(({ label, copyValue }) => `${label}: ${copyValue}`).join('\r\n'),
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
      {/* <Stack gap="x5"> */}
      <MotionStack
        gap="x5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
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
      </MotionStack>
      {/* </Stack> */}
      {toast}
    </>
  )
}
