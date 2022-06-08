import type { NextPage } from 'next'
import { PageWrapper } from 'components/PageWrapper'
import { collectionService, CollectionServiceProps } from 'services/collectionService'
import { useEffect } from 'react'
import { NFTGrid } from '@media/NFTGrid'
import { MarketStats } from '@market/components/MarketStats'
import { CollectionHeader } from 'components/CollectionHeader'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { ContractProvider } from 'providers/ContractProvider'
import { useContractABI } from 'hooks/useContractABI'
import { Text } from '@zoralabs/zord'
import { CollectionInfo } from 'components/CollectionInfo'

/* @ts-ignore */
const Collection: NextPage = ({
  initialPage,
  contractAddress,
  seo,
  aggregateStats,
  collection,
}: CollectionServiceProps) => {
  const { setCurrentCollection } = useCollectionsContext()

  useEffect(() => {
    if (collection && collection?.name) setCurrentCollection(collection.name)
    return () => {
      setCurrentCollection('Explore')
    }
  }, [collection])

  const { contractABI } = useContractABI(contractAddress)

  return (
    <>
      {contractABI ? (
        <ContractProvider contractAddress={contractAddress} abi={contractABI}>
          <PageWrapper p="x4" direction="column" gap="x4">
            <CollectionHeader collection={collection} aggregateStats={aggregateStats} />
            <CollectionInfo />
            <MarketStats aggregateStats={aggregateStats} />
            {contractAddress && (
              <NFTGrid contractAddress={[contractAddress]} initialPage={initialPage} />
            )}
          </PageWrapper>
        </ContractProvider>
      ) : (
        <Text>Loading</Text>
      )}
    </>
  )
}

export const getServerSideProps = collectionService

export default Collection
