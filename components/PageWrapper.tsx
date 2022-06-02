import { ReactNode } from 'react'
import { Flex, FlexProps } from '@zoralabs/zord'

export interface PageWrapperProps extends FlexProps {
  children: ReactNode
}

export function PageWrapper({ children, ...props }: PageWrapperProps) {
  return (
    <Flex as="main" {...props}>
      {children}
    </Flex>
  )
}
