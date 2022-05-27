import { Box, BoxProps, Heading, Paragraph } from '@zoralabs/zord/elements'
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
        <Heading size="xs" mb={!!description ? 'x2' : 'x0'}>
          {title}
        </Heading>
      )}
      {description && (
        <Paragraph size="sm" mb="x4">
          {description}
        </Paragraph>
      )}
    </Box>
  )
}
