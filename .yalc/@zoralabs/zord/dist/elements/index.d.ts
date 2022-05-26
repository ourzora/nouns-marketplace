import { B as BoxProps, F as FlexProps } from '../Stack-eac13124.js';
export { a as Box, B as BoxProps, b as Flex, F as FlexProps, S as Stack, c as StackProps } from '../Stack-eac13124.js';
import React, { ElementType, SVGProps, FocusEventHandler, Dispatch, SetStateAction } from 'react';
import * as _vanilla_extract_private from '@vanilla-extract/private';
import { A as Atoms } from '../mixins-01c373b1.js';
import { c as PolymorphicComponentPropsWithRef, a as PolymorphicComponentProps } from '../polymorphic-4daafd75.js';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { RadioGroupProps } from '@radix-ui/react-radio-group';
import 'clsx';
import '@vanilla-extract/sprinkles/dist/declarations/src/createSprinkles';

declare const aspectRatioVariants: {
    variant: {
        square: {
            aspectRatio: string;
        };
        twoOne: {
            aspectRatio: string;
        };
        fourThree: {
            aspectRatio: string;
        };
        mediaPreview: {
            aspectRatio: string;
        };
    };
};

interface AspectRatioProps extends BoxProps {
    variant?: keyof typeof aspectRatioVariants['variant'];
}
declare function AspectRatio({ className, children, variant, ...props }: AspectRatioProps): JSX.Element;

declare const buttonVariants: {
    pill: {
        true: string;
    };
    size: {
        sm: (string | {
            height: string;
            width: string;
            minWidth: string;
            fontSize: "14px";
            fontWeight: number;
        })[];
        md: (string | {
            height: string;
            fontSize: "16px";
            fontWeight: number;
        })[];
        lg: (string | {
            height: string;
            minWidth: string;
            fontSize: "16px";
            fontWeight: number;
        })[];
    };
    variant: {
        primary: {
            color: _vanilla_extract_private.CSSVarFunction;
            backgroundColor: _vanilla_extract_private.CSSVarFunction;
            selectors: {
                '&:not([disabled]):hover': {
                    backgroundColor: _vanilla_extract_private.CSSVarFunction;
                };
            };
        };
        secondary: {
            color: _vanilla_extract_private.CSSVarFunction;
            backgroundColor: _vanilla_extract_private.CSSVarFunction;
            selectors: {
                '&:not([disabled]):hover': {
                    backgroundColor: _vanilla_extract_private.CSSVarFunction;
                };
            };
        };
        destructive: {
            color: _vanilla_extract_private.CSSVarFunction;
            backgroundColor: _vanilla_extract_private.CSSVarFunction;
            selectors: {
                '&:not([disabled]):hover': {
                    backgroundColor: _vanilla_extract_private.CSSVarFunction;
                };
            };
        };
        outline: {
            color: _vanilla_extract_private.CSSVarFunction;
            borderColor: _vanilla_extract_private.CSSVarFunction;
            backgroundColor: string;
            selectors: {
                '&:not([disabled]):hover': {
                    backgroundColor: _vanilla_extract_private.CSSVarFunction;
                };
            };
        };
        ghost: {
            borderRadius: _vanilla_extract_private.CSSVarFunction;
            color: _vanilla_extract_private.CSSVarFunction;
            borderColor: string;
            backgroundColor: string;
            selectors: {
                '&:hover, &:not([disabled]):hover': {
                    backgroundColor: _vanilla_extract_private.CSSVarFunction;
                };
            };
        };
        unset: {
            backgroundColor: string;
            gap: string;
            border: string;
            minWidth: string;
            padding: string;
            height: string;
            fontSize: string;
            fontWeight: string;
        };
    };
};

declare const iconVariants: {
    color: {
        primary: string[];
    };
    size: {
        sm: {
            width: _vanilla_extract_private.CSSVarFunction;
            height: _vanilla_extract_private.CSSVarFunction;
        };
        md: {
            width: _vanilla_extract_private.CSSVarFunction;
            height: _vanilla_extract_private.CSSVarFunction;
        };
        lg: {
            width: _vanilla_extract_private.CSSVarFunction;
            height: _vanilla_extract_private.CSSVarFunction;
        };
    };
    rotate: {
        true: string[];
    };
};

interface ButtonProps extends FlexProps {
    icon?: IconProps['id'];
    iconSize?: keyof typeof iconVariants['size'];
    loading?: boolean;
    pill?: boolean;
    variant?: keyof typeof buttonVariants['variant'];
    size?: keyof typeof buttonVariants['size'];
}
declare const Button: React.ForwardRefExoticComponent<Pick<ButtonProps & {
    as?: React.ElementType<any> | undefined;
} & Omit<Pick<any, string | number | symbol>, "as" | keyof ButtonProps> & {
    ref?: any;
}, string | number | symbol> & React.RefAttributes<any>>;

interface GridProps extends BoxProps {
    gap?: Atoms['gap'];
    align?: Atoms['alignItems'];
    justify?: Atoms['justifyContent'];
}
declare const Grid: React.ForwardRefExoticComponent<Pick<GridProps & {
    as?: React.ElementType<any> | undefined;
} & Omit<Pick<any, string | number | symbol>, "as" | keyof GridProps> & {
    ref?: any;
}, string | number | symbol> & React.RefAttributes<any>>;

declare const textVariants: {
    readonly fontWeight: {
        readonly display: {
            readonly fontWeight: number;
        };
        readonly heading: {
            readonly fontWeight: number;
        };
        readonly label: {
            readonly fontWeight: number;
        };
        readonly paragraph: {
            readonly fontWeight: number;
        };
    };
    readonly italic: {
        readonly true: {
            readonly fontStyle: "italic";
        };
    };
    readonly textAlign: {
        readonly left: {
            readonly textAlign: "left";
        };
        readonly right: {
            readonly textAlign: "right";
        };
        readonly center: {
            readonly textAlign: "center";
        };
    };
    readonly variant: {
        readonly code: {
            readonly fontSize: "14px";
            readonly lineHeight: "14px";
        };
        readonly eyebrow: {
            readonly color: _vanilla_extract_private.CSSVarFunction;
            readonly fontSize: "12px";
            readonly fontWeight: number;
            readonly letterSpacing: "0.05em";
            readonly lineHeight: "20px";
            readonly textTransform: "uppercase";
        };
        readonly 'heading-xs': {
            readonly fontSize: "20px";
            readonly fontWeight: number;
            readonly lineHeight: "30px";
        };
        readonly 'heading-sm': {
            readonly fontSize: "30px";
            readonly fontWeight: number;
            readonly lineHeight: "40px";
        };
        readonly 'heading-md': {
            readonly fontSize: "35px";
            readonly fontWeight: number;
            readonly lineHeight: "50px";
        };
        readonly 'heading-lg': {
            readonly fontSize: "40px";
            readonly fontWeight: number;
            readonly lineHeight: "55px";
        };
        readonly 'heading-xl': {
            readonly fontSize: "50px";
            readonly fontWeight: number;
            readonly lineHeight: "70px";
        };
        readonly 'label-xs': {
            readonly fontSize: "12px";
            readonly fontWeight: number;
            readonly lineHeight: "20px";
        };
        readonly 'label-sm': {
            readonly fontSize: "14px";
            readonly fontWeight: number;
            readonly lineHeight: "24px";
        };
        readonly 'label-md': {
            readonly fontSize: "16px";
            readonly fontWeight: number;
            readonly lineHeight: "25px";
        };
        readonly 'label-lg': {
            readonly fontSize: "18px";
            readonly fontWeight: number;
            readonly lineHeight: "30px";
        };
        readonly 'menu-lg': {
            readonly fontSize: "28px";
            readonly fontWeight: number;
            readonly lineHeight: "34px";
        };
        readonly 'paragraph-xs': {
            readonly fontSize: "12px";
            readonly fontWeight: number;
            readonly lineHeight: "20px";
        };
        readonly 'paragraph-sm': {
            readonly fontSize: "14px";
            readonly fontWeight: number;
            readonly lineHeight: "24px";
        };
        readonly 'paragraph-md': {
            readonly fontSize: "16px";
            readonly fontWeight: number;
            readonly lineHeight: "25px";
        };
        readonly 'paragraph-lg': {
            readonly fontSize: "18px";
            readonly fontWeight: number;
            readonly lineHeight: "30px";
        };
        readonly 'display-xs': {
            readonly fontSize: "40px";
            readonly fontWeight: number;
            readonly lineHeight: "50px";
        };
        readonly 'display-sm': {
            readonly fontSize: "50px";
            readonly fontWeight: number;
            readonly lineHeight: "65px";
        };
        readonly 'display-md': {
            readonly fontSize: "65px";
            readonly fontWeight: number;
            readonly lineHeight: "85px";
        };
        readonly 'display-lg': {
            readonly fontSize: "80px";
            readonly fontWeight: number;
            readonly lineHeight: "95px";
        };
        readonly link: {
            readonly fontSize: "14px";
            readonly fontWeight: number;
            readonly lineHeight: "20px";
            readonly textDecoration: "underline";
            readonly textUnderlineOffset: "0.15em";
        };
    };
};

interface TextProps extends BoxProps {
    align?: keyof typeof textVariants['textAlign'];
    fontWeight?: keyof typeof textVariants['fontWeight'];
    inline?: boolean;
    italic?: boolean;
    textTransform?: Atoms['textTransform'];
    variant?: keyof typeof textVariants['variant'];
}
declare const Text: React.ForwardRefExoticComponent<Pick<TextProps & {
    as?: React.ElementType<any> | undefined;
} & Omit<Pick<any, string | number | symbol>, "as" | keyof TextProps> & {
    ref?: any;
}, string | number | symbol> & React.RefAttributes<any>>;
interface ParagraphProps extends Omit<TextProps, 'variant'> {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}
declare type ParagraphComponent<E extends ElementType = 'div'> = PolymorphicComponentPropsWithRef<E, ParagraphProps>;
declare function Paragraph<E extends ElementType = 'div'>({ size, variant, ...props }: ParagraphComponent<E>): JSX.Element;
interface HeadingProps extends Omit<TextProps, 'variant'> {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
declare type HeadingComponent<E extends ElementType = 'div'> = PolymorphicComponentPropsWithRef<E, HeadingProps>;
declare function Heading<E extends ElementType = 'div'>({ size, variant, ...props }: HeadingComponent<E>): JSX.Element;
interface DisplayProps extends Omit<TextProps, 'variant'> {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}
declare type DisplayComponent<E extends ElementType = 'div'> = PolymorphicComponentPropsWithRef<E, DisplayProps>;
declare function Display<E extends ElementType = 'div'>({ size, variant, ...props }: DisplayComponent<E>): JSX.Element;
interface EyebrowProps extends Omit<TextProps, 'variant'> {
}
declare type EyebrowComponent<E extends ElementType = 'div'> = PolymorphicComponentPropsWithRef<E, EyebrowProps>;
declare function Eyebrow<E extends ElementType = 'div'>({ variant, ...props }: EyebrowComponent<E>): JSX.Element;
interface LabelProps extends Omit<TextProps, 'variant'> {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}
declare type LabelComponent<E extends ElementType = 'div'> = PolymorphicComponentPropsWithRef<E, LabelProps>;
declare function Label<E extends ElementType = 'div'>({ size, ...props }: LabelComponent<E>): JSX.Element;

declare const SvgArrowRightAngle: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgArrowRight: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgBell: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgChevronDown: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgChevronLeft: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgChevronRight: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgChevronUp: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgClose: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgCoinbase: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgCopy: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgCreate: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgDiscord: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgDownload: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgEmbed: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgInstagram: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgKebab: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgLogout: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgMetamask: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgPlus: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgQuestion: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgRainbow: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgSearch: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgShield: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgSpinner: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgTag: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgTwitter: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgWalletConnect: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare const SvgWarning: (props: SVGProps<SVGSVGElement>) => JSX.Element;

declare namespace iconComponents {
  export {
    SvgArrowRightAngle as ArrowRightAngle,
    SvgArrowRight as ArrowRight,
    SvgBell as Bell,
    SvgChevronDown as ChevronDown,
    SvgChevronLeft as ChevronLeft,
    SvgChevronRight as ChevronRight,
    SvgChevronUp as ChevronUp,
    SvgClose as Close,
    SvgCoinbase as Coinbase,
    SvgCopy as Copy,
    SvgCreate as Create,
    SvgDiscord as Discord,
    SvgDownload as Download,
    SvgEmbed as Embed,
    SvgInstagram as Instagram,
    SvgKebab as Kebab,
    SvgLogout as Logout,
    SvgMetamask as Metamask,
    SvgPlus as Plus,
    SvgQuestion as Question,
    SvgRainbow as Rainbow,
    SvgSearch as Search,
    SvgShield as Shield,
    SvgSpinner as Spinner,
    SvgTag as Tag,
    SvgTwitter as Twitter,
    SvgWalletConnect as WalletConnect,
    SvgWarning as Warning,
  };
}

declare const icons: string[];
declare type IconType = keyof typeof iconComponents;
interface IconProps extends BoxProps {
    id?: IconType;
    size?: keyof typeof iconVariants['size'];
}
declare function Icon({ id, size, ...props }: IconProps): JSX.Element;

declare const inputVariants: {
    size: {
        lg: {
            fontSize: "35px";
            fontWeight: number;
        };
    };
};

interface InputProps extends BoxProps {
    size?: keyof typeof inputVariants['size'];
}
declare type InputComponentProps<E extends ElementType> = PolymorphicComponentProps<E, BoxProps>;
declare function Input<E extends ElementType = 'input'>({ className, size, ...props }: InputComponentProps<E>): JSX.Element;

interface InputFieldProps {
    name: string;
    value?: string;
    placeholder?: string;
    label?: string;
    affix?: string;
    type?: 'text' | 'number';
    step?: number;
    icon?: IconProps['id'];
    className?: string;
    disabled?: boolean;
    error?: string;
    description?: string;
    onChange: (val: string) => void;
    onBlur?: FocusEventHandler<HTMLInputElement>;
}
declare function InputField({ value, label, name, icon, type, description, error, step, className, placeholder, affix, disabled, onChange, onBlur, ...props }: InputFieldProps): JSX.Element;

interface TextAreaProps {
    value?: string;
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;
    initialHeight?: number;
    disabled?: boolean;
    error?: string;
    description?: string;
    onChange: (val: string) => void;
    onBlur?: () => void;
}
declare function TextArea({ value, label, name, description, error, className, placeholder, disabled, initialHeight, onChange, onBlur, ...props }: TextAreaProps): JSX.Element;

declare const selectVariants: {
    size: {
        lg: {
            fontSize: "30px";
            fontWeight: number;
        };
    };
};

interface SelectProps extends FlexProps {
    autoFocus?: boolean;
    defaultValue?: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    size?: keyof typeof selectVariants['size'];
}
declare const Select: ({ className, children, size, ...props }: SelectProps) => JSX.Element;

interface SliderProps extends SliderPrimitive.SliderProps {
    range?: boolean;
    showLabel?: boolean;
    unitName?: string;
    unitNamePlural?: string;
    showInlineUnits?: boolean;
    selectedValue?: any;
}
declare function Slider({ range, showLabel, showInlineUnits, unitName, unitNamePlural, selectedValue, ...props }: SliderProps): JSX.Element;

interface TagProps extends TextProps {
    active?: boolean;
    inactive?: boolean;
    showDot?: boolean;
}
declare function Tag({ active, className, children, inactive, showDot, ...props }: TagProps): JSX.Element;

interface CheckboxProps {
    label?: string;
    name: string;
    id: string;
    checked?: CheckboxPrimitive.CheckedState | boolean;
    className?: string;
    disabled?: boolean;
    defaultChecked?: boolean;
    onChange?: Dispatch<SetStateAction<CheckboxPrimitive.CheckedState>>;
    onClick?: () => void;
}
declare function Checkbox({ label, id, name, className, checked, defaultChecked, disabled, onClick, onChange, ...props }: CheckboxProps): JSX.Element;

interface RadioButtonGroupProps extends RadioGroupProps {
    items: Omit<RadioButtonProps, 'id'>[];
}
interface RadioButtonProps {
    id: string;
    value: string;
    label?: string;
    disabled?: boolean;
}
declare function RadioButtonGroup({ className, items, ...props }: RadioButtonGroupProps): JSX.Element;

export { AspectRatio, AspectRatioProps, Button, ButtonProps, Checkbox, CheckboxProps, Display, DisplayProps, Eyebrow, EyebrowProps, Grid, GridProps, Heading, HeadingProps, Icon, IconProps, Input, InputField, InputFieldProps, InputProps, Label, LabelProps, Paragraph, ParagraphProps, RadioButtonGroup, RadioButtonProps, Select, SelectProps, Slider, SliderProps, Tag, TagProps, Text, TextArea, TextAreaProps, TextProps, icons };
