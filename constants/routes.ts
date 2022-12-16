import { ActiveCollectionPageView } from 'compositions/Collections'

// For use on Collection Page sub-navigation
export const COLLECTION_ROUTES = {
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
