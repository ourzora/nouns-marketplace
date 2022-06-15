import { Stack, Display, Button } from '@zoralabs/zord'
import { PageWrapper } from 'components/PageWrapper'
import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()

  return (
    <PageWrapper>
      <Stack align="center" justify="center" w="100%" gap="x6">
        <Display as="h1">Sorry! Page Not Found</Display>
        <Button variant="secondary" onClick={() => router.push('/')}>
          Return Home
        </Button>
      </Stack>
    </PageWrapper>
  )
}
