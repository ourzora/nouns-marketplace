import React from 'react'

import { Zorb } from '@zora-brand'
import { Paragraph, Stack, StackProps } from '@zord'

export interface V3AskCheckApprovalSpinnerProps extends StackProps {
  text: string
}

export function V3AskCheckApprovalSpinner({
  text,
  className,
  ...props
}: V3AskCheckApprovalSpinnerProps) {
  return (
    <Stack gap="x6" align="center" className={className} {...props}>
      <Zorb />
      <Paragraph size="sm" color="text3">
        {text}
      </Paragraph>
    </Stack>
  )
}
