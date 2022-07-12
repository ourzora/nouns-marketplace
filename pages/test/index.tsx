import { Label, Stack } from '@zoralabs/zord'
import { PageWrapper } from 'components/PageWrapper'
import { Link } from 'components'
import { MAX_WIDTH } from 'styles/style-constants'

const pageLinks = [
  {
    name: 'Nouns Auction History',
    url: 'nouns-auction-history',
  },
  {
    name: 'Active Noun Auction',
    url: 'active-noun-auction',
  },
  {
    name: 'Test Data',
    url: 'collections',
  },
]

export default function TestPages() {
  return (
    <PageWrapper>
      <Stack p="x6" w="100%" mx="auto" style={{ maxWidth: MAX_WIDTH.MED }}>
        {pageLinks.map((link) => (
          <Link key={link.url} href={`/test/${link.url}`}>
            <Label>{link.name}</Label>
          </Link>
        ))}
      </Stack>
    </PageWrapper>
  )
}
