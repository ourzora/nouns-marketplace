import * as styles from 'styles/styles.css'

import { lightFont } from '@shared'
import { Maybe } from '@zoralabs/nft-hooks/dist/backends/zora-indexer-v1/zora-indexer-types'
import { FlexProps, Paragraph, Stack, Text } from '@zoralabs/zord'

export interface PageHeaderProps extends FlexProps {
  headline: Maybe<string> | undefined
  copy?: string
}

export function PageHeader({ headline, copy, ...props }: PageHeaderProps) {
  return (
    <Stack className={[styles.pageHeaderWrapper, 'page-header-wrapper']} {...props}>
      {headline && (
        <Text
          className={[
            // styles.textCenter,
            styles.pageHeadline,
          ]}
          textAlign="center"
          as="h1"
          style={{ lineHeight: 1.125 }}
        >
          {headline}
        </Text>
      )}
      {copy && (
        <Paragraph
          as="p"
          size="lg"
          textAlign="center"
          className={[
            lightFont,
            // styles.textCenter
          ]}
          color="text1"
        >
          {copy}
        </Paragraph>
      )}
    </Stack>
  )
}
