import React from 'react'

import { Box, BoxProps, Heading, Paragraph } from '@zord'

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
        <Paragraph size="md" mb="x4">
          {description}
        </Paragraph>
      )}
    </Box>
  )
}
