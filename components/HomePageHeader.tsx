import * as styles from 'styles/styles.css'

import { Maybe } from '@zoralabs/nft-hooks/dist/backends/zora-indexer-v1/zora-indexer-types'
import { FlexProps, Heading, Paragraph, Stack } from '@zord'

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
        <Heading
          className={[styles.homepageHeadline]}
          textAlign="center"
          as="h1"
          style={{ lineHeight: 1.125 }}
        >
          {headline}
        </Heading>
      )}
      {copy && (
        <Paragraph size="md" textAlign="center" color="text1">
          {copy}
        </Paragraph>
      )}
    </Stack>
  )
}
