import React from 'react'

import { Stack, StackProps } from '@zoralabs/zord'

import { V3AskModal } from './V3AskModal'

interface V3AskSidebarProps extends StackProps {
  isOwner: boolean
}

export function V3AskSidebar({ className, isOwner, ...props }: V3AskSidebarProps) {
  return (
    <Stack {...props} className={className}>
      <V3AskModal isOwner={isOwner} modalName="V3AskV3" />
    </Stack>
  )
}
