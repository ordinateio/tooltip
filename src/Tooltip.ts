import Lexicon from '@modstrap/lexicon';
import Tippy, {delegate, followCursor, Instance, Props, ReferenceElement} from 'tippy.js';

interface TooltipTarget extends ReferenceElement {
    dataset?: DOMStringMap;
}

interface TooltipInstance extends Instance {
    reference: TooltipTarget;
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
    onAfterUpdate(
        instance: TooltipInstance,
        properties: Partial<TooltipProperties>
    ): void;

    /**
     * Lifecycle hook invoked before the tooltip's properties have been updated.
     *
     * @param instance
     * @param properties
     */
    onBeforeUpdate(
        instance: TooltipInstance,
        properties: Partial<TooltipProperties>
    ): void;

    /**
     * Lifecycle hook invoked when the tooltip has has been created.
     *
     * @param instance
     */
    onCreate(instance: TooltipInstance): void;

    /**
     * Lifecycle hook invoked when the tooltip has has been destroyed.
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

interface HTMLAttributes {
    content: string;

    [property: string]: string;
}

type Theme = 'dark' | 'light';

type Placement =
    | "top" | "top-start" | "top-end"
    | "right" | "right-start" | "right-end"
    | "bottom" | "bottom-start" | "bottom-end"
    | "left" | "left-start" | "left-end"
    | "auto" | "auto-start" | "auto-end";

type Animation = 'scale' | 'shift-away' | 'shift-toward' | 'perspective';

type TooltipSetProperties = Partial<TooltipProperties> & {
    trigger: Trigger;
    target: string;
}

type Trigger = 'mouseenter' | 'focus' | 'mouseenter focus' | 'focusin' | 'click' | 'manual';

type OnShow = ((instance: TooltipInstance) => void) | undefined;

/**
 * Adaptation for Tippy.js.
 *
 * @see set
 * @see getInstance
 */
class Tooltip {
    /**
     * Reconfiguration prevention indicator.
     *
     * @private
     */
    private static initiated: boolean = false;

    /**
     * Setting up.
     *
     * @private
     */
    private static init(): void {
        if (this.initiated) return;

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
            plugins: [followCursor],
        });

        this.initiated = true;
    }

    /**
     * Sets the tooltip handler to the target element.
     *
     * @param properties Properties.
     */
    static set(properties: TooltipSetProperties): void {
        this.init();

        delegate('body', {
            ...properties,
            ...{
                onShow: this.setProperties.bind(this, properties.onShow),
                touch: (properties.trigger === 'click') ? 'hold' : true,
            }
        });
    }

    /**
     * Returns an existing instance, otherwise returns undefined.
     *
     * @param target Target item.
     */
    static getInstance(target: TooltipTarget): TooltipInstance | undefined {
        return target._tippy;
    }

    /**
     * Sets properties for an instance.
     *
     * @param onShow
     * @param instance
     * @private
     */
    private static setProperties(onShow: OnShow, instance: TooltipInstance): void {
        if (onShow) onShow(instance);

        const properties = this.getProperties(instance.reference);
        const popper = instance.popper;

        popper.classList.add('tooltip-root');
        popper.querySelector('.tippy-box')?.classList.add('tooltip-box');
        popper.querySelector('.tippy-arrow')?.classList.add('tooltip-arrow');
        popper.querySelector('.tippy-content')?.classList.add('tooltip-content');

        if (properties.class) {
            popper.classList.add(...properties.class.split(' '));
        }

        instance.setProps(properties);
    }

    /**
     * Returns the property obtained from the target element.
     *
     * @param target Target item.
     * @private
     */
    private static getProperties(target: TooltipTarget): Partial<TooltipProperties> {
        const data = this.getData(target);

        if (data.content.startsWith('selector:')) {
            const selector = data.content.replace('selector:', '').trim();
            data.content = document.querySelector(selector)?.outerHTML ?? data.content;
        }

        if (data.content.startsWith('lexicon:')) {
            const lexicon = data.content.replace('lexicon:', '').trim();
            data.content = Lexicon.get(lexicon);
        }

        return data;
    }

    /**
     * Retrieves attributes prefixed with "tooltip" and converts them to properties.
     *
     * @param target Target item.
     * @private
     */
    private static getData(target: TooltipTarget): HTMLAttributes {
        const dataset: DOMStringMap = target.dataset ?? {};
        const data: HTMLAttributes = {
            content: 'Content is missing!'
        };

        for (const [key, value] of Object.entries(dataset)) {
            if (!key.startsWith('tooltip')) continue;
            if (value === undefined) continue;

            const property = key.replace(/^tooltip./, (prefix) => prefix.slice(-1).toLowerCase());
            data[property] = value;
        }

        return data;
    }
}

export default Tooltip;
export {
    TooltipInstance,
    TooltipProperties,
}
