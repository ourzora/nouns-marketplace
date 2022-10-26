import { useMemo } from 'react'
import { TypeSafeToken } from 'validators/token'

import { FillV3AskModal } from '@market/components/FillV3AskModal'
import { useAskHelper, useRelevantMarket } from '@market/hooks'
import { PrivateAskSidebar } from '@market/modules/PrivateAsk/PrivateAskSidebar'
import { UniversalListAskModal } from '@market/modules/PrivateAsk/UniversalListAskModal'
import { useIsOwner } from '@shared/hooks/useIsOwner'
import { FlexProps } from '@zoralabs/zord'

export interface NFTAskProps extends FlexProps {
  token: TypeSafeToken
}

export function NFTAsks({ token, ...props }: NFTAskProps) {
  const { markets } = token
  const { ask } = useRelevantMarket(markets)
  const { isOwner } = useIsOwner(token)
  const { hasRelevantAsk, isPrivateAsk } = useAskHelper({ ask })

  const marketComponent = useMemo(() => {
    if (hasRelevantAsk) {
      return isPrivateAsk ? (
        <PrivateAskSidebar token={token} borderRadius="phat" />
      ) : (
        <FillV3AskModal token={token} {...props} />
      )
    }

    if (isOwner) return <UniversalListAskModal token={token} />

    return null
  }, [hasRelevantAsk, isOwner, isPrivateAsk, token, props])

  return token ? marketComponent : null
}
