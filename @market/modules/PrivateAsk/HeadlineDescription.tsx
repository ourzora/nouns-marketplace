import { Heading, Paragraph, Stack } from '@zoralabs/zord'
import { modalDescription } from './PrivateAskFlow.css'

interface HeadlineDescriptionProps {
  heading: string
  description: string
}

export function HeadlineDescription({ heading, description }: HeadlineDescriptionProps) {
  return (
    <Stack gap="x4" textAlign="center">
      <Heading as="h3" size="md">
        {heading}
      </Heading>
      <Paragraph size="lg" color="text3" className={[modalDescription]}>
        {description}
      </Paragraph>
    </Stack>
  )
}
