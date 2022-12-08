import $3DjNB$babelruntimehelpersesmextends from "@babel/runtime/helpers/esm/extends";
import $3DjNB$react from "react";
import {createContextScope as $3DjNB$createContextScope} from "@radix-ui/react-context";
import {createCollection as $3DjNB$createCollection} from "@radix-ui/react-collection";
import {useComposedRefs as $3DjNB$useComposedRefs} from "@radix-ui/react-compose-refs";
import {composeEventHandlers as $3DjNB$composeEventHandlers} from "@radix-ui/primitive";
import {useControllableState as $3DjNB$useControllableState} from "@radix-ui/react-use-controllable-state";
import {Primitive as $3DjNB$Primitive} from "@radix-ui/react-primitive";
import {createCollapsibleScope as $3DjNB$createCollapsibleScope, Root as $3DjNB$Root, Trigger as $3DjNB$Trigger, Content as $3DjNB$Content} from "@radix-ui/react-collapsible";
import {useId as $3DjNB$useId} from "@radix-ui/react-id";












/* -------------------------------------------------------------------------------------------------
 * Accordion
 * -----------------------------------------------------------------------------------------------*/ const $1bf158f521e1b1b4$var$ACCORDION_NAME = 'Accordion';
const $1bf158f521e1b1b4$var$ACCORDION_KEYS = [
    'Home',
    'End',
    'ArrowDown',
    'ArrowUp'
];
const [$1bf158f521e1b1b4$var$Collection, $1bf158f521e1b1b4$var$useCollection, $1bf158f521e1b1b4$var$createCollectionScope] = $3DjNB$createCollection($1bf158f521e1b1b4$var$ACCORDION_NAME);
const [$1bf158f521e1b1b4$var$createAccordionContext, $1bf158f521e1b1b4$export$9748edc328a73be1] = $3DjNB$createContextScope($1bf158f521e1b1b4$var$ACCORDION_NAME, [
    $1bf158f521e1b1b4$var$createCollectionScope,
    $3DjNB$createCollapsibleScope
]);
const $1bf158f521e1b1b4$var$useCollapsibleScope = $3DjNB$createCollapsibleScope();
const $1bf158f521e1b1b4$export$a766cd26d0d69044 = /*#__PURE__*/ $3DjNB$react.forwardRef((props, forwardedRef)=>{
    const { type: type , ...accordionProps } = props;
    const singleProps = accordionProps;
    const multipleProps = accordionProps;
    return /*#__PURE__*/ $3DjNB$react.createElement($1bf158f521e1b1b4$var$Collection.Provider, {
        scope: props.__scopeAccordion
    }, type === 'multiple' ? /*#__PURE__*/ $3DjNB$react.createElement($1bf158f521e1b1b4$var$AccordionImplMultiple, $3DjNB$babelruntimehelpersesmextends({}, multipleProps, {
        ref: forwardedRef
    })) : /*#__PURE__*/ $3DjNB$react.createElement($1bf158f521e1b1b4$var$AccordionImplSingle, $3DjNB$babelruntimehelpersesmextends({}, singleProps, {
        ref: forwardedRef
    })));
});
/*#__PURE__*/ Object.assign($1bf158f521e1b1b4$export$a766cd26d0d69044, {
    displayName: $1bf158f521e1b1b4$var$ACCORDION_NAME
});
$1bf158f521e1b1b4$export$a766cd26d0d69044.propTypes = {
    type (props) {
        const value = props.value || props.defaultValue;
        if (props.type && ![
            'single',
            'multiple'
        ].includes(props.type)) return new Error('Invalid prop `type` supplied to `Accordion`. Expected one of `single | multiple`.');
        if (props.type === 'multiple' && typeof value === 'string') return new Error('Invalid prop `type` supplied to `Accordion`. Expected `single` when `defaultValue` or `value` is type `string`.');
        if (props.type === 'single' && Array.isArray(value)) return new Error('Invalid prop `type` supplied to `Accordion`. Expected `multiple` when `defaultValue` or `value` is type `string[]`.');
        return null;
    }
};
/* -----------------------------------------------------------------------------------------------*/ const [$1bf158f521e1b1b4$var$AccordionValueProvider, $1bf158f521e1b1b4$var$useAccordionValueContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME);
const [$1bf158f521e1b1b4$var$AccordionCollapsibleProvider, $1bf158f521e1b1b4$var$useAccordionCollapsibleContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME, {
    collapsible: false
});
const $1bf158f521e1b1b4$var$AccordionImplSingle = /*#__PURE__*/ $3DjNB$react.forwardRef((props, forwardedRef)=>{
    const { value: valueProp , defaultValue: defaultValue , onValueChange: onValueChange = ()=>{} , collapsible: collapsible = false , ...accordionSingleProps } = props;
    const [value, setValue] = $3DjNB$useControllableState({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange
    });
    return /*#__PURE__*/ $3DjNB$react.createElement($1bf158f521e1b1b4$var$AccordionValueProvider, {
        scope: props.__scopeAccordion,
        value: value ? [
            value
        ] : [],
        onItemOpen: setValue,
        onItemClose: $3DjNB$react.useCallback(()=>collapsible && setValue('')
        , [
            collapsible,
            setValue
        ])
    }, /*#__PURE__*/ $3DjNB$react.createElement($1bf158f521e1b1b4$var$AccordionCollapsibleProvider, {
        scope: props.__scopeAccordion,
        collapsible: collapsible
    }, /*#__PURE__*/ $3DjNB$react.createElement($1bf158f521e1b1b4$var$AccordionImpl, $3DjNB$babelruntimehelpersesmextends({}, accordionSingleProps, {
        ref: forwardedRef
    }))));
});
/* -----------------------------------------------------------------------------------------------*/ const $1bf158f521e1b1b4$var$AccordionImplMultiple = /*#__PURE__*/ $3DjNB$react.forwardRef((props, forwardedRef)=>{
    const { value: valueProp , defaultValue: defaultValue , onValueChange: onValueChange = ()=>{} , ...accordionMultipleProps } = props;
    const [value1 = [], setValue] = $3DjNB$useControllableState({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange
    });
    const handleItemOpen = $3DjNB$react.useCallback((itemValue)=>setValue((prevValue = [])=>[
                ...prevValue,
                itemValue
            ]
        )
    , [
        setValue
    ]);
    const handleItemClose = $3DjNB$react.useCallback((itemValue)=>setValue((prevValue = [])=>prevValue.filter((value)=>value !== itemValue
            )
        )
    , [
        setValue
    ]);
    return /*#__PURE__*/ $3DjNB$react.createElement($1bf158f521e1b1b4$var$AccordionValueProvider, {
        scope: props.__scopeAccordion,
        value: value1,
        onItemOpen: handleItemOpen,
        onItemClose: handleItemClose
    }, /*#__PURE__*/ $3DjNB$react.createElement($1bf158f521e1b1b4$var$AccordionCollapsibleProvider, {
        scope: props.__scopeAccordion,
        collapsible: true
    }, /*#__PURE__*/ $3DjNB$react.createElement($1bf158f521e1b1b4$var$AccordionImpl, $3DjNB$babelruntimehelpersesmextends({}, accordionMultipleProps, {
        ref: forwardedRef
    }))));
});
/* -----------------------------------------------------------------------------------------------*/ const [$1bf158f521e1b1b4$var$AccordionImplProvider, $1bf158f521e1b1b4$var$useAccordionContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ACCORDION_NAME);
const $1bf158f521e1b1b4$var$AccordionImpl = /*#__PURE__*/ $3DjNB$react.forwardRef((props, forwardedRef)=>{
    const { __scopeAccordion: __scopeAccordion , disabled: disabled , ...accordionProps } = props;
    const accordionRef = $3DjNB$react.useRef(null);
    const composedRefs = $3DjNB$useComposedRefs(accordionRef, forwardedRef);
    const getItems = $1bf158f521e1b1b4$var$useCollection(__scopeAccordion);
    const handleKeyDown = $3DjNB$composeEventHandlers(props.onKeyDown, (event)=>{
        var _triggerCollection$cl;
        if (!$1bf158f521e1b1b4$var$ACCORDION_KEYS.includes(event.key)) return;
        const target = event.target;
        const triggerCollection = getItems().filter((item)=>{
            var _item$ref$current;
            return !((_item$ref$current = item.ref.current) !== null && _item$ref$current !== void 0 && _item$ref$current.disabled);
        });
        const triggerIndex = triggerCollection.findIndex((item)=>item.ref.current === target
        );
        const triggerCount = triggerCollection.length;
        if (triggerIndex === -1) return; // Prevents page scroll while user is navigating
        event.preventDefault();
        let nextIndex = triggerIndex;
        switch(event.key){
            case 'Home':
                nextIndex = 0;
                break;
            case 'End':
                nextIndex = triggerCount - 1;
                break;
            case 'ArrowDown':
                nextIndex = triggerIndex + 1;
                break;
            case 'ArrowUp':
                nextIndex = triggerIndex - 1;
                if (nextIndex < 0) nextIndex = triggerCount - 1;
                break;
        }
        const clampedIndex = nextIndex % triggerCount;
        (_triggerCollection$cl = triggerCollection[clampedIndex].ref.current) === null || _triggerCollection$cl === void 0 || _triggerCollection$cl.focus();
    });
    return /*#__PURE__*/ $3DjNB$react.createElement($1bf158f521e1b1b4$var$AccordionImplProvider, {
        scope: __scopeAccordion,
        disabled: disabled
    }, /*#__PURE__*/ $3DjNB$react.createElement($1bf158f521e1b1b4$var$Collection.Slot, {
        scope: __scopeAccordion
    }, /*#__PURE__*/ $3DjNB$react.createElement($3DjNB$Primitive.div, $3DjNB$babelruntimehelpersesmextends({}, accordionProps, {
        ref: composedRefs,
        onKeyDown: disabled ? undefined : handleKeyDown
    }))));
});
/* -------------------------------------------------------------------------------------------------
 * AccordionItem
 * -----------------------------------------------------------------------------------------------*/ const $1bf158f521e1b1b4$var$ITEM_NAME = 'AccordionItem';
const [$1bf158f521e1b1b4$var$AccordionItemProvider, $1bf158f521e1b1b4$var$useAccordionItemContext] = $1bf158f521e1b1b4$var$createAccordionContext($1bf158f521e1b1b4$var$ITEM_NAME);
/**
 * `AccordionItem` contains all of the parts of a collapsible section inside of an `Accordion`.
 */ const $1bf158f521e1b1b4$export$d99097c13d4dac9f = /*#__PURE__*/ $3DjNB$react.forwardRef((props, forwardedRef)=>{
    const { __scopeAccordion: __scopeAccordion , value: value , ...accordionItemProps } = props;
    const accordionContext = $1bf158f521e1b1b4$var$useAccordionContext($1bf158f521e1b1b4$var$ITEM_NAME, __scopeAccordion);
    const valueContext = $1bf158f521e1b1b4$var$useAccordionValueContext($1bf158f521e1b1b4$var$ITEM_NAME, __scopeAccordion);
    const collapsibleScope = $1bf158f521e1b1b4$var$useCollapsibleScope(__scopeAccordion);
    const triggerId = $3DjNB$useId();
    const open1 = value && valueContext.value.includes(value) || false;
    const disabled = accordionContext.disabled || props.disabled;
    return /*#__PURE__*/ $3DjNB$react.createElement($1bf158f521e1b1b4$var$AccordionItemProvider, {
        scope: __scopeAccordion,
        open: open1,
        disabled: disabled,
        triggerId: triggerId
    }, /*#__PURE__*/ $3DjNB$react.createElement($3DjNB$Root, $3DjNB$babelruntimehelpersesmextends({
        "data-state": open1 ? 'open' : 'closed'
    }, collapsibleScope, accordionItemProps, {
        ref: forwardedRef,
        disabled: disabled,
        open: open1,
        onOpenChange: (open)=>{
            if (open) valueContext.onItemOpen(value);
            else valueContext.onItemClose(value);
        }
    })));
});
/*#__PURE__*/ Object.assign($1bf158f521e1b1b4$export$d99097c13d4dac9f, {
    displayName: $1bf158f521e1b1b4$var$ITEM_NAME
});
/* -------------------------------------------------------------------------------------------------
 * AccordionHeader
 * -----------------------------------------------------------------------------------------------*/ const $1bf158f521e1b1b4$var$HEADER_NAME = 'AccordionHeader';
/**
 * `AccordionHeader` contains the content for the parts of an `AccordionItem` that will be visible
 * whether or not its content is collapsed.
 */ const $1bf158f521e1b1b4$export$5e3e5deaaf81ee41 = /*#__PURE__*/ $3DjNB$react.forwardRef((props, forwardedRef)=>{
    const { __scopeAccordion: __scopeAccordion , ...headerProps } = props;
    const itemContext = $1bf158f521e1b1b4$var$useAccordionItemContext($1bf158f521e1b1b4$var$HEADER_NAME, __scopeAccordion);
    return /*#__PURE__*/ $3DjNB$react.createElement($3DjNB$Primitive.h3, $3DjNB$babelruntimehelpersesmextends({
        "data-state": $1bf158f521e1b1b4$var$getState(itemContext.open),
        "data-disabled": itemContext.disabled ? '' : undefined
    }, headerProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($1bf158f521e1b1b4$export$5e3e5deaaf81ee41, {
    displayName: $1bf158f521e1b1b4$var$HEADER_NAME
});
/* -------------------------------------------------------------------------------------------------
 * AccordionTrigger
 * -----------------------------------------------------------------------------------------------*/ const $1bf158f521e1b1b4$var$TRIGGER_NAME = 'AccordionTrigger';
/**
 * `AccordionTrigger` is the trigger that toggles the collapsed state of an `AccordionItem`. It
 * should always be nested inside of an `AccordionHeader`.
 */ const $1bf158f521e1b1b4$export$94e939b1f85bdd73 = /*#__PURE__*/ $3DjNB$react.forwardRef((props, forwardedRef)=>{
    const { __scopeAccordion: __scopeAccordion , ...triggerProps } = props;
    const itemContext = $1bf158f521e1b1b4$var$useAccordionItemContext($1bf158f521e1b1b4$var$TRIGGER_NAME, __scopeAccordion);
    const collapsibleContext = $1bf158f521e1b1b4$var$useAccordionCollapsibleContext($1bf158f521e1b1b4$var$TRIGGER_NAME, __scopeAccordion);
    const collapsibleScope = $1bf158f521e1b1b4$var$useCollapsibleScope(__scopeAccordion);
    return /*#__PURE__*/ $3DjNB$react.createElement($1bf158f521e1b1b4$var$Collection.ItemSlot, {
        scope: __scopeAccordion
    }, /*#__PURE__*/ $3DjNB$react.createElement($3DjNB$Trigger, $3DjNB$babelruntimehelpersesmextends({
        "aria-disabled": itemContext.open && !collapsibleContext.collapsible || undefined,
        id: itemContext.triggerId
    }, collapsibleScope, triggerProps, {
        ref: forwardedRef
    })));
});
/*#__PURE__*/ Object.assign($1bf158f521e1b1b4$export$94e939b1f85bdd73, {
    displayName: $1bf158f521e1b1b4$var$TRIGGER_NAME
});
/* -------------------------------------------------------------------------------------------------
 * AccordionContent
 * -----------------------------------------------------------------------------------------------*/ const $1bf158f521e1b1b4$var$CONTENT_NAME = 'AccordionContent';
/**
 * `AccordionContent` contains the collapsible content for an `AccordionItem`.
 */ const $1bf158f521e1b1b4$export$985b9a77379b54a0 = /*#__PURE__*/ $3DjNB$react.forwardRef((props, forwardedRef)=>{
    const { __scopeAccordion: __scopeAccordion , ...contentProps } = props;
    const itemContext = $1bf158f521e1b1b4$var$useAccordionItemContext($1bf158f521e1b1b4$var$CONTENT_NAME, __scopeAccordion);
    const collapsibleScope = $1bf158f521e1b1b4$var$useCollapsibleScope(__scopeAccordion);
    return /*#__PURE__*/ $3DjNB$react.createElement($3DjNB$Content, $3DjNB$babelruntimehelpersesmextends({
        role: "region",
        "aria-labelledby": itemContext.triggerId
    }, collapsibleScope, contentProps, {
        ref: forwardedRef,
        style: {
            ['--radix-accordion-content-height']: 'var(--radix-collapsible-content-height)',
            ['--radix-accordion-content-width']: 'var(--radix-collapsible-content-width)',
            ...props.style
        }
    }));
});
/*#__PURE__*/ Object.assign($1bf158f521e1b1b4$export$985b9a77379b54a0, {
    displayName: $1bf158f521e1b1b4$var$CONTENT_NAME
});
/* -----------------------------------------------------------------------------------------------*/ function $1bf158f521e1b1b4$var$getState(open) {
    return open ? 'open' : 'closed';
}
const $1bf158f521e1b1b4$export$be92b6f5f03c0fe9 = $1bf158f521e1b1b4$export$a766cd26d0d69044;
const $1bf158f521e1b1b4$export$6d08773d2e66f8f2 = $1bf158f521e1b1b4$export$d99097c13d4dac9f;
const $1bf158f521e1b1b4$export$8b251419efc915eb = $1bf158f521e1b1b4$export$5e3e5deaaf81ee41;
const $1bf158f521e1b1b4$export$41fb9f06171c75f4 = $1bf158f521e1b1b4$export$94e939b1f85bdd73;
const $1bf158f521e1b1b4$export$7c6e2c02157bb7d2 = $1bf158f521e1b1b4$export$985b9a77379b54a0;




export {$1bf158f521e1b1b4$export$9748edc328a73be1 as createAccordionScope, $1bf158f521e1b1b4$export$a766cd26d0d69044 as Accordion, $1bf158f521e1b1b4$export$d99097c13d4dac9f as AccordionItem, $1bf158f521e1b1b4$export$5e3e5deaaf81ee41 as AccordionHeader, $1bf158f521e1b1b4$export$94e939b1f85bdd73 as AccordionTrigger, $1bf158f521e1b1b4$export$985b9a77379b54a0 as AccordionContent, $1bf158f521e1b1b4$export$be92b6f5f03c0fe9 as Root, $1bf158f521e1b1b4$export$6d08773d2e66f8f2 as Item, $1bf158f521e1b1b4$export$8b251419efc915eb as Header, $1bf158f521e1b1b4$export$41fb9f06171c75f4 as Trigger, $1bf158f521e1b1b4$export$7c6e2c02157bb7d2 as Content};
//# sourceMappingURL=index.module.js.map
