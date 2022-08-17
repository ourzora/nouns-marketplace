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
import { ethers } from 'ethers'
// import { MotionStack } from 'components/Motion'
import React, { useEffect, useMemo } from 'react'

import { LearnMoreButton } from './LearnMoreButton'

// @TODO: Add ask details from private ask

interface PrivateAskSuccessProps extends StackProps {
  nft: NFTObject
  onNext: () => void
}

export function PrivateAskSuccess({
  nft: nftData,
  onNext,
  ...props
}: PrivateAskSuccessProps) {
  const { PrivateAsks } = useContractContext() // Should this all be moved to usePrivateAskContext?
  const { finalizedPrivateAskTx } = usePrivateAskContext()
  const { toast, showToast } = useToast()
  // const askPrice = useMemo(
  //   () =>
  //     finalizedPrivateAskTx
  //       ? ethers.utils.formatUnits(finalizedPrivateAskTx?.value, 'ether')
  //       : 'UNKNOWN TX VAL',
  //   [finalizedPrivateAskTx]
  // )
  const { nft } = nftData

  console.log('finalizedPrivateAskTx', finalizedPrivateAskTx)

  // finalizedPrivateAskTx?.to

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
        value: finalizedPrivateAskTx?.price,
        copyValue: finalizedPrivateAskTx?.price,
        url: {
          href: '',
          target: '_blank',
          rel: 'noreferrer',
        },
      },
      {
        label: 'Buyer',
        value: shortenAddress(finalizedPrivateAskTx?.buyerAddress),
        copyValue: finalizedPrivateAskTx?.buyerAddress,
        url: {
          href: `https://zora.co/${finalizedPrivateAskTx?.buyerAddress}`,
          target: '_blank',
          rel: 'noreferrer',
        },
        address: finalizedPrivateAskTx?.buyerAddress,
      },
    ],
    [
      PrivateAsks.address,
      finalizedPrivateAskTx?.price,
      finalizedPrivateAskTx?.buyerAddress,
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
