import Lexicon from "@modstrap/lexicon";
import Tippy, {delegate, followCursor, Instance as TippyInstance, ReferenceElement} from "tippy.js";

export interface TooltipProperties {
    content: string;
    class: string;
    theme: TooltipTheme;
    placement: TooltipPlacement;
    animation: TooltipAnimation;
    interactive: boolean;
    followCursor: boolean;
}

export interface TooltipCallbacks {
    /**
     * Lifecycle hook invoked after the tooltip properties have been updated.
     *
     * @param instance
     * @param properties
     */
    onAfterUpdate?(instance: TooltipInstance, properties: Partial<TooltipCallbacks>): void;

    /**
     * Lifecycle hook invoked before the tooltip properties have been updated.
     *
     * @param instance
     * @param properties
     */
    onBeforeUpdate?(instance: TooltipInstance, properties: Partial<TooltipCallbacks>): void;

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
     * Lifecycle hook invoked when the tooltip has fully transitioned out and is unmounted from the DOM.
     *
     * @param instance
     */
    onHidden?(instance: TooltipInstance): void;

    /**
     * Lifecycle hook invoked when the tooltip begins to transition out.
     *
     * @param instance
     */
    onHide?(instance: TooltipInstance): void;

    /**
     * Lifecycle hook invoked when the tooltip has been mounted to the DOM.
     *
     * @param instance
     */
    onMount?(instance: TooltipInstance): void;

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
     * Lifecycle hook invoked when the tooltip was triggered by a real DOM event (called before onShow) to show the tooltip.
     *
     * @param instance
     * @param event
     */
    onTrigger?(instance: TooltipInstance, event: Event): void;

    /**
     * Lifecycle hook invoked when the tooltip was triggered by a real DOM event (called before onHide) to hide the tooltip.
     *
     * @param instance
     * @param event
     */
    onUntrigger?(instance: TooltipInstance, event: Event): void;
}

export interface TooltipSetProperties extends TooltipCallbacks {
    trigger: TooltipTrigger;
    target: string;
}

export interface TooltipTarget extends ReferenceElement {
    dataset?: DOMStringMap;
}

export interface TooltipInstance extends TippyInstance {
    reference: TooltipTarget;
}

export type TooltipTheme = "dark" | "light";

export type TooltipPlacement =
    | "top" | "top-start" | "top-end"
    | "right" | "right-start" | "right-end"
    | "bottom" | "bottom-start" | "bottom-end"
    | "left" | "left-start" | "left-end"
    | "auto" | "auto-start" | "auto-end";

export type TooltipAnimation = "scale" | "shift-away" | "shift-toward" | "perspective";

export type TooltipTrigger = "mouseenter" | "focus" | "mouseenter focus" | "focusin" | "click" | "manual";

export type TooltipOnShow = ((instance: TooltipInstance) => void) | undefined;

/**
 * Helper class for initial Tippy.js setup.
 */
class Init {
    /**
     * Reconfiguration prevention indicator.
     *
     * @private
     */
    private static initiated: boolean = false;

    /**
     * Basic setup.
     */
    public static main(): void {
        if (this.initiated) return;

        Tippy.setDefaultProps({
            animation: "scale",
            allowHTML: true,
            inertia: true,
            arrow: true,
            ignoreAttributes: true,
            zIndex: 99_999,
            maxWidth: 300,
            theme: "dark",
            offset: [0, 6],
            plugins: [followCursor]
        });

        this.initiated = true;
    }
}

Init.main();

/**
 * Adaptation for Tippy.js.
 *
 * @see set
 * @see getInstance
 */
export class Tooltip {
    /**
     * Sets the tooltip handler to the target element.
     *
     * @param properties Properties.
     */
    public static set(properties: TooltipSetProperties): void {
        delegate("body", {
            ...properties,
            ...{
                onShow: this.setProperties.bind(this, properties.onShow),
                touch: (properties.trigger === "click") ? "hold" : true,
            }
        });
    }

    /**
     * Returns an existing instance, otherwise returns undefined.
     *
     * @param target Target item.
     */
    public static getInstance(target: TooltipTarget): TooltipInstance | undefined {
        return target._tippy;
    }

    /**
     * Sets properties for an instance.
     *
     * @param onShow
     * @param instance
     * @private
     */
    private static setProperties(onShow: TooltipOnShow, instance: TooltipInstance): void {
        (onShow) && onShow(instance);

        const properties = this.getProperties(instance.reference);
        const popper = instance.popper;

        popper.classList.add("tooltip-root");
        popper.querySelector(".tippy-box")?.classList.add("tooltip-box");
        popper.querySelector(".tippy-arrow")?.classList.add("tooltip-arrow");
        popper.querySelector(".tippy-content")?.classList.add("tooltip-content");
        (properties.class) && popper.classList.add(...properties.class.split(" "));

        instance.setProps(properties);
    }

    /**
     * Returns the property obtained from the target element.
     *
     * @param target Target item.
     * @private
     */
    private static getProperties(target: TooltipTarget): TooltipProperties {
        const data = this.getData(target);

        if (data.content.startsWith("selector:")) {
            const selector = data.content.replace("selector:", "").trim();
            data.content = document.querySelector(selector)?.outerHTML ?? data.content;
        }

        if (data.content.startsWith("lexicon:")) {
            const lexicon = data.content.replace("lexicon:", "").trim();
            data.content = Lexicon.get(lexicon);
        }

        return data;
    }

    /**
     * Returns the properties derived from the attributes.
     *
     * @param target Target item.
     * @private
     */
    private static getData(target: TooltipTarget): TooltipProperties {
        const dataset = target.dataset ?? {};

        return {
            content: dataset.tooltipContent ?? "Content is missing!",
            theme: dataset.tooltipTheme as TooltipTheme ?? "dark",
            placement: dataset.tooltipPlacement as TooltipPlacement ?? "top",
            animation: dataset.tooltipAnimation as TooltipAnimation ?? "scale",
            interactive: dataset.tooltipInteractive === "true",
            followCursor: dataset.tooltipFollowCursor === "true",
            class: dataset.tooltipClass ?? "",
        }
    }
}

export default Tooltip;
