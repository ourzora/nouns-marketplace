import { ActiveCollectionPageView } from 'compositions/Collections'

export const COLLECTION_ROUTES = {
  // about: {
  //   url: '/search/collections',
  //   title: 'Collections',
  //   slug: 'collections',
  // },
  about: { url: 'about' as ActiveCollectionPageView, title: 'About', slug: 'about' },
  nfts: { url: 'nfts' as ActiveCollectionPageView, title: 'NFTs', slug: 'tokens' },
  activity: {
    url: 'activity' as ActiveCollectionPageView,
    title: 'Activity',
    slug: 'activity',
  },
}

export const ROUTES = {
  index: { url: '/' },
  collections: { url: '/collections' },
  ...COLLECTION_ROUTES,
}
