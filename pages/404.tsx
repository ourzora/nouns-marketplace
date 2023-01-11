import { PageWrapper } from 'components/PageWrapper'
import { useRouter } from 'next/router'

import { Button, Heading, Stack } from '@zord'

export default function Custom404() {
  const router = useRouter()

  return (
    <PageWrapper>
      <Stack align="center" justify="center" w="100%" gap="x6">
        <Heading size="xl" as="h1" align="center">
          Sorry! Page Not Found
        </Heading>
        <Button variant="secondary" align="center" onClick={() => router.push('/')}>
          Return Home
        </Button>
      </Stack>
    </PageWrapper>
  )
}
