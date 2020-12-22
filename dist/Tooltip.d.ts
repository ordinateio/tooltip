import { Instance as TippyInstance, Props, ReferenceElement } from 'tippy.js';
interface Target extends ReferenceElement {
    dataset?: DOMStringMap;
}
interface TooltipInstance extends TippyInstance {
    reference: Target;
}
interface TooltipProperties extends Props {
    theme: Theme;
    placement: Placement;
    animation: Animation;
    class: string;
    /**
     * Lifecycle hook invoked after the tooltip's properties have been updated.
     *
     * @param instance
     * @param properties
     */
    onAfterUpdate(instance: TooltipInstance, properties: Partial<TooltipProperties>): void;
    /**
     * Lifecycle hook invoked before the tooltip's properties have been updated.
     *
     * @param instance
     * @param properties
     */
    onBeforeUpdate(instance: TooltipInstance, properties: Partial<TooltipProperties>): void;
    /**
     * Lifecycle hook invoked when the tooltip has been created.
     *
     * @param instance
     */
    onCreate(instance: TooltipInstance): void;
    /**
     * Lifecycle hook invoked when the tooltip has been destroyed.
     *
     * @param instance
     */
    onDestroy(instance: TooltipInstance): void;
    /**
     * Lifecycle hook invoked when the tooltip has fully transitioned out and is unmounted from the DOM.
     *
     * @param instance
     */
    onHidden(instance: TooltipInstance): void;
    /**
     * Lifecycle hook invoked when the tooltip begins to transition out.
     *
     * @param instance
     */
    onHide(instance: TooltipInstance): void;
    /**
     * Lifecycle hook invoked when the tooltip has been mounted to the DOM.
     *
     * @param instance
     */
    onMount(instance: TooltipInstance): void;
    /**
     * Lifecycle hook invoked when the tooltip begins to transition in.
     *
     * @param instance
     */
    onShow(instance: TooltipInstance): void;
    /**
     * Lifecycle hook invoked when the tooltip has fully transitioned in.
     *
     * @param instance
     */
    onShown(instance: TooltipInstance): void;
    /**
     * Lifecycle hook invoked when the tooltip was triggered by a real DOM event (called before onShow) to show the tooltip.
     *
     * @param instance
     * @param event
     */
    onTrigger(instance: TooltipInstance, event: Event): void;
    /**
     * Lifecycle hook invoked when the tooltip was triggered by a real DOM event (called before onHide) to hide the tooltip.
     *
     * @param instance
     * @param event
     */
    onUntrigger(instance: TooltipInstance, event: Event): void;
}
declare type Theme = 'dark' | 'light';
declare type Placement = 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'auto' | 'auto-start' | 'auto-end';
declare type Animation = 'scale' | 'shift-away' | 'shift-toward' | 'perspective';
declare type SetProperties = Partial<TooltipProperties> & {
    trigger: Trigger;
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
     * Retrieves attributes prefixed with 'tooltip' and converts them to properties.
     *
     * @param target Target item.
     * @private
     */
    private static getData;
}
export default Tooltip;
export { TooltipInstance, TooltipProperties, };
