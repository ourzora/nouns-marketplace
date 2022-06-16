import { ReactNode } from 'react'
import { Flex, FlexProps } from '@zoralabs/zord'
import { pageWrapper } from 'styles/styles.css'

export interface PageWrapperProps extends FlexProps {
  children: ReactNode
}

export function PageWrapper({ children, ...props }: PageWrapperProps) {
  return (
    <Flex as="main" className={pageWrapper} {...props}>
      {children}
    </Flex>
  )
}
