import Tippy, {delegate, followCursor, Instance, ReferenceElement} from 'tippy.js';

export interface TooltipProperties {
    /**
     * Event to display the tooltip.
     */
    trigger: 'mouseenter' | 'focus' | 'mouseenter focus' | 'focusin' | 'click' | 'manual';

    /**
     * Target item.
     */
    target: string;

    /**
     * Tooltip content.
     */
    content: string;

    /**
     * Additional CSS classes separated by a space.
     */
    classes?: string;

    /**
     * Theme for tooltip.
     */
    theme?: 'dark' | 'light';

    /**
     * Position of the tooltip.
     */
    placement?: | 'top' | 'top-start' | 'top-end'
        | 'right' | 'right-start' | 'right-end'
        | 'bottom' | 'bottom-start' | 'bottom-end'
        | 'left' | 'left-start' | 'left-end'
        | 'auto' | 'auto-start' | 'auto-end';

    /**
     * Tooltip animation.
     */
    animation?: 'scale' | 'shift-away' | 'shift-toward' | 'perspective';

    /**
     * If 'true' interactive mode will be enabled.
     */
    interactive?: boolean;

    /**
     * If 'true' will enable cursor following.
     */
    followCursor?: boolean;

    /**
     * Determines if content strings are parsed as HTML instead of text.
     */
    allowHTML?: boolean;
}

export interface TooltipCallbacks {
    /**
     * Lifecycle hook invoked when the tooltip has been created.
     *
     * @param instance
     */
    onCreate?(instance: TooltipInstance): void;

    /**
     * Lifecycle hook invoked when the tooltip has been destroyed.
     *
     * @param instance
     */
    onDestroy?(instance: TooltipInstance): void;

    /**
     * Lifecycle hook invoked when the tooltip begins to transition out.
     *
     * @param instance
     */
    onHide?(instance: TooltipInstance): void;

    /**
     * Lifecycle hook invoked when the tooltip begins to transition in.
     *
     * @param instance
     */
    onShow?(instance: TooltipInstance): void;
}

export interface TooltipInstance extends Instance {
    reference: TooltipTarget;

    /**
     * Destroy the tooltip.
     */
    destroy(): void;

    /**
     * Disable the tooltip.
     */
    disable(): void;

    /**
     * Enable the tooltip.
     */
    enable(): void;
}

export type TooltipTarget = ReferenceElement;

export class Tooltip {
    /**
     * Tooltip constructor.
     *
     * @param properties
     */
    constructor(properties: Partial<TooltipProperties> = {}) {
        Tippy.setDefaultProps({
            animation: 'scale',
            allowHTML: true,
            inertia: true,
            arrow: true,
            ignoreAttributes: true,
            zIndex: 100,
            maxWidth: 300,
            theme: 'dark',
            offset: [0, 6],
            plugins: [followCursor],
            ...properties
        });
    }

    /**
     * Sets the tooltip handler to the target element.
     *
     * @param selector A container selector for setting a delegate.
     * @param properties
     */
    create(selector: string, properties: TooltipProperties & Partial<TooltipCallbacks>): TooltipInstance[] {
        return delegate(selector, {
            ...properties,
            onShow: Tooltip.onShowHandler.bind(this, properties),
            touch: (properties.trigger === 'click') ? 'hold' : true,
        });
    }

    /**
     * Callback handler for onShow method.
     *
     * @param properties
     * @param instance
     * @private
     */
    private static onShowHandler(properties: TooltipProperties & Partial<TooltipCallbacks>, instance: TooltipInstance): void {
        properties.onShow && properties.onShow(instance);

        Tooltip.setContentFromAttribute(properties, instance);
        Tooltip.setContentFromSelector(properties);
        Tooltip.setClasses(properties, instance);

        instance.setProps(properties);
    }

    /**
     * Sets the content of the tooltip from the attribute of the target element.
     *
     * @param properties
     * @param instance
     * @private
     */
    private static setContentFromAttribute(properties: TooltipProperties, instance: TooltipInstance) {
        if (properties.content.startsWith('attribute:')) {
            let selector = properties.content.replace('attribute:', '').trim();
            properties.content = instance.reference.getAttribute(selector) ?? properties.content;
        }
    }

    /**
     * Sets the content of the tooltip from the specified selector.
     *
     * @param properties
     * @private
     */
    private static setContentFromSelector(properties: TooltipProperties) {
        if (properties.content.startsWith('selector:')) {
            let selector = properties.content.replace('selector:', '').trim();
            properties.content = document.querySelector(selector)?.outerHTML ?? properties.content;
        }
    }

    /**
     * Sets custom classes for tooltips.
     *
     * @param properties
     * @param instance
     * @private
     */
    private static setClasses(properties: TooltipProperties, instance: TooltipInstance) {
        let popper = instance.popper;

        popper.classList.add('tooltip-root');
        popper.querySelector('.tippy-box')?.classList.add('tooltip-container');
        popper.querySelector('.tippy-arrow')?.classList.add('tooltip-container__arrow');
        popper.querySelector('.tippy-content')?.classList.add('tooltip-container__content');

        properties.classes && popper.classList.add(...properties.classes.split(' '));
    }
}
