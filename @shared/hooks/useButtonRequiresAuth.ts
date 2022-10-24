import { useMemo } from 'react'

import { useConnectModal } from '@rainbow-me/rainbowkit'

import { useAuth } from './useAuth'

// If user isn't connected, adjust button behavior to open connect modal
// If user is connected, use specified buttonAction
export const useButtonRequiresAuth = (
  buttonAction: (() => void) | undefined
): (() => void) | undefined => {
  const { address } = useAuth()
  const { openConnectModal } = useConnectModal()
  const buttonBehavior = useMemo(
    () => (!address ? openConnectModal : buttonAction),
    [address, openConnectModal, buttonAction]
  )
  return buttonBehavior
}
