import { pageHeaderWrapper, pageHeadline } from 'styles/styles.css'

import { Maybe } from '@zoralabs/nft-hooks/dist/backends/zora-indexer-v1/zora-indexer-types'
import { FlexProps, Paragraph, Stack, Text } from '@zoralabs/zord'

export interface PageHeaderProps extends FlexProps {
  headline: Maybe<string> | undefined
  copy?: string
}

export function PageHeader({ headline, copy, ...props }: PageHeaderProps) {
  return (
    <Stack
      gap={{ '@initial': 'x0', '@1024': 'x1' }}
      className={[pageHeaderWrapper, 'page-header-wrapper']}
      {...props}
    >
      {headline && (
        <Text className={[pageHeadline]} textAlign="center" as="h1">
          {headline}
        </Text>
      )}
      {copy && (
        <Paragraph as="p" size="lg" textAlign="center" color="text3">
          {copy}
        </Paragraph>
      )}
    </Stack>
  )
}
