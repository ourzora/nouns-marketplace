import { Stack } from '@zoralabs/zord'
import { Button } from 'components/Button'
import { PageWrapper } from 'components/PageWrapper'
import { Heading } from 'components/typography/Text'
import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()

  return (
    <PageWrapper>
      <Stack align="center" justify="center" w="100%" gap="x6">
        <Heading size="xl" as="h1">
          Sorry! Page Not Found
        </Heading>
        <Button variant="secondary" onClick={() => router.push('/')}>
          Return Home
        </Button>
      </Stack>
    </PageWrapper>
  )
}
