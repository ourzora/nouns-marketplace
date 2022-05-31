import { HomepageHero } from './HomepageHero'
import { CollectionRanking } from 'compositions/CollectionRanking'
import { RecentSales } from './RecentSales'

export function Homepage() {
  return (
    <>
      <HomepageHero />
      <CollectionRanking />
      <RecentSales />
    </>
  )
}
