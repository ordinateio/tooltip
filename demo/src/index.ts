import '../../src/index.scss';
import {Tooltip, TooltipInstance} from '../../src';

import './index.scss';

const tooltip = new Tooltip();
tooltip.lexicon.extend({
    'test': {
        en: 'Lexicon!',
        ru: 'Лексикон!',
    }
});

/* Nav. */
tooltip.set('.nav-container', {
    trigger: 'click',
    target: '.nav-container__button',
    onShow(instance: TooltipInstance) {
        instance.reference.classList.add('nav-container__button--active');
    },
    onHide(instance: TooltipInstance) {
        instance.reference.classList.remove('nav-container__button--active');
    },
});

/* Placements. */
tooltip.set('.placement', {
    trigger: 'mouseenter',
    target: '.placement__item',
});

/* Other. */
tooltip.set('.other', {
    trigger: 'click',
    target: '.other__item--click',
});

tooltip.set('.other', {
    trigger: 'mouseenter',
    target: '.other__item--mouseenter',
});

tooltip.set('.other', {
    trigger: 'focus',
    target: '.other__item--focus input',
});

tooltip.set('.other', {
    trigger: 'click',
    target: '.other__item--toggle-lang',
    onShow(instance: TooltipInstance) {
        tooltip.lexicon.locale = instance.reference.getAttribute('data-value') ?? 'en';
    },
});
