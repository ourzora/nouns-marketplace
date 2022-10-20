import * as styles from 'styles/styles.css'

import { Maybe } from '@zoralabs/nft-hooks/dist/backends/zora-indexer-v1/zora-indexer-types'
import { FlexProps, Paragraph, Stack, Text } from '@zoralabs/zord'

export interface HomePageHeaderProps extends FlexProps {
  headline: Maybe<string> | undefined
  copy?: string
}

export function HomePageHeader({ headline, copy, ...props }: HomePageHeaderProps) {
  return (
    <Stack
      gap={{ '@initial': 'x2', '@1024': 'x8' }}
      className={[styles.homepageHeaderWrapper, 'page-header-wrapper']}
      {...props}
    >
      {headline && (
        <Text
          className={[styles.homepageHeadline]}
          textAlign="center"
          as="h1"
          style={{ lineHeight: 1.125 }}
        >
          {headline}
        </Text>
      )}
      {copy && (
        <Paragraph as="p" size="lg" textAlign="center" color="text1">
          {copy}
        </Paragraph>
      )}
    </Stack>
  )
}
