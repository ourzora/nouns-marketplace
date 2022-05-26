import * as _vanilla_extract_private from '@vanilla-extract/private';
export { A as Atoms, M as Mixins, b as MixinsProp, a as atoms, m as mixins } from './mixins-01c373b1.js';
export { E as ExtendableProps, I as InheritableElementProps, a as PolymorphicComponentProps, c as PolymorphicComponentPropsWithRef, b as PolymorphicRef, P as PropsOf } from './polymorphic-4daafd75.js';
import '@vanilla-extract/sprinkles/dist/declarations/src/createSprinkles';
import 'react';

declare const colorScheme: _vanilla_extract_private.MapLeafNodes<{
    foreground: {
        primary: string;
        secondary: string;
        tertiary: string;
        reverse: string;
    };
    background: {
        primary: string;
        secondary: string;
        tertiary: string;
        destructive: string;
    };
    border: {
        primary: string;
        secondary: string;
        tertiary: string;
    };
    text: {
        primary: string;
        secondary: string;
        tertiary: string;
        primaryInverse: string;
    };
    error: {
        light: string;
        default: string;
        dark: string;
        background: string;
    };
}, _vanilla_extract_private.CSSVarFunction>;
declare const defaultColorScheme: string;
declare const darkColorScheme: string;
declare const theme: string;
declare const vars: _vanilla_extract_private.MapLeafNodes<{
    color: _vanilla_extract_private.MapLeafNodes<{
        foreground: {
            primary: string;
            secondary: string;
            tertiary: string;
            reverse: string;
        };
        background: {
            primary: string;
            secondary: string;
            tertiary: string;
            destructive: string;
        };
        border: {
            primary: string;
            secondary: string;
            tertiary: string;
        };
        text: {
            primary: string;
            secondary: string;
            tertiary: string;
            primaryInverse: string;
        };
        error: {
            light: string;
            default: string;
            dark: string;
            background: string;
        };
    }, _vanilla_extract_private.CSSVarFunction>;
    space: {
        x0: string;
        x1: string;
        x2: string;
        x3: string;
        x4: string;
        x5: string;
        x6: string;
        x7: string;
        x8: string;
        x9: string;
        x10: string;
        x11: string;
        x12: string;
        x13: string;
        x14: string;
        x15: string;
        x16: string;
        x17: string;
        x18: string;
        x19: string;
        x20: string;
        x21: string;
        x22: string;
        x23: string;
        x24: string;
        x25: string;
        x26: string;
        x27: string;
        x28: string;
        x29: string;
        x30: string;
        auto: string;
    };
    size: {
        readonly '100vw': "100vh";
        readonly '100vh': "100vh";
        readonly '100%': "100%";
        readonly x0: string;
        readonly x1: string;
        readonly x2: string;
        readonly x3: string;
        readonly x4: string;
        readonly x5: string;
        readonly x6: string;
        readonly x7: string;
        readonly x8: string;
        readonly x9: string;
        readonly x10: string;
        readonly x11: string;
        readonly x12: string;
        readonly x13: string;
        readonly x14: string;
        readonly x15: string;
        readonly x16: string;
        readonly x17: string;
        readonly x18: string;
        readonly x19: string;
        readonly x20: string;
        readonly x21: string;
        readonly x22: string;
        readonly x23: string;
        readonly x24: string;
        readonly x25: string;
        readonly x26: string;
        readonly x27: string;
        readonly x28: string;
        readonly x29: string;
        readonly x30: string;
        readonly auto: string;
    };
    radii: {
        readonly small: "4px";
        readonly normal: "5px";
        readonly curved: "10px";
        readonly phat: "20px";
        readonly round: "9999px";
    };
    border: {
        solid: string;
    };
    ease: {
        in: string;
        out: string;
        inOut: string;
    };
}, _vanilla_extract_private.CSSVarFunction>;

interface ZordOptions {
    colorScheme?: string;
}
declare function zord({ colorScheme }?: ZordOptions): string;

export { ZordOptions, colorScheme, darkColorScheme, defaultColorScheme, theme, vars, zord };
