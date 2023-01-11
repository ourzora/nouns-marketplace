import React, { ElementType, forwardRef } from 'react'
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithRef,
} from 'react-polymorphic-types'

import { BoxDefaultElement } from './Box'
import { Flex, FlexProps } from './Flex'

export interface StackProps extends FlexProps {}

export type StackComponentProps<E extends ElementType> = PolymorphicPropsWithRef<
  StackProps,
  E
>

export function InnerStack<E extends ElementType = typeof BoxDefaultElement>(
  props: StackComponentProps<E>,
  ref?: React.ForwardedRef<E>
) {
  return (
    <Flex
      ref={ref}
      direction="column"
      className={['zord-stack', props.className]}
      {...props}
    />
  )
}

export const Stack: PolymorphicForwardRefExoticComponent<
  StackProps,
  typeof BoxDefaultElement
> = forwardRef(InnerStack)
