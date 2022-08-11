import { Label, Stack } from '@zoralabs/zord'
import { PageWrapper } from 'components/PageWrapper'
import { Link } from 'components'
import { MAX_WIDTH } from 'styles/style-constants'
import Readme from './../../README.md'
import { TestPageWrapper } from 'components/utils/TestPageWrapper'

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
    <TestPageWrapper useBackButton={false} title="About ⌐◨-◨">
      <Stack>
        <Readme />
      </Stack>
      <Stack p="x6" w="100%" mx="auto" style={{ maxWidth: MAX_WIDTH.MED }}>
        {pageLinks.map((link) => (
          <Link key={link.url} href={`/test/${link.url}`}>
            <Label>{link.name}</Label>
          </Link>
        ))}
      </Stack>
    </TestPageWrapper>
  )
}
