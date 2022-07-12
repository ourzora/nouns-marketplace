import { AsksV1 as AsksV1Interface } from '@zoralabs/v3/dist/typechain/AsksV1'
import { AsksV11 as AsksV11Interface } from '@zoralabs/v3/dist/typechain/AsksV11'
import { ZoraModuleManager as ZoraModuleManagerInterface } from '@zoralabs/v3/dist/typechain/ZoraModuleManager'
import { AsksV1__factory } from '@zoralabs/v3/dist/typechain/factories/AsksV1__factory'
import { AsksV11__factory } from '@zoralabs/v3/dist/typechain/factories/AsksV11__factory'
import { ZoraModuleManager__factory as ModuleManagerFactory } from '@zoralabs/v3/dist/typechain/factories/ZoraModuleManager__factory'
import React, { createContext, useEffect, useState, useCallback } from 'react'
import {
  ASKS_V11_ADDRESS,
  MODULE_MANAGER_ADDRESS,
  VULNERABLE_ASKS_V1_ADDRESS,
} from '../utils/addresses'
import { defaultProvider } from '../utils/connectors'
import { useAccount, useSigner } from 'wagmi'

const defaultModuleManager = ModuleManagerFactory.connect(
  MODULE_MANAGER_ADDRESS,
  defaultProvider
)
const defaultAsksV11 = AsksV11__factory.connect(ASKS_V11_ADDRESS, defaultProvider)
const defaultAsksV1 = AsksV1__factory.connect(VULNERABLE_ASKS_V1_ADDRESS, defaultProvider)

export type V3ContractContext = {
  ModuleManager: ZoraModuleManagerInterface
  AsksV11: AsksV11Interface
  AsksV1: AsksV1Interface
  isReadOnly: boolean
}

export const V3ContractCtx = createContext<V3ContractContext>({
  ModuleManager: defaultModuleManager,
  AsksV11: defaultAsksV11,
  AsksV1: defaultAsksV1,
  isReadOnly: true,
})

const V3Provider: React.FC = ({ children }) => {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false)

  const [ModuleManager, setModuleManager] =
    useState<ZoraModuleManagerInterface>(defaultModuleManager)
  const [AsksV11, setAsksV11] = useState<AsksV11Interface>(defaultAsksV11)
  const [AsksV1, setAsksV1] = useState<AsksV1Interface>(defaultAsksV1)

  useEffect(() => {
    if (!signer || !address) {
      return
    }

    if (address && signer) {
      const authorisedModuleManager = ModuleManagerFactory.connect(
        MODULE_MANAGER_ADDRESS,
        signer
      )
      setModuleManager(authorisedModuleManager)
      const authorisedAsksV11 = AsksV11__factory.connect(ASKS_V11_ADDRESS, signer)
      const authorisedAsksV1 = AsksV1__factory.connect(VULNERABLE_ASKS_V1_ADDRESS, signer)
      setAsksV11(authorisedAsksV11)
      setAsksV1(authorisedAsksV1)
      setIsReadOnly(false)
    }
  }, [signer, address])

  return (
    <V3ContractCtx.Provider
      value={{
        ModuleManager,
        AsksV11,
        AsksV1,
        isReadOnly,
      }}
    >
      {children}
    </V3ContractCtx.Provider>
  )
}

export { V3Provider }
