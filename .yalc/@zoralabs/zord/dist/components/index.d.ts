import { c as StackProps } from '../Stack-eac13124.js';
import '../mixins-01c373b1.js';
import '@vanilla-extract/sprinkles/dist/declarations/src/createSprinkles';
import 'react';
import 'clsx';

interface WellProps extends StackProps {
    label?: string;
}
declare function Well({ label, className, children, ...props }: WellProps): JSX.Element;

export { Well, WellProps };
