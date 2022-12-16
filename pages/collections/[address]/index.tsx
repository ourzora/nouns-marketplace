import { Seo } from 'components'
import { PageWrapper } from 'components/PageWrapper'
import {
  ActiveCollectionPageView,
  CollectionAbout,
  CollectionHeader,
  CollectionNav,
} from 'compositions/Collections'
import { CollectionNFTs } from 'compositions/Collections/CollectionNFTs'
import { useCollectionsContext } from 'providers/CollectionsProvider'
import { CollectionServiceProps, collectionService } from 'services/collectionService'

import { useAggregate } from 'hooks'

import React, { useEffect, useState } from 'react'

import { Stack } from '@zoralabs/zord'

const Collection = ({ fallback }: { fallback: CollectionServiceProps }) => {
  const { setCurrentCollection, setCurrentCollectionCount } = useCollectionsContext()
  const { contractAddress: collectionAddress, collection, seo } = fallback
  const [activeView, setActiveView] = useState<ActiveCollectionPageView>('about')
  const { nftCount } = useAggregate(collectionAddress)

  useEffect(() => {
    if (collection?.name) {
      setCurrentCollection(collection.name)
      setCurrentCollectionCount(nftCount ? `${nftCount} NFTs` : '... NFTs')
    }
    return () => {
      setCurrentCollection('Explore...')
      setCurrentCollectionCount(undefined)
    }
  }, [nftCount, collection, setCurrentCollection, setCurrentCollectionCount])

  return (
    <PageWrapper direction="column" gap="x13">
      <Seo title={seo.title} description={seo.description} />
      <CollectionHeader collection={collection} />
      <Stack gap="x8">
        <CollectionNav activeView={activeView} setActiveView={setActiveView} />
        {activeView === 'about' && <CollectionAbout collection={collection} />}
        {activeView === 'nfts' && <CollectionNFTs fallback={fallback} />}
        {/* {activeView === 'about' && <CollectionActivity collection={collection} />} */}
      </Stack>
    </PageWrapper>
  )
}

export const getServerSideProps = collectionService

export default Collection
