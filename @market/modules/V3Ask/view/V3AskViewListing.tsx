import React, { useEffect } from 'react'

import { useModal } from '@modal'
import { DataTable } from '@shared/components/DataTable'
import { useCopyToClipboard } from '@shared/hooks/useCopyToClipboard'
import { useToast } from '@toast'
import { ToastStatus, ToastVariant } from '@toast/toastReducer'
import { Button, Heading, Stack } from '@zord'

import { CommonV3AskComponentProps } from '../V3AskFlow'
import { useFormattedV3AskInfo } from '../hooks'

interface V3AskFillAskSuccessProps extends CommonV3AskComponentProps {}

export function V3AskViewListing({ nft, ...props }: V3AskFillAskSuccessProps) {
  const { requestClose } = useModal()
  const { formattedAskDetails, copyableValue } = useFormattedV3AskInfo({ nft })

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
