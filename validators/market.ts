import { useToken } from 'hooks/useToken'

export type TypeSafeMarket = ReturnType<typeof useToken>['markets'][0]
