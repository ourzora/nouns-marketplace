import { AsksV1_1 as AsksV11Interface } from '@zoralabs/v3/dist/typechain/AsksV1_1'
import { ZoraModuleManager as ZoraModuleManagerInterface } from '@zoralabs/v3/dist/typechain/ZoraModuleManager'
// import { AsksPrivateEth as AsksPrivateEthInterface } from '@zoralabs/v3/dist/typechain/AsksPrivateEth'
import { AsksV1_1__factory } from '@zoralabs/v3/dist/typechain/factories/AsksV1_1__factory'
// import { AsksPrivateEth__factory } from '@zoralabs/v3/dist/typechain/factories/AsksPrivateEth__factory'
import { ZoraModuleManager__factory as ModuleManagerFactory } from '@zoralabs/v3/dist/typechain/factories/ZoraModuleManager__factory'
import React, { createContext, useEffect, useState, useCallback } from 'react'
import {
  ASKS_V11_ADDRESS,
  MODULE_MANAGER_ADDRESS,
  PRIVATE_ASKS_ADDRESS,
} from '../utils/addresses'
import { defaultProvider } from '../utils/connectors'
import { useAccount, useSigner } from 'wagmi'

const defaultModuleManager = ModuleManagerFactory.connect(
  MODULE_MANAGER_ADDRESS,
  defaultProvider
)
const defaultAsksV11 = AsksV1_1__factory.connect(ASKS_V11_ADDRESS, defaultProvider)
// const defaultPrivateAsks = AsksPrivateEth__factory.connect(
//   PRIVATE_ASKS_ADDRESS,
//   defaultProvider
// )

export type V3ContractContext = {
  ModuleManager: ZoraModuleManagerInterface
  AsksV11: AsksV11Interface
  // PrivateAsks: AsksPrivateEthInterface
  isReadOnly: boolean
}

export const V3ContractCtx = createContext<V3ContractContext>({
  ModuleManager: defaultModuleManager,
  AsksV11: defaultAsksV11,
  // PrivateAsks: defaultPrivateAsks,
  isReadOnly: true,
})

const V3Provider: React.FC = ({ children }) => {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false)

  const [ModuleManager, setModuleManager] =
    useState<ZoraModuleManagerInterface>(defaultModuleManager)
  const [AsksV11, setAsksV11] = useState<AsksV11Interface>(defaultAsksV11)
  // const [PrivateAsks, setPrivateAsks] =
  //   useState<AsksPrivateEthInterface>(defaultPrivateAsks)

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
      const authorisedAsksV11 = AsksV1_1__factory.connect(ASKS_V11_ADDRESS, signer)
      // const authorizedPrivateAsks = AsksPrivateEth__factory.connect(
      //   PRIVATE_ASKS_ADDRESS,
      //   signer
      // )
      setAsksV11(authorisedAsksV11)
      // setPrivateAsks(authorizedPrivateAsks)
      setIsReadOnly(false)
    }
  }, [signer, address])

  return (
    <V3ContractCtx.Provider
      value={{
        ModuleManager,
        AsksV11,
        // PrivateAsks,
        isReadOnly,
      }}
    >
      {children}
    </V3ContractCtx.Provider>
  )
}

export { V3Provider }
