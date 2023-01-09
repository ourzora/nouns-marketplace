import { V3Ask } from 'types/zora.api.generated'

import { TypeSafeMarket } from './market'

export const isV3Ask = (market: TypeSafeMarket['properties']): market is V3Ask => {
  return market?.__typename === 'V3Ask'
}
