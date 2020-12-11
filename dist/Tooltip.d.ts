import { Instance as TooltipInstance, Props as TippyProps, ReferenceElement } from "tippy.js";
interface Target extends ReferenceElement {
    dataset?: DOMStringMap;
}
interface BaseProperties extends TippyProps {
    theme: Theme;
    placement: Placement;
    class: string;
    onAfterUpdate(instance: TooltipInstance, properties: Partial<BaseProperties>): void;
    onBeforeUpdate(instance: TooltipInstance, properties: Partial<BaseProperties>): void;
    onCreate(instance: TooltipInstance): void;
    onDestroy(instance: TooltipInstance): void;
    onHidden(instance: TooltipInstance): void;
    onHide(instance: TooltipInstance): void | false;
    onMount(instance: TooltipInstance): void;
    onShow(instance: TooltipInstance): void | false;
    onShown(instance: TooltipInstance): void;
    onTrigger(instance: TooltipInstance, event: Event): void;
    onUntrigger(instance: TooltipInstance, event: Event): void;
    onClickOutside(instance: TooltipInstance, event: Event): void;
}
declare type Theme = 'dark' | 'light';
declare type Placement = "top" | "top-start" | "top-end" | "right" | "right-start" | "right-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "auto" | "auto-start" | "auto-end";
declare type SetProperties = Partial<BaseProperties> & {
    trigger?: Trigger;
    target: string;
};
declare type Trigger = 'mouseenter' | 'focus' | 'mouseenter focus' | 'focusin' | 'click' | 'manual';
/**
 * Adaptation for Tippy.js.
 *
 * @see set
 * @see getInstance
 */
declare class Tooltip {
    /**
     * Reconfiguration prevention indicator.
     *
     * @private
     */
    private static initiated;
    /**
     * Setting up.
     *
     * @private
     */
    private static init;
    /**
     * Sets the tooltip handler to the target element.
     *
     * @param properties Properties.
     */
    static set(properties: SetProperties): void;
    /**
     * Returns an existing instance, otherwise returns undefined.
     *
     * @param target Target item.
     */
    static getInstance(target: Target): TooltipInstance | undefined;
    /**
     * Sets properties for an instance.
     *
     * @param onShow
     * @param instance
     * @private
     */
    private static setProperties;
    /**
     * Returns the property obtained from the target element.
     *
     * @param target Target item.
     * @private
     */
    private static getProperties;
    /**
     * Retrieves attributes prefixed with "tooltip" and converts them to properties.
     *
     * @param target Target item.
     * @private
     */
    private static getData;
}
export default Tooltip;
export { TooltipInstance, BaseProperties, };
