import { Button } from 'components/Button'

import React, { useEffect } from 'react'

import { useModal } from '@modal'
import { DataTable } from '@shared/components/DataTable'
import { useCopyToClipboard } from '@shared/hooks/useCopyToClipboard'
import { useToast } from '@toast'
import { ToastStatus, ToastVariant } from '@toast/toastReducer'
import {
  // Button,
  Heading,
  Stack,
} from '@zoralabs/zord'

import { CommonPrivateAskComponentProps } from '../PrivateAskFlow'
import { useFormattedPrivateAskInfo } from '../hooks'

interface PrivateAskFillAskSuccessProps extends CommonPrivateAskComponentProps {}

export function PrivateAskViewListing({ nft, ...props }: PrivateAskFillAskSuccessProps) {
  const { requestClose } = useModal()
  const { formattedAskDetails, copyableValue } = useFormattedPrivateAskInfo({ nft })

  const [_, copied, copy] = useCopyToClipboard(copyableValue)
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
    <>
      <Stack gap="x8">
        <Heading as="h2">Private Listing Data</Heading>

        {formattedAskDetails && <DataTable items={formattedAskDetails} />}

        <Stack gap="x3" borderRadius="curved">
          <Button onClick={copy}>Copy Listing Data</Button>

          <Button variant="secondary" onClick={requestClose}>
            Close
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
