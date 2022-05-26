import { b as MixinsProp, A as Atoms } from './mixins-01c373b1.js';
import React, { CSSProperties, ReactNode } from 'react';
import { ClassValue } from 'clsx';

declare type SpaceShorthand = Partial<Pick<Atoms, 'p' | 'px' | 'py' | 'pt' | 'pr' | 'pb' | 'pl' | 'pos' | 'm' | 'mx' | 'my' | 'mt' | 'mr' | 'mb' | 'ml' | 'w' | 'h' | 't' | 'l' | 'b' | 'r'>>;
interface BoxProps extends SpaceShorthand {
    style?: CSSProperties;
    className?: ClassValue;
    children?: ReactNode;
    center?: MixinsProp['center'];
    display?: Atoms['display'];
    flex?: Atoms['flex'];
    flexShrink?: Atoms['flexShrink'];
    color?: Atoms['color'];
    cursor?: Atoms['cursor'];
    border?: Atoms['borderColor'];
    backgroundColor?: Atoms['backgroundColor'];
    borderRadius?: Atoms['borderRadius'];
    objectFit?: Atoms['objectFit'];
    position?: Atoms['position'];
    p?: Atoms['padding'];
    top?: Atoms['top'];
    right?: Atoms['right'];
    bottom?: Atoms['bottom'];
    left?: Atoms['left'];
    l?: Atoms['left'];
    t?: Atoms['top'];
    r?: Atoms['right'];
    b?: Atoms['bottom'];
    w?: Atoms['width'];
    h?: Atoms['height'];
    minW?: Atoms['minW'];
    minH?: Atoms['minH'];
    maxW?: Atoms['maxW'];
    maxH?: Atoms['maxH'];
    inset?: Atoms['inset'];
    overflow?: Atoms['overflow'];
    pointerEvents?: Atoms['pointerEvents'];
}
declare const Box: React.ForwardRefExoticComponent<Pick<BoxProps & {
    as?: React.ElementType<any> | undefined;
} & Omit<Pick<any, string | number | symbol>, "as" | keyof BoxProps> & {
    ref?: any;
}, string | number | symbol> & React.RefAttributes<any>>;

interface FlexProps extends BoxProps {
    alignSelf?: Atoms['alignSelf'];
    gap?: Atoms['gap'];
    wrap?: Atoms['flexWrap'];
    direction?: Atoms['flexDirection'];
    align?: Atoms['alignItems'];
    justify?: Atoms['justifyContent'];
    placeItems?: Atoms['placeItems'];
    flexChildren?: boolean;
}
declare const Flex: React.ForwardRefExoticComponent<Pick<FlexProps & {
    as?: React.ElementType<any> | undefined;
} & Omit<Pick<any, string | number | symbol>, "as" | keyof FlexProps> & {
    ref?: any;
}, string | number | symbol> & React.RefAttributes<any>>;

interface StackProps extends FlexProps {
}
declare function Stack({ className, ...props }: StackProps): JSX.Element;

export { BoxProps as B, FlexProps as F, Stack as S, Box as a, Flex as b, StackProps as c };
