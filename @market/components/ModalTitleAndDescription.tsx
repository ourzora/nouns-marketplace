import { Box, BoxProps, Heading, Paragraph } from '@zoralabs/zord'
import React from 'react'

interface ModalTitleAndDescriptionProps extends BoxProps {
  description?: string | undefined
  title?: string | undefined
}

export function ModalTitleAndDescription({
  description,
  title,
  ...props
}: ModalTitleAndDescriptionProps) {
  return (
    <Box {...props}>
      {!!title && (
        <Heading as="h1" size="md" mb={!!description ? 'x2' : 'x0'}>
          {title}
        </Heading>
      )}
      {description && (
        <Paragraph size="lg" mb="x4">
          {description}
        </Paragraph>
      )}
    </Box>
  )
}
