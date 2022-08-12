import { useState } from 'react'
import { Stack, color, Button, Icon } from '@zoralabs/zord'
import Link from 'next/link'
import { DocsPageWrapper, MDXComponents, HorizontalMenu } from 'components'

import Readme from './../../README.md'
import NounishAuctionReadme from '../../@noun-auction/README.md'
import ZoraCommonReadme from '../../@shared/README.md'
import ZoraMarketReadme from '../../@market/README.md'
import NFTFilterReadme from '../../@filter/README.md'
import ZordReadme from '../../docs/zord.md'

const pageLinks = [
  {
    name: 'Nounish Auction Component',
    url: 'nounish-auction-component',
  },
  {
    name: 'Zord Components',
    url: 'zord-components',
  },
]

enum tabs {
  ABOUT = 'About',
  ZORD = 'Zord',
  NOUNISH_AUCTION = 'Nounish Auction',
  // ZORA_COMMON = 'Zora Common',
  NFT_FILTER = 'NFT Filter',
  ZORA_MARKET = 'Zora Market',
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
    <DocsPageWrapper useBackButton={false}>
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
        {/*tab === tabs.ZORA_COMMON && (
          <ZoraCommonReadme components={{ ...MDXComponents }} />
        )*/}
        {tab === tabs.ZORA_MARKET && (
          <ZoraMarketReadme components={{ ...MDXComponents }} />
        )}
        {tab === tabs.ZORD && <ZordReadme components={{ ...MDXComponents }} />}
        {tab === tabs.NFT_FILTER && <NFTFilterReadme components={{ ...MDXComponents }} />}
        {tab === tabs.EXAMPLES && (
          <Stack w="100%" gap="x4">
            {pageLinks.map((link) => (
              <Link key={link.url} href={`/docs/${link.url}`} passHref>
                <Button
                  borderRadius="curved"
                  as="a"
                  align="center"
                  gap="x3"
                  display="flex"
                  alignItems="center"
                >
                  {link.name}
                  <Icon id="ArrowRight" size="lg" />
                </Button>
              </Link>
            ))}
          </Stack>
        )}
      </Stack>
    </DocsPageWrapper>
  )
}
