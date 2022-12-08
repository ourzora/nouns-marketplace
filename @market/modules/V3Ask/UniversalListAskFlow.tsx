import { useToken } from 'hooks/useToken'

import { FlexProps, Stack } from '@zoralabs/zord'

import { UniversalListAskModal } from './UniversalListAskModal'
import { V3AskStateProvider } from './providers/V3AskStateProvider'

export interface UniversalAskModalProps extends FlexProps {
  tokenId: string
  contractAddress: string
  collectionName: string
  markets: ReturnType<typeof useToken>['markets']
}

export function UniversalListAskFlow({
  tokenId,
  contractAddress,
  collectionName,
  markets,
  className,
  ...props
}: UniversalAskModalProps) {
  return (
    <V3AskStateProvider>
      <Stack
        {...props}
        flex={1}
        justify="flex-end"
        className={['zora-universal-list-ask-flow', className]}
      >
        <UniversalListAskModal
          tokenId={tokenId}
          contractAddress={contractAddress}
          collectionName={collectionName}
          markets={markets}
        />
      </Stack>
    </V3AskStateProvider>
  )
}
