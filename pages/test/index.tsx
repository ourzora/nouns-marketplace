import { useState } from 'react'
import { Heading, Stack, color, Flex, Icon } from '@zoralabs/zord'
import { Link } from 'components'
import { TestPageWrapper, MDXComponents, HorizontalMenu } from 'components'

import Readme from './../../README.md'
import NounishAuctionReadme from '../../@noun-auction/README.md'
import ZoraCommonReadme from '../../@shared/README.md'
import ZoraMarketReadme from '../../@market/README.md'
import NFTFilterReadme from '../../@filter/README.md'

const pageLinks = [
  {
    name: 'Active Noun Auction',
    url: 'active-noun-auction',
  },
]

enum tabs {
  ABOUT = 'About',
  NOUNISH_AUCTION = 'Nounish Auction',
  ZORA_COMMON = 'Zora Common',
  ZORA_MARKET = 'Zora Market',
  NFT_FILTER = 'NFT Filter',
  EXAMPLES = 'Examples',
}

const menuItems = Object.values(tabs).map((item) => {
  return {
    id: item,
    label: item,
  }
})

export default function TestPages() {
  const [tab, setTab] = useState<string>(menuItems[0].id)

  return (
    <TestPageWrapper useBackButton={false}>
      <HorizontalMenu
        items={menuItems}
        setId={setTab}
        currentId={tab}
        position="sticky"
        pt="x2"
        top="x0"
        backgroundColor="primary"
        justify="flex-start"
        style={{
          borderBottom: `1px solid ${color.black10}`,
          zIndex: 100,
        }}
      />
      <Stack gap="x4">
        {tab === tabs.ABOUT && <Readme components={{ ...MDXComponents }} />}
        {tab === tabs.NOUNISH_AUCTION && (
          <NounishAuctionReadme components={{ ...MDXComponents }} />
        )}
        {tab === tabs.ZORA_COMMON && (
          <ZoraCommonReadme components={{ ...MDXComponents }} />
        )}
        {tab === tabs.ZORA_MARKET && (
          <ZoraMarketReadme components={{ ...MDXComponents }} />
        )}
        {tab === tabs.NFT_FILTER && <NFTFilterReadme components={{ ...MDXComponents }} />}
        {tab === tabs.EXAMPLES && (
          <Stack w="100%">
            {pageLinks.map((link) => (
              <Link key={link.url} href={`/test/${link.url}`}>
                <Flex align="center" gap="x3">
                  <Heading size="xs">{link.name}</Heading>
                  <Icon id="ArrowRight" size="lg" />
                </Flex>
              </Link>
            ))}
          </Stack>
        )}
      </Stack>
    </TestPageWrapper>
  )
}
