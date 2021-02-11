"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = void 0;
const lexicon_1 = __importDefault(require("@modstrap/lexicon"));
const tippy_js_1 = __importStar(require("tippy.js"));
/**
 * Helper class for initial Tippy.js setup.
 */
class Init {
    /**
     * Basic setup.
     */
    static main() {
        if (this.initiated)
            return;
        tippy_js_1.default.setDefaultProps({
            animation: "scale",
            allowHTML: true,
            inertia: true,
            arrow: true,
            ignoreAttributes: true,
            zIndex: 99999,
            maxWidth: 300,
            theme: "dark",
            offset: [0, 6],
            plugins: [tippy_js_1.followCursor]
        });
        this.initiated = true;
    }
}
/**
 * Reconfiguration prevention indicator.
 *
 * @private
 */
Init.initiated = false;
Init.main();
/**
 * Adaptation for Tippy.js.
 *
 * @see set
 * @see getInstance
 * @see destroy
 * @see disable
 * @see enable
 * @see setContent
 * @see hide
 * @see show
 * @see unmount
 *
 * Tooltip:
 * [Github]{@link https://github.com/callisto2410/modstrap-tooltip}
 *
 * Tippy.js:
 * [Github]{@link https://github.com/atomiks/tippyjs}
 * [Homepage]{@link https://atomiks.github.io/tippyjs/}
 */
class Tooltip {
    /**
     * Sets the tooltip handler to the target element.
     *
     * @param properties Properties.
     */
    static set(properties) {
        tippy_js_1.delegate("body", {
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
    static getInstance(target) {
        if (typeof target === "string") {
            const selector = document.querySelector(target);
            return selector ? selector._tippy : undefined;
        }
        return target._tippy;
    }
    /**
     * Destroy the tooltip.
     *
     * @param target
     */
    static destroy(target) {
        const instance = this.getInstance(target);
        instance && instance.destroy();
    }
    /**
     * Disable the tooltip.
     *
     * @param target
     */
    static disable(target) {
        const instance = this.getInstance(target);
        instance && instance.disable();
    }
    /**
     * Enable the tooltip.
     *
     * @param target
     */
    static enable(target) {
        const instance = this.getInstance(target);
        instance && instance.enable();
    }
    /**
     * Set the content for the tooltip.
     *
     * @param target
     * @param content
     */
    static setContent(target, content) {
        const instance = this.getInstance(target);
        instance && instance.setContent(content);
    }
    /**
     * Hide the tooltip.
     *
     * @param target
     */
    static hide(target) {
        const instance = this.getInstance(target);
        instance && instance.hide();
    }
    /**
     * Show the tooltip.
     *
     * @param target
     */
    static show(target) {
        const instance = this.getInstance(target);
        instance && instance.show();
    }
    /**
     * Unmount the tooltip from the DOM.
     *
     * @param target
     */
    static unmount(target) {
        const instance = this.getInstance(target);
        instance && instance.unmount();
    }
    /**
     * Sets properties for an instance.
     *
     * @param onShow
     * @param instance
     * @private
     */
    static setProperties(onShow, instance) {
        var _a, _b, _c;
        onShow && onShow(instance);
        const properties = this.getProperties(instance.reference);
        const popper = instance.popper;
        popper.classList.add("tooltip-root");
        (_a = popper.querySelector(".tippy-box")) === null || _a === void 0 ? void 0 : _a.classList.add("tooltip-box");
        (_b = popper.querySelector(".tippy-arrow")) === null || _b === void 0 ? void 0 : _b.classList.add("tooltip-arrow");
        (_c = popper.querySelector(".tippy-content")) === null || _c === void 0 ? void 0 : _c.classList.add("tooltip-content");
        properties.class && popper.classList.add(...properties.class.split(" "));
        instance.setProps(properties);
    }
    /**
     * Returns the property obtained from the target element.
     *
     * @param target Target item.
     * @private
     */
    static getProperties(target) {
        var _a, _b;
        const data = this.getData(target);
        if (data.content.startsWith("selector:")) {
            const selector = data.content.replace("selector:", "").trim();
            data.content = (_b = (_a = document.querySelector(selector)) === null || _a === void 0 ? void 0 : _a.outerHTML) !== null && _b !== void 0 ? _b : data.content;
        }
        if (data.content.startsWith("lexicon:")) {
            const lexicon = data.content.replace("lexicon:", "").trim();
            data.content = lexicon_1.default.get(lexicon);
        }
        return data;
    }
    /**
     * Returns the properties derived from the attributes.
     *
     * @param target Target item.
     * @private
     */
    static getData(target) {
        var _a, _b, _c, _d, _e, _f;
        const dataset = (_a = target.dataset) !== null && _a !== void 0 ? _a : {};
        return {
            content: (_b = dataset.tooltipContent) !== null && _b !== void 0 ? _b : "Content is missing!",
            theme: (_c = dataset.tooltipTheme) !== null && _c !== void 0 ? _c : "dark",
            placement: (_d = dataset.tooltipPlacement) !== null && _d !== void 0 ? _d : "top",
            animation: (_e = dataset.tooltipAnimation) !== null && _e !== void 0 ? _e : "scale",
            interactive: dataset.tooltipInteractive === "true",
            followCursor: dataset.tooltipFollowCursor === "true",
            class: (_f = dataset.tooltipClass) !== null && _f !== void 0 ? _f : "",
        };
    }
}
exports.Tooltip = Tooltip;
exports.default = Tooltip;
