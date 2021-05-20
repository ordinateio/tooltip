import {Lexicon} from '@ordinateio/lexicon';

import '../../src/index.scss';
import {Tooltip, TooltipInstance} from '../../src';

import './index.scss';

Lexicon.extend({
    'test': {
        en: 'Lexicon!',
        ru: 'Лексикон!',
    }
});

/* Nav. */
Tooltip.set('.nav-container', {
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
Tooltip.set('.placement', {
    trigger: 'mouseenter',
    target: '.placement__item',
});

/* Other. */
Tooltip.set('.other', {
    trigger: 'click',
    target: '.other__item--click',
});

Tooltip.set('.other', {
    trigger: 'mouseenter',
    target: '.other__item--mouseenter',
});

Tooltip.set('.other', {
    trigger: 'focus',
    target: '.other__item--focus input',
});

Tooltip.set('.other', {
    trigger: 'click',
    target: '.other__item--toggle-lang',
    onShow(instance: TooltipInstance) {
        Lexicon.locale = instance.reference.getAttribute('data-value') ?? 'en';
    },
});
