import { ReactNode } from 'react'
import { Flex, FlexProps } from '@zoralabs/zord'
import { HEADER_HEIGHT } from 'styles/style-constants'

export interface PageWrapperProps extends FlexProps {
  children: ReactNode
}

export function PageWrapper({ children, ...props }: PageWrapperProps) {
  return (
    <Flex
      as="main"
      {...props}
      style={{ minimumHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      {children}
    </Flex>
  )
}
