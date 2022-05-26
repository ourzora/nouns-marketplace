import { ReactNode } from 'react'
import { Flex, BoxProps, FlexProps } from '@zoralabs/zord/elements'

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