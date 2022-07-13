import { Stack, Heading, Flex, Label, Icon, Paragraph, FlexProps } from '@zoralabs/zord'
import { PageWrapper, PageWrapperProps } from 'components/PageWrapper'
import { MAX_WIDTH } from 'styles/style-constants'
import { Link } from 'components'
import { ReactNode } from 'react'

export interface TestPageWrapperProps extends PageWrapperProps {
  children: ReactNode
  title?: string
  description?: string
  maxWidth?: string
}

export function TestPageWrapper({
  children,
  title = 'Test Page',
  description,
  maxWidth,
  ...props
}: TestPageWrapperProps) {
  return (
    <PageWrapper
      {...props}
      mx="auto"
      style={{ maxWidth: maxWidth ? maxWidth : MAX_WIDTH.MED }}
    >
      <Stack p="x6" w="100%" mx="auto" gap="x6">
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
