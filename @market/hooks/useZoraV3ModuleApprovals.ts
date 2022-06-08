import { useZoraV3ModuleApproval } from './useZoraV3ModuleApproval'
import { ASKS_V11_ADDRESS } from '@market/utils/addresses'

/**
 * Hook to fetch approval status for active zora V3 modules
 */
export function useZoraV3ModuleApprovals() {
  const { approved: asksV1 } = useZoraV3ModuleApproval(ASKS_V11_ADDRESS)

  return {
    asksV1,
  }
}
