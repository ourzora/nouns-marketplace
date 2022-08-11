import { Stack, Heading, Flex, Label, Icon, Paragraph, Button } from '@zoralabs/zord'
import { PageWrapper, PageWrapperProps } from 'components/PageWrapper'
import { MAX_WIDTH } from 'styles/style-constants'
import Link from 'next/link'
import { ReactNode } from 'react'

export interface DocsPageWrapperProps extends PageWrapperProps {
  children: ReactNode
  title?: string
  description?: string
  maxWidth?: string
  useBackButton?: boolean
}

export function BackButton() {
  return (
    <Link href="/docs">
      <Button
        borderRadius="phat"
        as="a"
        align="center"
        display="flex"
        alignItems="center"
        variant="secondary"
        size="sm"
      >
        <Icon id="ChevronLeft" />
        Back
      </Button>
    </Link>
  )
}

export function DocsPageWrapper({
  children,
  title,
  description,
  maxWidth,
  useBackButton = true,
  ...props
}: DocsPageWrapperProps) {
  return (
    <PageWrapper
      {...props}
      mx="auto"
      style={{ maxWidth: maxWidth ? maxWidth : MAX_WIDTH.MED }}
    >
      <Stack px="x6" w="100%" mx="auto" gap="x6">
        {title && (
          <Flex id="test-page-header" justify="space-between">
            <Heading as="h1" size="lg">
              {title}
            </Heading>
            {useBackButton && <BackButton />}
          </Flex>
        )}
        {description && <Paragraph>{description}</Paragraph>}
        {children}
        {useBackButton && !title && <BackButton />}
      </Stack>
    </PageWrapper>
  )
}
