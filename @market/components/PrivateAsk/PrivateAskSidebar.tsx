import { useRelevantMarket } from '@market/hooks'
import { useAskTokenHelper } from '@market/hooks/useAskTokenHelper'
import { PrivateAskProvider } from '@market/providers/PrivateAskProvider'
import { useIsOwner } from '@shared'
import { NFTObject } from '@zoralabs/nft-hooks'
import { Stack, StackProps } from '@zoralabs/zord'
import { NounsGlasses } from 'components'
import React from 'react'
import { PrivateAskModal } from './PrivateAskModal'

import * as styles from './PrivateAskSidebar.css'

interface PrivateAskSidebarProps extends StackProps {
  nft: NFTObject
}

export function PrivateAskSidebar({ nft, ...props }: PrivateAskSidebarProps) {
  // Create (owner)
  // Update (owner)
  // Cancel (owner)
  // Fill (buyer)

  const { ask } = useRelevantMarket(nft.markets)
  const { hasActiveAsk, isPrivateAsk, hasAsk } = useAskTokenHelper({ ask })
  const { isOwner } = useIsOwner(nft)

  return (
    <Stack {...props}>
      <PrivateAskProvider>
        {isOwner ? (
          <PrivateAskModal nft={nft} header={<NounsGlasses w="x13" mb="x4" mt="x1" />} />
        ) : (
          <>PRIVATE ASK SIDERBAR: NOT OWNER</>
        )}
      </PrivateAskProvider>
    </Stack>
  )
}
