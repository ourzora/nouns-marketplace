import { AsksV1 as AsksV1Interface } from '@zoralabs/v3/dist/typechain/AsksV1'
import { AsksV11 as AsksV11Interface } from '@zoralabs/v3/dist/typechain/AsksV11'
import { ZoraModuleManager as ZoraModuleManagerInterface } from '@zoralabs/v3/dist/typechain/ZoraModuleManager'
import { AsksV1__factory } from '@zoralabs/v3/dist/typechain/factories/AsksV1__factory'
import { AsksV11__factory } from '@zoralabs/v3/dist/typechain/factories/AsksV11__factory'
import { ZoraModuleManager__factory as ModuleManagerFactory } from '@zoralabs/v3/dist/typechain/factories/ZoraModuleManager__factory'
import React, { createContext, useEffect, useState } from 'react'
import {
  ASKS_V11_ADDRESS,
  AUCTION_HOUSE_ADDRESS,
  MODULE_MANAGER_ADDRESS,
  VULNERABLE_ASKS_V1_ADDRESS,
  ZORA_MARKET_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} from '@market/utils/addresses'
import { defaultProvider } from '@market/utils/connectors'
import { useAccount, useSigner } from 'wagmi'
import {
  AuctionHouse,
  AuctionHouse__factory,
} from '@zoralabs/auction-house/dist/typechain'
import { Market, MarketFactory, Media, MediaFactory } from '@zoralabs/core/dist/typechain'

const defaultModuleManager = ModuleManagerFactory.connect(
  MODULE_MANAGER_ADDRESS,
  defaultProvider
)
const defaultAuctionHouse = AuctionHouse__factory.connect(
  AUCTION_HOUSE_ADDRESS,
  defaultProvider
)
const defaultAsksV11 = AsksV11__factory.connect(ASKS_V11_ADDRESS, defaultProvider)
const defaultAsksV1 = AsksV1__factory.connect(VULNERABLE_ASKS_V1_ADDRESS, defaultProvider)
const defaultZoraMedia = MediaFactory.connect(ZORA_TOKEN_ADDRESS, defaultProvider)
const defaultZoraMarket = MarketFactory.connect(ZORA_MARKET_ADDRESS, defaultProvider)

export type ContractContext = {
  ModuleManager: ZoraModuleManagerInterface
  AsksV11: AsksV11Interface
  AsksV1: AsksV1Interface
  AuctionHouse: AuctionHouse
  ZoraMedia: Media
  ZoraMarket: Market
  isReadOnly: boolean
}

export const ContractCtx = createContext<ContractContext>({
  ModuleManager: defaultModuleManager,
  AsksV11: defaultAsksV11,
  AsksV1: defaultAsksV1,
  AuctionHouse: defaultAuctionHouse,
  ZoraMedia: defaultZoraMedia,
  ZoraMarket: defaultZoraMarket,
  isReadOnly: true,
})

const ContractProvider: React.FC = ({ children }) => {
  const { address } = useAccount()
  const { data: signer } = useSigner()
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false)

  const [ModuleManager, setModuleManager] =
    useState<ZoraModuleManagerInterface>(defaultModuleManager)
  const [AsksV11, setAsksV11] = useState<AsksV11Interface>(defaultAsksV11)
  const [AsksV1, setAsksV1] = useState<AsksV1Interface>(defaultAsksV1)
  const [AuctionHouse, setAuctionHouse] = useState<AuctionHouse>(defaultAuctionHouse)
  const [ZoraMedia, setZoraMedia] = useState<Media>(defaultZoraMedia)
  const [ZoraMarket, setZoraMarket] = useState<Market>(defaultZoraMarket)

  useEffect(() => {
    if (!signer) {
      return
    }
    if (address && signer) {
      const authorisedAuction = AuctionHouse__factory.connect(
        AUCTION_HOUSE_ADDRESS,
        signer
      )
      const authorisedModuleManager = ModuleManagerFactory.connect(
        MODULE_MANAGER_ADDRESS,
        signer
      )
      setModuleManager(authorisedModuleManager)
      const authorisedAsksV11 = AsksV11__factory.connect(ASKS_V11_ADDRESS, signer)
      const authorisedAsksV1 = AsksV1__factory.connect(VULNERABLE_ASKS_V1_ADDRESS, signer)
      const authorisedZoraMedia = MediaFactory.connect(ZORA_TOKEN_ADDRESS, signer)
      const authorisedZoraMarket = MarketFactory.connect(ZORA_MARKET_ADDRESS, signer)
      setAsksV11(authorisedAsksV11)
      setAsksV1(authorisedAsksV1)
      setAuctionHouse(authorisedAuction)
      setZoraMedia(authorisedZoraMedia)
      setZoraMarket(authorisedZoraMarket)

      setIsReadOnly(false)
    }
  }, [signer, address])

  useEffect(() => {
    if (!address && !isReadOnly) {
      setModuleManager(defaultModuleManager)
      setAsksV11(defaultAsksV11)
      setAuctionHouse(defaultAuctionHouse)
      setZoraMedia(defaultZoraMedia)
      setZoraMarket(defaultZoraMarket)
      setIsReadOnly(true)
    }
  }, [address, isReadOnly])

  return (
    <ContractCtx.Provider
      value={{
        ModuleManager,
        AsksV11,
        AsksV1,
        AuctionHouse,
        ZoraMarket,
        ZoraMedia,
        isReadOnly,
      }}
    >
      {children}
    </ContractCtx.Provider>
  )
}

export { ContractProvider }
