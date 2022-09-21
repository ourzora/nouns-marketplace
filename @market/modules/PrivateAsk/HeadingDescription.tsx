import { Heading, Paragraph, Stack } from '@zoralabs/zord'
import { mediumFont } from 'styles/styles.css'

interface HeadingDescriptionProps {
  heading: string
  description?: string
}

export function HeadingDescription({ heading, description }: HeadingDescriptionProps) {
  return (
    <Stack gap="x4" textAlign="center">
      <Heading as="h3" size="md">
        {heading}
      </Heading>
      {description && (
        <Paragraph size="lg" color="text3" className={[mediumFont]}>
          {description}
        </Paragraph>
      )}
    </Stack>
  )
}
