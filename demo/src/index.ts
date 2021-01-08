import "./index.scss";

import Lexicon from "@modstrap/lexicon";
import Tooltip, {TooltipInstance} from "../../src/Tooltip";

Lexicon.extend({
    "test": {
        en: "Lexicon!",
        ru: "Лексикон!",
    }
});

/* Nav. */
Tooltip.set({
    trigger: "click",
    target: ".nav-button",
    onShow(instance: TooltipInstance) {
        instance.reference.classList.add("active");
    },
    onHide(instance: TooltipInstance) {
        instance.reference.classList.remove("active");
    },
});

/* Placements. */
Tooltip.set({
    trigger: "mouseenter",
    target: ".placement .item",
});

/* Other. */
Tooltip.set({
    trigger: "click",
    target: ".other .click",
});

Tooltip.set({
    trigger: "mouseenter",
    target: ".other .mouseenter",
});

Tooltip.set({
    trigger: "focus",
    target: ".other .focus input",
});

Tooltip.set({
    trigger: "click",
    target: ".other .toggle-lang",
    onShow(instance: TooltipInstance) {
        Lexicon.locale = instance.reference.getAttribute("data-value") ?? "en";
    },
});
