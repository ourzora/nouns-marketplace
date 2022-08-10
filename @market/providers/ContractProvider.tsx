import React, { createContext, useEffect, useState, useContext } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { AsksV1_1 as AsksV11Interface } from '@zoralabs/v3/dist/typechain/AsksV1_1'
import { AsksV1_1__factory } from '@zoralabs/v3/dist/typechain/factories/AsksV1_1__factory'
import { ZoraModuleManager as ZoraModuleManagerInterface } from '@zoralabs/v3/dist/typechain/ZoraModuleManager'
import { ZoraModuleManager__factory as ModuleManagerFactory } from '@zoralabs/v3/dist/typechain/factories/ZoraModuleManager__factory'
import { ASKS_V11_ADDRESS, MODULE_MANAGER_ADDRESS, defaultProvider } from '@shared'

const defaultModuleManager = ModuleManagerFactory.connect(
  MODULE_MANAGER_ADDRESS,
  defaultProvider
)

const defaultAsksV11 = AsksV1_1__factory.connect(ASKS_V11_ADDRESS, defaultProvider)

export type ContractContext = {
  ModuleManager: ZoraModuleManagerInterface
  AsksV11: AsksV11Interface
  isReadOnly: boolean
}

export const ContractCtx = createContext<ContractContext>({
  ModuleManager: defaultModuleManager,
  AsksV11: defaultAsksV11,
  isReadOnly: true,
})

export function useContractContext(): ContractContext {
  return useContext(ContractCtx)
}

const ContractProvider: React.FC = ({ children }) => {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false)

  const [ModuleManager, setModuleManager] =
    useState<ZoraModuleManagerInterface>(defaultModuleManager)
  const [AsksV11, setAsksV11] = useState<AsksV11Interface>(defaultAsksV11)

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
      const authorisedAsksV11 = AsksV1_1__factory.connect(ASKS_V11_ADDRESS, signer)
      setAsksV11(authorisedAsksV11)
      setIsReadOnly(false)
    }
  }, [signer, address])

  useEffect(() => {
    if (!address && !isReadOnly) {
      setModuleManager(defaultModuleManager)
      setAsksV11(defaultAsksV11)
      setIsReadOnly(true)
    }
  }, [address, isReadOnly])

  return (
    <ContractCtx.Provider
      value={{
        ModuleManager,
        AsksV11,
        isReadOnly,
      }}
    >
      {children}
    </ContractCtx.Provider>
  )
}

export { ContractProvider }
