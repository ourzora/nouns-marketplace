import { Heading, Paragraph, Stack } from '@zord'

interface HeadingDescriptionProps {
  heading: string
  description?: string
}

export function V3AskHeadingDescription({
  heading,
  description,
}: HeadingDescriptionProps) {
  return (
    <Stack gap="x4" textAlign="center">
      <Heading as="h3" size="md">
        {heading}
      </Heading>
      {description && <Paragraph color="text3">{description}</Paragraph>}
    </Stack>
  )
}
