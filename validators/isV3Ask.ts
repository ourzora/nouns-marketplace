import { V3Ask } from 'types/zora.api.generated'

import { useToken } from 'hooks/useToken'

export const isV3Ask = (
  market: ReturnType<typeof useToken>['markets'][0]['properties']
): market is V3Ask => {
  return market?.__typename === 'V3Ask'
}
