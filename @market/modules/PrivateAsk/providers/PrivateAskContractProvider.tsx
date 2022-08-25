import React, { createContext, useEffect, useState, useContext } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { AsksPrivateEth as AsksPrivateEthInterface } from '@zoralabs/v3/dist/typechain/AsksPrivateEth'
import { AsksPrivateEth__factory } from '@zoralabs/v3/dist/typechain/factories/AsksPrivateEth__factory'
import { ZoraModuleManager as ZoraModuleManagerInterface } from '@zoralabs/v3/dist/typechain/ZoraModuleManager'
import { ZoraModuleManager__factory as ModuleManagerFactory } from '@zoralabs/v3/dist/typechain/factories/ZoraModuleManager__factory'
import { MODULE_MANAGER_ADDRESS, PRIVATE_ASKS_ADDRESS, defaultProvider } from '@shared'

const defaultModuleManager = ModuleManagerFactory.connect(
  MODULE_MANAGER_ADDRESS,
  defaultProvider
)

const defaultPrivateAsks = AsksPrivateEth__factory.connect(
  PRIVATE_ASKS_ADDRESS,
  defaultProvider
)

export type PrivateAskContractContext = {
  ModuleManager: ZoraModuleManagerInterface
  PrivateAsks: AsksPrivateEthInterface
  isReadOnly: boolean
}

export const PrivateAskContractCtx = createContext<PrivateAskContractContext>({
  ModuleManager: defaultModuleManager,
  PrivateAsks: defaultPrivateAsks,
  isReadOnly: true,
})

export function usePrivateAskContractContext(): PrivateAskContractContext {
  return useContext(PrivateAskContractCtx)
}

const PrivateAskContractProvider: React.FC = ({ children }) => {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false)

  const [ModuleManager, setModuleManager] =
    useState<ZoraModuleManagerInterface>(defaultModuleManager)
  const [PrivateAsks, setPrivateAsks] =
    useState<AsksPrivateEthInterface>(defaultPrivateAsks)

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
      const authorizedPrivateAsks = AsksPrivateEth__factory.connect(
        PRIVATE_ASKS_ADDRESS,
        signer
      )
      setPrivateAsks(authorizedPrivateAsks)
      setIsReadOnly(false)
    }
  }, [signer, address])

  useEffect(() => {
    if (!address && !isReadOnly) {
      setModuleManager(defaultModuleManager)
      setPrivateAsks(defaultPrivateAsks)
      setIsReadOnly(true)
    }
  }, [address, isReadOnly])

  return (
    <PrivateAskContractCtx.Provider
      value={{
        ModuleManager,
        PrivateAsks,
        isReadOnly,
      }}
    >
      {children}
    </PrivateAskContractCtx.Provider>
  )
}

export { PrivateAskContractProvider }
