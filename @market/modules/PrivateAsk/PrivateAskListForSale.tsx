import React from 'react'
import { Eyebrow, Stack } from '@zoralabs/zord'

import * as styles from './PrivateAskFlow.css'
import { LearnMoreButton } from './LearnMoreButton'
import { CommonPrivateAskComponentProps } from './PrivateAskModal'
import { SaleTypeButton } from './SaleTypeButton'

interface PrivateAskListForSaleProps extends CommonPrivateAskComponentProps {}

export function PrivateAskListForSale({ onNext, ...props }: PrivateAskListForSaleProps) {
  return (
    <Stack gap="x5" {...props}>
      <Stack gap="x2">
        <Eyebrow>Sale type</Eyebrow>
        <SaleTypeButton
          label="Fixed Price"
          description="Sell for a fixed price. Anyone can buy the NFT."
          tag="New"
          onNext={onNext}
        />
        <SaleTypeButton
          label="Private Listing"
          description="Sell to a specific buyer. It's like an escrow contract but much better."
          tag="New"
          onNext={onNext}
        />
      </Stack>
      <LearnMoreButton
        href="https://support.zora.co/en/articles/5878598-what-s-an-approval"
        target="_blank"
      />
    </Stack>
  )
}
