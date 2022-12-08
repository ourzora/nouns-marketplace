var $47SRi$babelruntimehelpersextends = require("@babel/runtime/helpers/extends");
var $47SRi$react = require("react");
var $47SRi$radixuireactcontext = require("@radix-ui/react-context");
var $47SRi$radixuireactcollection = require("@radix-ui/react-collection");
var $47SRi$radixuireactcomposerefs = require("@radix-ui/react-compose-refs");
var $47SRi$radixuiprimitive = require("@radix-ui/primitive");
var $47SRi$radixuireactusecontrollablestate = require("@radix-ui/react-use-controllable-state");
var $47SRi$radixuireactprimitive = require("@radix-ui/react-primitive");
var $47SRi$radixuireactcollapsible = require("@radix-ui/react-collapsible");
var $47SRi$radixuireactid = require("@radix-ui/react-id");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$export(module.exports, "createAccordionScope", () => $0f4a20de0660bfd8$export$9748edc328a73be1);
$parcel$export(module.exports, "Accordion", () => $0f4a20de0660bfd8$export$a766cd26d0d69044);
$parcel$export(module.exports, "AccordionItem", () => $0f4a20de0660bfd8$export$d99097c13d4dac9f);
$parcel$export(module.exports, "AccordionHeader", () => $0f4a20de0660bfd8$export$5e3e5deaaf81ee41);
$parcel$export(module.exports, "AccordionTrigger", () => $0f4a20de0660bfd8$export$94e939b1f85bdd73);
$parcel$export(module.exports, "AccordionContent", () => $0f4a20de0660bfd8$export$985b9a77379b54a0);
$parcel$export(module.exports, "Root", () => $0f4a20de0660bfd8$export$be92b6f5f03c0fe9);
$parcel$export(module.exports, "Item", () => $0f4a20de0660bfd8$export$6d08773d2e66f8f2);
$parcel$export(module.exports, "Header", () => $0f4a20de0660bfd8$export$8b251419efc915eb);
$parcel$export(module.exports, "Trigger", () => $0f4a20de0660bfd8$export$41fb9f06171c75f4);
$parcel$export(module.exports, "Content", () => $0f4a20de0660bfd8$export$7c6e2c02157bb7d2);











/* -------------------------------------------------------------------------------------------------
 * Accordion
 * -----------------------------------------------------------------------------------------------*/ const $0f4a20de0660bfd8$var$ACCORDION_NAME = 'Accordion';
const $0f4a20de0660bfd8$var$ACCORDION_KEYS = [
    'Home',
    'End',
    'ArrowDown',
    'ArrowUp'
];
const [$0f4a20de0660bfd8$var$Collection, $0f4a20de0660bfd8$var$useCollection, $0f4a20de0660bfd8$var$createCollectionScope] = $47SRi$radixuireactcollection.createCollection($0f4a20de0660bfd8$var$ACCORDION_NAME);
const [$0f4a20de0660bfd8$var$createAccordionContext, $0f4a20de0660bfd8$export$9748edc328a73be1] = $47SRi$radixuireactcontext.createContextScope($0f4a20de0660bfd8$var$ACCORDION_NAME, [
    $0f4a20de0660bfd8$var$createCollectionScope,
    $47SRi$radixuireactcollapsible.createCollapsibleScope
]);
const $0f4a20de0660bfd8$var$useCollapsibleScope = $47SRi$radixuireactcollapsible.createCollapsibleScope();
const $0f4a20de0660bfd8$export$a766cd26d0d69044 = /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).forwardRef((props, forwardedRef)=>{
    const { type: type , ...accordionProps } = props;
    const singleProps = accordionProps;
    const multipleProps = accordionProps;
    return /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($0f4a20de0660bfd8$var$Collection.Provider, {
        scope: props.__scopeAccordion
    }, type === 'multiple' ? /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($0f4a20de0660bfd8$var$AccordionImplMultiple, ($parcel$interopDefault($47SRi$babelruntimehelpersextends))({}, multipleProps, {
        ref: forwardedRef
    })) : /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($0f4a20de0660bfd8$var$AccordionImplSingle, ($parcel$interopDefault($47SRi$babelruntimehelpersextends))({}, singleProps, {
        ref: forwardedRef
    })));
});
/*#__PURE__*/ Object.assign($0f4a20de0660bfd8$export$a766cd26d0d69044, {
    displayName: $0f4a20de0660bfd8$var$ACCORDION_NAME
});
$0f4a20de0660bfd8$export$a766cd26d0d69044.propTypes = {
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
/* -----------------------------------------------------------------------------------------------*/ const [$0f4a20de0660bfd8$var$AccordionValueProvider, $0f4a20de0660bfd8$var$useAccordionValueContext] = $0f4a20de0660bfd8$var$createAccordionContext($0f4a20de0660bfd8$var$ACCORDION_NAME);
const [$0f4a20de0660bfd8$var$AccordionCollapsibleProvider, $0f4a20de0660bfd8$var$useAccordionCollapsibleContext] = $0f4a20de0660bfd8$var$createAccordionContext($0f4a20de0660bfd8$var$ACCORDION_NAME, {
    collapsible: false
});
const $0f4a20de0660bfd8$var$AccordionImplSingle = /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).forwardRef((props, forwardedRef)=>{
    const { value: valueProp , defaultValue: defaultValue , onValueChange: onValueChange = ()=>{} , collapsible: collapsible = false , ...accordionSingleProps } = props;
    const [value, setValue] = $47SRi$radixuireactusecontrollablestate.useControllableState({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange
    });
    return /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($0f4a20de0660bfd8$var$AccordionValueProvider, {
        scope: props.__scopeAccordion,
        value: value ? [
            value
        ] : [],
        onItemOpen: setValue,
        onItemClose: ($parcel$interopDefault($47SRi$react)).useCallback(()=>collapsible && setValue('')
        , [
            collapsible,
            setValue
        ])
    }, /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($0f4a20de0660bfd8$var$AccordionCollapsibleProvider, {
        scope: props.__scopeAccordion,
        collapsible: collapsible
    }, /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($0f4a20de0660bfd8$var$AccordionImpl, ($parcel$interopDefault($47SRi$babelruntimehelpersextends))({}, accordionSingleProps, {
        ref: forwardedRef
    }))));
});
/* -----------------------------------------------------------------------------------------------*/ const $0f4a20de0660bfd8$var$AccordionImplMultiple = /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).forwardRef((props, forwardedRef)=>{
    const { value: valueProp , defaultValue: defaultValue , onValueChange: onValueChange = ()=>{} , ...accordionMultipleProps } = props;
    const [value1 = [], setValue] = $47SRi$radixuireactusecontrollablestate.useControllableState({
        prop: valueProp,
        defaultProp: defaultValue,
        onChange: onValueChange
    });
    const handleItemOpen = ($parcel$interopDefault($47SRi$react)).useCallback((itemValue)=>setValue((prevValue = [])=>[
                ...prevValue,
                itemValue
            ]
        )
    , [
        setValue
    ]);
    const handleItemClose = ($parcel$interopDefault($47SRi$react)).useCallback((itemValue)=>setValue((prevValue = [])=>prevValue.filter((value)=>value !== itemValue
            )
        )
    , [
        setValue
    ]);
    return /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($0f4a20de0660bfd8$var$AccordionValueProvider, {
        scope: props.__scopeAccordion,
        value: value1,
        onItemOpen: handleItemOpen,
        onItemClose: handleItemClose
    }, /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($0f4a20de0660bfd8$var$AccordionCollapsibleProvider, {
        scope: props.__scopeAccordion,
        collapsible: true
    }, /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($0f4a20de0660bfd8$var$AccordionImpl, ($parcel$interopDefault($47SRi$babelruntimehelpersextends))({}, accordionMultipleProps, {
        ref: forwardedRef
    }))));
});
/* -----------------------------------------------------------------------------------------------*/ const [$0f4a20de0660bfd8$var$AccordionImplProvider, $0f4a20de0660bfd8$var$useAccordionContext] = $0f4a20de0660bfd8$var$createAccordionContext($0f4a20de0660bfd8$var$ACCORDION_NAME);
const $0f4a20de0660bfd8$var$AccordionImpl = /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).forwardRef((props, forwardedRef)=>{
    const { __scopeAccordion: __scopeAccordion , disabled: disabled , ...accordionProps } = props;
    const accordionRef = ($parcel$interopDefault($47SRi$react)).useRef(null);
    const composedRefs = $47SRi$radixuireactcomposerefs.useComposedRefs(accordionRef, forwardedRef);
    const getItems = $0f4a20de0660bfd8$var$useCollection(__scopeAccordion);
    const handleKeyDown = $47SRi$radixuiprimitive.composeEventHandlers(props.onKeyDown, (event)=>{
        var _triggerCollection$cl;
        if (!$0f4a20de0660bfd8$var$ACCORDION_KEYS.includes(event.key)) return;
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
    return /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($0f4a20de0660bfd8$var$AccordionImplProvider, {
        scope: __scopeAccordion,
        disabled: disabled
    }, /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($0f4a20de0660bfd8$var$Collection.Slot, {
        scope: __scopeAccordion
    }, /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($47SRi$radixuireactprimitive.Primitive.div, ($parcel$interopDefault($47SRi$babelruntimehelpersextends))({}, accordionProps, {
        ref: composedRefs,
        onKeyDown: disabled ? undefined : handleKeyDown
    }))));
});
/* -------------------------------------------------------------------------------------------------
 * AccordionItem
 * -----------------------------------------------------------------------------------------------*/ const $0f4a20de0660bfd8$var$ITEM_NAME = 'AccordionItem';
const [$0f4a20de0660bfd8$var$AccordionItemProvider, $0f4a20de0660bfd8$var$useAccordionItemContext] = $0f4a20de0660bfd8$var$createAccordionContext($0f4a20de0660bfd8$var$ITEM_NAME);
/**
 * `AccordionItem` contains all of the parts of a collapsible section inside of an `Accordion`.
 */ const $0f4a20de0660bfd8$export$d99097c13d4dac9f = /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).forwardRef((props, forwardedRef)=>{
    const { __scopeAccordion: __scopeAccordion , value: value , ...accordionItemProps } = props;
    const accordionContext = $0f4a20de0660bfd8$var$useAccordionContext($0f4a20de0660bfd8$var$ITEM_NAME, __scopeAccordion);
    const valueContext = $0f4a20de0660bfd8$var$useAccordionValueContext($0f4a20de0660bfd8$var$ITEM_NAME, __scopeAccordion);
    const collapsibleScope = $0f4a20de0660bfd8$var$useCollapsibleScope(__scopeAccordion);
    const triggerId = $47SRi$radixuireactid.useId();
    const open1 = value && valueContext.value.includes(value) || false;
    const disabled = accordionContext.disabled || props.disabled;
    return /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($0f4a20de0660bfd8$var$AccordionItemProvider, {
        scope: __scopeAccordion,
        open: open1,
        disabled: disabled,
        triggerId: triggerId
    }, /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($47SRi$radixuireactcollapsible.Root, ($parcel$interopDefault($47SRi$babelruntimehelpersextends))({
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
/*#__PURE__*/ Object.assign($0f4a20de0660bfd8$export$d99097c13d4dac9f, {
    displayName: $0f4a20de0660bfd8$var$ITEM_NAME
});
/* -------------------------------------------------------------------------------------------------
 * AccordionHeader
 * -----------------------------------------------------------------------------------------------*/ const $0f4a20de0660bfd8$var$HEADER_NAME = 'AccordionHeader';
/**
 * `AccordionHeader` contains the content for the parts of an `AccordionItem` that will be visible
 * whether or not its content is collapsed.
 */ const $0f4a20de0660bfd8$export$5e3e5deaaf81ee41 = /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).forwardRef((props, forwardedRef)=>{
    const { __scopeAccordion: __scopeAccordion , ...headerProps } = props;
    const itemContext = $0f4a20de0660bfd8$var$useAccordionItemContext($0f4a20de0660bfd8$var$HEADER_NAME, __scopeAccordion);
    return /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($47SRi$radixuireactprimitive.Primitive.h3, ($parcel$interopDefault($47SRi$babelruntimehelpersextends))({
        "data-state": $0f4a20de0660bfd8$var$getState(itemContext.open),
        "data-disabled": itemContext.disabled ? '' : undefined
    }, headerProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($0f4a20de0660bfd8$export$5e3e5deaaf81ee41, {
    displayName: $0f4a20de0660bfd8$var$HEADER_NAME
});
/* -------------------------------------------------------------------------------------------------
 * AccordionTrigger
 * -----------------------------------------------------------------------------------------------*/ const $0f4a20de0660bfd8$var$TRIGGER_NAME = 'AccordionTrigger';
/**
 * `AccordionTrigger` is the trigger that toggles the collapsed state of an `AccordionItem`. It
 * should always be nested inside of an `AccordionHeader`.
 */ const $0f4a20de0660bfd8$export$94e939b1f85bdd73 = /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).forwardRef((props, forwardedRef)=>{
    const { __scopeAccordion: __scopeAccordion , ...triggerProps } = props;
    const itemContext = $0f4a20de0660bfd8$var$useAccordionItemContext($0f4a20de0660bfd8$var$TRIGGER_NAME, __scopeAccordion);
    const collapsibleContext = $0f4a20de0660bfd8$var$useAccordionCollapsibleContext($0f4a20de0660bfd8$var$TRIGGER_NAME, __scopeAccordion);
    const collapsibleScope = $0f4a20de0660bfd8$var$useCollapsibleScope(__scopeAccordion);
    return /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($0f4a20de0660bfd8$var$Collection.ItemSlot, {
        scope: __scopeAccordion
    }, /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($47SRi$radixuireactcollapsible.Trigger, ($parcel$interopDefault($47SRi$babelruntimehelpersextends))({
        "aria-disabled": itemContext.open && !collapsibleContext.collapsible || undefined,
        id: itemContext.triggerId
    }, collapsibleScope, triggerProps, {
        ref: forwardedRef
    })));
});
/*#__PURE__*/ Object.assign($0f4a20de0660bfd8$export$94e939b1f85bdd73, {
    displayName: $0f4a20de0660bfd8$var$TRIGGER_NAME
});
/* -------------------------------------------------------------------------------------------------
 * AccordionContent
 * -----------------------------------------------------------------------------------------------*/ const $0f4a20de0660bfd8$var$CONTENT_NAME = 'AccordionContent';
/**
 * `AccordionContent` contains the collapsible content for an `AccordionItem`.
 */ const $0f4a20de0660bfd8$export$985b9a77379b54a0 = /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).forwardRef((props, forwardedRef)=>{
    const { __scopeAccordion: __scopeAccordion , ...contentProps } = props;
    const itemContext = $0f4a20de0660bfd8$var$useAccordionItemContext($0f4a20de0660bfd8$var$CONTENT_NAME, __scopeAccordion);
    const collapsibleScope = $0f4a20de0660bfd8$var$useCollapsibleScope(__scopeAccordion);
    return /*#__PURE__*/ ($parcel$interopDefault($47SRi$react)).createElement($47SRi$radixuireactcollapsible.Content, ($parcel$interopDefault($47SRi$babelruntimehelpersextends))({
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
/*#__PURE__*/ Object.assign($0f4a20de0660bfd8$export$985b9a77379b54a0, {
    displayName: $0f4a20de0660bfd8$var$CONTENT_NAME
});
/* -----------------------------------------------------------------------------------------------*/ function $0f4a20de0660bfd8$var$getState(open) {
    return open ? 'open' : 'closed';
}
const $0f4a20de0660bfd8$export$be92b6f5f03c0fe9 = $0f4a20de0660bfd8$export$a766cd26d0d69044;
const $0f4a20de0660bfd8$export$6d08773d2e66f8f2 = $0f4a20de0660bfd8$export$d99097c13d4dac9f;
const $0f4a20de0660bfd8$export$8b251419efc915eb = $0f4a20de0660bfd8$export$5e3e5deaaf81ee41;
const $0f4a20de0660bfd8$export$41fb9f06171c75f4 = $0f4a20de0660bfd8$export$94e939b1f85bdd73;
const $0f4a20de0660bfd8$export$7c6e2c02157bb7d2 = $0f4a20de0660bfd8$export$985b9a77379b54a0;




//# sourceMappingURL=index.js.map
