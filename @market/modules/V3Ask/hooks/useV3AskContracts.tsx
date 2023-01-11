import { useAccount, useSigner } from 'wagmi'

import { useEffect, useState } from 'react'

import {
  ASKS_CORE_ETH_ADDRESS,
  MODULE_MANAGER_ADDRESS,
  PRIVATE_ASKS_ADDRESS,
  defaultProvider,
} from '@shared'
import { AsksCoreEth as AsksCoreEthInterface } from '@zoralabs/v3/dist/typechain/AsksCoreEth'
import { AsksPrivateEth as AsksPrivateEthInterface } from '@zoralabs/v3/dist/typechain/AsksPrivateEth'
import { ZoraModuleManager as ZoraModuleManagerInterface } from '@zoralabs/v3/dist/typechain/ZoraModuleManager'
import { AsksCoreEth__factory } from '@zoralabs/v3/dist/typechain/factories/AsksCoreEth__factory'
import { AsksPrivateEth__factory } from '@zoralabs/v3/dist/typechain/factories/AsksPrivateEth__factory'
import { ZoraModuleManager__factory as ModuleManagerFactory } from '@zoralabs/v3/dist/typechain/factories/ZoraModuleManager__factory'

const defaultModuleManager = ModuleManagerFactory.connect(
  MODULE_MANAGER_ADDRESS,
  defaultProvider
)

const defaultV3Asks = AsksCoreEth__factory.connect(ASKS_CORE_ETH_ADDRESS, defaultProvider)
const defaultPrivateAsks = AsksPrivateEth__factory.connect(
  PRIVATE_ASKS_ADDRESS,
  defaultProvider
)

export function useV3AskContracts() {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false)

  const [ModuleManager, setModuleManager] =
    useState<ZoraModuleManagerInterface>(defaultModuleManager)
  const [V3Asks, setV3Asks] = useState<AsksCoreEthInterface>(defaultV3Asks)
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
      const authorizedV3Asks = AsksCoreEth__factory.connect(ASKS_CORE_ETH_ADDRESS, signer)
      const authorizedPrivateAsks = AsksPrivateEth__factory.connect(
        PRIVATE_ASKS_ADDRESS,
        signer
      )
      setPrivateAsks(authorizedPrivateAsks)
      setV3Asks(authorizedV3Asks)
      setIsReadOnly(false)
    }
  }, [signer, address])

  useEffect(() => {
    if (!address && !isReadOnly) {
      setModuleManager(defaultModuleManager)
      setV3Asks(defaultV3Asks)
      setPrivateAsks(defaultPrivateAsks)
      setIsReadOnly(true)
    }
  }, [address, isReadOnly])

  return {
    ModuleManager,
    V3Asks,
    PrivateAsks,
    isReadOnly,
  }
}
