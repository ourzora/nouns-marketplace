import { pageHeaderWrapper, pageHeadline } from 'styles/styles.css'

import { Maybe } from '@zoralabs/nft-hooks/dist/backends/zora-indexer-v1/zora-indexer-types'
import { FlexProps, Paragraph, Stack, Text } from '@zord'

export interface PageHeaderProps extends FlexProps {
  headline: Maybe<string> | undefined
  copy?: string
  direction?: FlexProps['direction']
}

export function PageHeader({
  headline,
  direction = 'column',
  copy,
  ...props
}: PageHeaderProps) {
  return (
    <Flex
      direction={direction}
      gap={{ '@initial': 'x0', '@1024': 'x1' }}
      className={[pageHeaderWrapper, 'page-header-wrapper']}
      {...props}
    >
      {headline && (
        <Text
          as="h1"
          className={[pageHeadline]}
          textAlign={direction === 'column' ? 'center' : 'left'}
        >
          {headline}
        </Text>
      )}
      {copy && (
        <Paragraph as="p" size="lg" textAlign="center" color="text3">
          {copy}
        </Paragraph>
      )}
    </Flex>
  )
}
