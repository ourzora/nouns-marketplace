import React from "react";
import * as Radix from "@radix-ui/react-primitive";
import { Primitive } from "@radix-ui/react-primitive";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
export const createAccordionScope: import("@radix-ui/react-context").CreateScope;
export interface AccordionSingleProps extends AccordionImplSingleProps {
    type: 'single';
}
export interface AccordionMultipleProps extends AccordionImplMultipleProps {
    type: 'multiple';
}
export const Accordion: React.ForwardRefExoticComponent<(AccordionSingleProps | AccordionMultipleProps) & React.RefAttributes<HTMLDivElement>>;
interface AccordionImplSingleProps extends AccordionImplProps {
    /**
     * The controlled stateful value of the accordion item whose content is expanded.
     */
    value?: string;
    /**
     * The value of the item whose content is expanded when the accordion is initially rendered. Use
     * `defaultValue` if you do not need to control the state of an accordion.
     */
    defaultValue?: string;
    /**
     * The callback that fires when the state of the accordion changes.
     */
    onValueChange?(value: string): void;
    /**
     * Whether an accordion item can be collapsed after it has been opened.
     * @default false
     */
    collapsible?: boolean;
}
interface AccordionImplMultipleProps extends AccordionImplProps {
    /**
     * The controlled stateful value of the accordion items whose contents are expanded.
     */
    value?: string[];
    /**
     * The value of the items whose contents are expanded when the accordion is initially rendered. Use
     * `defaultValue` if you do not need to control the state of an accordion.
     */
    defaultValue?: string[];
    /**
     * The callback that fires when the state of the accordion changes.
     */
    onValueChange?(value: string[]): void;
}
type PrimitiveDivProps = Radix.ComponentPropsWithoutRef<typeof Primitive.div>;
interface AccordionImplProps extends PrimitiveDivProps {
    /**
     * Whether or not an accordion is disabled from user interaction.
     *
     * @defaultValue false
     */
    disabled?: boolean;
}
type CollapsibleProps = Radix.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root>;
export interface AccordionItemProps extends Omit<CollapsibleProps, 'open' | 'defaultOpen' | 'onOpenChange'> {
    /**
     * Whether or not an accordion item is disabled from user interaction.
     *
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * A string value for the accordion item. All items within an accordion should use a unique value.
     */
    value: string;
}
/**
 * `AccordionItem` contains all of the parts of a collapsible section inside of an `Accordion`.
 */
export const AccordionItem: React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLDivElement>>;
type PrimitiveHeading3Props = Radix.ComponentPropsWithoutRef<typeof Primitive.h3>;
export interface AccordionHeaderProps extends PrimitiveHeading3Props {
}
/**
 * `AccordionHeader` contains the content for the parts of an `AccordionItem` that will be visible
 * whether or not its content is collapsed.
 */
export const AccordionHeader: React.ForwardRefExoticComponent<AccordionHeaderProps & React.RefAttributes<HTMLHeadingElement>>;
type CollapsibleTriggerProps = Radix.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Trigger>;
export interface AccordionTriggerProps extends CollapsibleTriggerProps {
}
/**
 * `AccordionTrigger` is the trigger that toggles the collapsed state of an `AccordionItem`. It
 * should always be nested inside of an `AccordionHeader`.
 */
export const AccordionTrigger: React.ForwardRefExoticComponent<AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>>;
type CollapsibleContentProps = Radix.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Content>;
export interface AccordionContentProps extends CollapsibleContentProps {
}
/**
 * `AccordionContent` contains the collapsible content for an `AccordionItem`.
 */
export const AccordionContent: React.ForwardRefExoticComponent<AccordionContentProps & React.RefAttributes<HTMLDivElement>>;
export const Root: React.ForwardRefExoticComponent<(AccordionSingleProps | AccordionMultipleProps) & React.RefAttributes<HTMLDivElement>>;
export const Item: React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLDivElement>>;
export const Header: React.ForwardRefExoticComponent<AccordionHeaderProps & React.RefAttributes<HTMLHeadingElement>>;
export const Trigger: React.ForwardRefExoticComponent<AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export const Content: React.ForwardRefExoticComponent<AccordionContentProps & React.RefAttributes<HTMLDivElement>>;

//# sourceMappingURL=index.d.ts.map
