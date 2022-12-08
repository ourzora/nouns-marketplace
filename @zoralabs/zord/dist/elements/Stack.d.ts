import React, { ElementType } from 'react';
import type { PolymorphicForwardRefExoticComponent, PolymorphicPropsWithRef } from 'react-polymorphic-types';
import { BoxDefaultElement } from './Box';
import { FlexProps } from './Flex';
export interface StackProps extends FlexProps {
}
export type StackComponentProps<E extends ElementType> = PolymorphicPropsWithRef<StackProps, E>;
export declare function InnerStack<E extends ElementType = typeof BoxDefaultElement>(props: StackComponentProps<E>, ref?: React.ForwardedRef<E>): JSX.Element;
export declare const Stack: PolymorphicForwardRefExoticComponent<StackProps, typeof BoxDefaultElement>;
//# sourceMappingURL=Stack.d.ts.map