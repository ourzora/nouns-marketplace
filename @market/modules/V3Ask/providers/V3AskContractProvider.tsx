import { useAccount, useSigner } from 'wagmi'

import React, { createContext, useContext, useEffect, useState } from 'react'

import { ASKS_V11_ADDRESS, MODULE_MANAGER_ADDRESS, defaultProvider } from '@shared'
import { AsksPrivateEth as AsksPrivateEthInterface } from '@zoralabs/v3/dist/typechain/AsksPrivateEth'
import { ZoraModuleManager as ZoraModuleManagerInterface } from '@zoralabs/v3/dist/typechain/ZoraModuleManager'
import { AsksPrivateEth__factory } from '@zoralabs/v3/dist/typechain/factories/AsksPrivateEth__factory'
import { ZoraModuleManager__factory as ModuleManagerFactory } from '@zoralabs/v3/dist/typechain/factories/ZoraModuleManager__factory'

const defaultModuleManager = ModuleManagerFactory.connect(
  MODULE_MANAGER_ADDRESS,
  defaultProvider
)

const defaultV3Asks = AsksPrivateEth__factory.connect(ASKS_V11_ADDRESS, defaultProvider)

export type V3AskContractContext = {
  ModuleManager: ZoraModuleManagerInterface
  V3Asks: AsksPrivateEthInterface
  isReadOnly: boolean
}

export const V3AskContractCtx = createContext<V3AskContractContext>({
  ModuleManager: defaultModuleManager,
  V3Asks: defaultV3Asks,
  isReadOnly: true,
})

export function useV3AskContractContext(): V3AskContractContext {
  return useContext(V3AskContractCtx)
}

const V3AskContractProvider: React.FC = ({ children }) => {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false)

  const [ModuleManager, setModuleManager] =
    useState<ZoraModuleManagerInterface>(defaultModuleManager)
  const [V3Asks, setV3Asks] = useState<AsksPrivateEthInterface>(defaultV3Asks)

  useEffect(() => {
    if (!signer) {
      return
    }
    if (address && signer) {
      const authorisedModuleManager = ModuleManagerFactory.connect(
        MODULE_MANAGER_ADDRESS,
        signer
      )
      setModuleManager(authorisedModuleManager)
      const authorizedV3Asks = AsksPrivateEth__factory.connect(ASKS_V11_ADDRESS, signer)
      setV3Asks(authorizedV3Asks)
      setIsReadOnly(false)
    }
  }, [signer, address])

  useEffect(() => {
    if (!address && !isReadOnly) {
      setModuleManager(defaultModuleManager)
      setV3Asks(defaultV3Asks)
      setIsReadOnly(true)
    }
  }, [address, isReadOnly])

  return (
    <V3AskContractCtx.Provider
      value={{
        ModuleManager,
        V3Asks,
        isReadOnly,
      }}
    >
      {children}
    </V3AskContractCtx.Provider>
  )
}

export { V3AskContractProvider }
