import { NFTObject } from '@zoralabs/nft-hooks'
import { FlexProps, Stack } from '@zord'

import { UniversalListAskModal } from './UniversalListAskModal'
import { V3AskStateProvider } from './providers/V3AskStateProvider'

export interface UniversalAskModalProps extends FlexProps {
  nftObj: NFTObject
}

export function UniversalListAskFlow({
  nftObj,
  className,
  ...props
}: UniversalAskModalProps) {
  const { nft } = nftObj

  if (!nft) {
    return null
  }

  return (
    <V3AskStateProvider>
      <Stack
        {...props}
        flex={1}
        justify="flex-end"
        className={['zora-universal-list-ask-flow', className]}
      >
        <UniversalListAskModal nftObj={nftObj} />
      </Stack>
    </V3AskStateProvider>
  )
}
