// import { Orb } from '@market/components/Orb'
import { Paragraph, Spinner, Stack, StackProps } from '@zoralabs/zord'
import React from 'react'

export interface PrivateAskCheckApprovalSpinnerProps extends StackProps {
  text: string
}

export function PrivateAskCheckApprovalSpinner({
  text,
  className,
  ...props
}: PrivateAskCheckApprovalSpinnerProps) {
  return (
    <Stack gap="x6" align="center" className={className} {...props}>
      {/* <Orb /> */}
      {/* <Spinner size="lg" /> */}
      {/* <Paragraph>{text}</Paragraph> */}
      <Paragraph
        // className={styles.textColor}
        size="sm"
        color="text3"
      >
        {text}
      </Paragraph>
    </Stack>
  )
}
