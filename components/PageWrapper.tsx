import { fullHeightPageWrapper, pageWrapper } from 'styles/styles.css'

import { ReactNode } from 'react'

import { Flex, FlexProps } from '@zoralabs/zord'

export interface PageWrapperProps extends FlexProps {
  children: ReactNode
  fullHeight?: boolean
}

export function PageWrapper({ children, ...props }: PageWrapperProps) {
  return (
    <Flex
      as="main"
      className={props.fullHeight ? pageWrapper : fullHeightPageWrapper}
      {...props}
    >
      {children}
    </Flex>
  )
}
