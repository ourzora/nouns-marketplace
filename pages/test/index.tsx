import { Label, Stack } from '@zoralabs/zord'
import { Link } from 'components'
import { TestPageWrapper, MDXComponents } from 'components'
import Readme from './../../README.md'

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
      <Stack gap="x4">
        <Readme components={{ ...MDXComponents }} />
      </Stack>
      <Stack p="x6" w="100%">
        {pageLinks.map((link) => (
          <Link key={link.url} href={`/test/${link.url}`}>
            <Label>{link.name}</Label>
          </Link>
        ))}
      </Stack>
    </TestPageWrapper>
  )
}
