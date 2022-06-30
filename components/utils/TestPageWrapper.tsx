import { Stack, Heading, Flex, Label, Icon, Paragraph } from '@zoralabs/zord'
import { PageWrapper } from 'components/PageWrapper'
import { MAX_WIDTH } from 'styles/style-constants'
import { Link } from 'components'
import { ReactNode } from 'react'

export type TestPageWrapperProps = {
  children: ReactNode
  title?: string
  description?: string
}

export function TestPageWrapper({
  children,
  title = 'Test Page',
  description,
}: TestPageWrapperProps) {
  return (
    <PageWrapper>
      <Stack p="x6" w="100%" mx="auto" style={{ maxWidth: MAX_WIDTH.MED }} gap="x6">
        <Flex id="test-page-header" justify="space-between">
          <Heading>{title}</Heading>
          <Link href="/test">
            <Flex
              align="center"
              gap="x2"
              px="x4"
              py="x2"
              backgroundColor="tertiary"
              borderRadius="phat"
            >
              <Icon id="ChevronLeft" />
              <Label>Back</Label>
            </Flex>
          </Link>
        </Flex>
        {description && <Paragraph>{description}</Paragraph>}
        {children}
      </Stack>
    </PageWrapper>
  )
}
