export const COLLECTION_ROUTES = {
  searchCollections: {
    url: '/search/collections',
    title: 'Collections',
    slug: 'collections',
  },
  searchTokens: { url: '/search/tokens', title: 'NFTs', slug: 'tokens' },
  searchUsers: { url: '/search/users', title: 'Profiles', slug: 'users' },
}

export const ROUTES = {
  index: { url: '/' },
  search: { url: '/collections' },
  ...COLLECTION_ROUTES,
}
