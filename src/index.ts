import {Lexicon} from '@ordinateio/lexicon';
import Tippy, {delegate, followCursor, Instance as TippyInstance, ReferenceElement} from 'tippy.js';

export interface TooltipCallbacks {
    /**
     * Lifecycle hook invoked before the tooltip properties have been updated.
     *
     * @param instance
     * @param properties
     */
    onBeforeUpdate?(instance: TooltipInstance, properties: Partial<TooltipCallbacks>): void;

    /**
     * Lifecycle hook invoked after the tooltip properties have been updated.
     *
     * @param instance
     * @param properties
     */
    onAfterUpdate?(instance: TooltipInstance, properties: Partial<TooltipCallbacks>): void;

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
     * Lifecycle hook invoked when the tooltip has fully transitioned out and is unmounted from the DOM.
     *
     * @param instance
     */
    onHidden?(instance: TooltipInstance): void;

    /**
     * Lifecycle hook invoked when the tooltip begins to transition in.
     *
     * @param instance
     */
    onShow?(instance: TooltipInstance): void;

    /**
     * Lifecycle hook invoked when the tooltip has fully transitioned in.
     *
     * @param instance
     */
    onShown?(instance: TooltipInstance): void;

    /**
     * Lifecycle hook invoked when the tooltip has been mounted to the DOM.
     *
     * @param instance
     */
    onMount?(instance: TooltipInstance): void;
}

export interface TooltipProperties {
    /**
     * An instance of the Lexicon.
     */
    lexicon: Lexicon;
}

export interface TooltipAttributes {
    /**
     * Tooltip content.
     */
    content: string;

    /**
     * Additional CSS classes separated by a space.
     */
    class: string;

    /**
     * Theme for tooltip.
     */
    theme: TooltipTheme;

    /**
     * Position of the tooltip.
     */
    placement: TooltipPlacement;

    /**
     * Tooltip animation.
     */
    animation: TooltipAnimation;

    /**
     * If 'true' interactive mode will be enabled.
     */
    interactive: boolean;

    /**
     * If 'true' will enable cursor following.
     */
    followCursor: boolean;
}

export interface TooltipPropertiesForSet extends TooltipCallbacks {
    /**
     * Event to display the tooltip.
     */
    trigger: TooltipTrigger;

    /**
     * Target item.
     */
    target: string;
}

export interface TooltipTarget extends ReferenceElement {
    dataset?: DOMStringMap;
}

export interface TooltipInstance extends TippyInstance {
    reference: TooltipTarget;
}

export type TooltipTheme = 'dark' | 'light';

export type TooltipPlacement =
    | 'top' | 'top-start' | 'top-end'
    | 'right' | 'right-start' | 'right-end'
    | 'bottom' | 'bottom-start' | 'bottom-end'
    | 'left' | 'left-start' | 'left-end'
    | 'auto' | 'auto-start' | 'auto-end';

export type TooltipAnimation = 'scale' | 'shift-away' | 'shift-toward' | 'perspective';

export type TooltipTrigger = 'mouseenter' | 'focus' | 'mouseenter focus' | 'focusin' | 'click' | 'manual';

export type TooltipOnShow = ((instance: TooltipInstance) => void) | undefined;

/**
 * class Tooltip - The implementation of simple tooltips.
 *
 * [Github]{@link https://github.com/ordinateio/tooltip}
 */
export class Tooltip {
    private readonly properties: TooltipProperties = {
        lexicon: new Lexicon(),
    };

    /**
     * An instance of the Lexicon.
     */
    get lexicon(): Lexicon {
        return this.properties.lexicon;
    }

    /**
     * An instance of the Lexicon.
     *
     * @param lexicon An instance of the Lexicon.
     */
    set lexicon(lexicon: Lexicon) {
        this.properties.lexicon = lexicon;
    }

    /**
     * Tooltip constructor.
     */
    constructor(properties: Partial<TooltipProperties> = {}) {
        this.properties = {
            ...this.properties,
            ...properties,
        };


        Tippy.setDefaultProps({
            animation: 'scale',
            allowHTML: true,
            inertia: true,
            arrow: true,
            ignoreAttributes: true,
            zIndex: 99_999,
            maxWidth: 300,
            theme: 'dark',
            offset: [0, 6],
            plugins: [followCursor]
        });
    }

    /**
     * Sets the tooltip handler to the target element.
     *
     * @param selector A container selector for setting a delegate.
     * @param properties
     */
    set(selector: string, properties: TooltipPropertiesForSet): void {
        delegate(selector, {
            ...properties,
            onShow: this.setProperties.bind(this, properties.onShow),
            touch: (properties.trigger === 'click') ? 'hold' : true,
        });
    }

    /**
     * Returns an existing instance, otherwise returns undefined.
     *
     * @param selector
     */
    getInstance(selector: string): TooltipInstance | undefined {
        const element = document.querySelector(selector) as TooltipTarget | null;

        return element ? element._tippy : undefined;
    }

    /**
     * Destroy the tooltip.
     *
     * @param selector
     */
    destroy(selector: string): void {
        const instance = this.getInstance(selector);

        instance && instance.destroy();
    }

    /**
     * Disable the tooltip.
     *
     * @param selector
     */
    disable(selector: string): void {
        const instance = this.getInstance(selector);

        instance && instance.disable();
    }

    /**
     * Enable the tooltip.
     *
     * @param selector
     */
    enable(selector: string): void {
        const instance = this.getInstance(selector);

        instance && instance.enable();
    }

    /**
     * Set the content for the tooltip.
     *
     * @param selector
     * @param content
     */
    setContent(selector: string, content: string): void {
        const instance = this.getInstance(selector);

        instance && instance.setContent(content);
    }

    /**
     * Hide the tooltip.
     *
     * @param selector
     */
    hide(selector: string): void {
        const instance = this.getInstance(selector);

        instance && instance.hide();
    }

    /**
     * Show the tooltip.
     *
     * @param selector
     */
    show(selector: string): void {
        const instance = this.getInstance(selector);

        instance && instance.show();
    }

    /**
     * Unmount the tooltip from the DOM.
     *
     * @param selector
     */
    unmount(selector: string): void {
        const instance = this.getInstance(selector);

        instance && instance.unmount();
    }

    /**
     * Sets properties for an instance.
     *
     * @param onShow
     * @param instance
     * @private
     */
    private setProperties(onShow: TooltipOnShow, instance: TooltipInstance): void {
        onShow && onShow(instance);

        const properties = this.getAttributes(instance.reference);
        const popper = instance.popper;

        popper.classList.add('tooltip-root');
        popper.querySelector('.tippy-box')?.classList.add('tooltip-container');
        popper.querySelector('.tippy-arrow')?.classList.add('tooltip-container__arrow');
        popper.querySelector('.tippy-content')?.classList.add('tooltip-container__content');
        properties.class && popper.classList.add(...properties.class.split(' '));

        instance.setProps(properties);
    }

    /**
     * Returns the property obtained from the target element.
     *
     * @param target Target item.
     * @private
     */
    private getAttributes(target: TooltipTarget): TooltipAttributes {
        const data = Tooltip.getRawAttributes(target);

        if (data.content.startsWith('selector:')) {
            const selector = data.content.replace('selector:', '').trim();
            data.content = document.querySelector(selector)?.outerHTML ?? data.content;
        }

        if (data.content.startsWith('lexicon:')) {
            const lexicon = data.content.replace('lexicon:', '').trim();
            data.content = this.properties.lexicon.get(lexicon);
        }

        return data;
    }

    /**
     * Returns the properties derived from the attributes.
     *
     * @param target Target item.
     * @private
     */
    private static getRawAttributes(target: TooltipTarget): TooltipAttributes {
        const dataset = target.dataset ?? {};

        return {
            content: dataset.tooltipContent ?? 'Content is missing!',
            theme: (dataset.tooltipTheme ?? 'dark') as TooltipTheme,
            placement: (dataset.tooltipPlacement ?? 'top') as TooltipPlacement,
            animation: (dataset.tooltipAnimation ?? 'scale') as TooltipAnimation,
            interactive: dataset.tooltipInteractive === 'true',
            followCursor: dataset.tooltipFollowCursor === 'true',
            class: dataset.tooltipClass ?? '',
        };
    }
}
