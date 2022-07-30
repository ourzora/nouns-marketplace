import { PageWrapper } from 'components/PageWrapper'
import { collectionService, CollectionServiceProps } from 'services/collectionService'
import { useEffect, useState } from 'react'
import { MarketStats } from '@market/components/MarketStats'
import { Seo } from 'components'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import {
  Collections,
  CollectionActivityHeader,
  CollectionHeader,
} from 'compositions/Collections'
import { CollectionFilterProvider } from '@filter'
import { Stack, color, Separator } from '@zoralabs/zord'
import { useCollection } from '@filter/hooks/useCollection'
import { useWindowWidth } from 'hooks'
import { HorizontalMenu, HorizontalMenuProps } from 'components'
import { returnDao } from 'constants/collection-addresses'
import { ActiveAuctionCard } from '@noun-auction'

const Collection = ({
  // initialPage,
  contractAddress,
  seo,
  aggregateStats,
  collection,
}: CollectionServiceProps) => {
  const { setCurrentCollection, setCurrentCollectionCount } = useCollectionsContext()
  const [menuSelection, setMenuSelection] = useState<string>('nfts')
  const { isLarge } = useWindowWidth()

  const dao = returnDao(contractAddress)

  const items: HorizontalMenuProps['items'] = [
    {
      id: 'nfts',
      label: 'NFTs',
      handler: () => setMenuSelection('nfts'),
    },
    {
      id: 'activity',
      label: 'Activity',
      handler: () => setMenuSelection('activity'),
    },
  ]

  useEffect(() => {
    if (collection && collection?.name) {
      setCurrentCollection(collection.name)
      setCurrentCollectionCount(`${aggregateStats.aggregateStat.nftCount} NFTs`)
    }
    return () => {
      setCurrentCollection('Explore...')
      setCurrentCollectionCount(undefined)
    }
  }, [aggregateStats, collection, setCurrentCollection, setCurrentCollectionCount])

  const { data } = useCollection(contractAddress)

  return (
    <PageWrapper direction="column" gap="x4">
      <Seo title={seo.title} description={seo.description} />
      <CollectionHeader
        collection={collection}
        aggregateStats={aggregateStats}
        layout={dao ? 'dao' : 'collection'}
        currentAuction={dao ? <ActiveAuctionCard daoConfig={dao} /> : null}
      >
        <MarketStats aggregateStats={aggregateStats} />
      </CollectionHeader>
      {contractAddress && (
        <CollectionFilterProvider
          useSidebarClearButton
          filtersVisible={isLarge ? true : false}
          contractAddress={contractAddress}
          // initialPage={initialPage}
          // useMarketStatus
          useCollectionProperties={{
            header: 'Traits',
            selector: 'nouns-market-traits',
            hideBorder: true,
          }}
          usePriceRange={{
            label: 'Price',
            defaultState: 'open',
            hideBorder: true,
            hideCurrencySelect: true,
          }}
          strings={{
            NO_FILTER_RESULTS_COPY: `Sorry no ${data?.name} NFTs are available for purchase on chain.`,
          }}
        >
          <Stack>
            {dao ? (
              <>
                {/*<HorizontalMenu
                  items={items}
                  setId={setMenuSelection}
                  currentId={menuSelection}
                  useCustomHandler
                  style={{
                    borderBottom: `1px solid ${color.black10}`,
                    zIndex: 100,
                  }}
                />*/}
                <Separator />
              </>
            ) : (
              <CollectionActivityHeader />
            )}
            <Collections collectionAddress={contractAddress} view={menuSelection} />
          </Stack>
        </CollectionFilterProvider>
      )}
    </PageWrapper>
  )
}

export const getServerSideProps = collectionService

export default Collection
