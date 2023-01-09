import { FlexProps, Stack } from '@zoralabs/zord'

import { UniversalListAskModal } from './UniversalListAskModal'
import { V3AskStateProvider } from './providers/V3AskStateProvider'

export interface UniversalAskModalProps extends FlexProps {}

export function UniversalListAskFlow({ className, ...props }: UniversalAskModalProps) {
  return (
    <V3AskStateProvider>
      <Stack
        {...props}
        flex={1}
        justify="flex-end"
        className={['zora-universal-list-ask-flow', className]}
      >
        <UniversalListAskModal />
      </Stack>
    </V3AskStateProvider>
  )
}
