import './index.scss';

import '../../src/index.scss';
import {Tooltip} from '../../src';

let tooltip = new Tooltip();

/* Nav */
tooltip.create('.nav-container', {
    trigger: 'click',
    target: '.nav-container__button',
    content: 'attribute:data-tooltip-content',
    classes: 'nav-container__tooltip-nav',
    theme: 'light',
    placement: 'bottom',
    interactive: true,
    animation: 'shift-away',
    onShow(instance) {
        instance.reference.classList.add('nav-container__button--active');
    },
    onHide(instance) {
        instance.reference.classList.remove('nav-container__button--active');
    },
});

/* Placement top */
tooltip.create('.placement', {
    trigger: 'mouseenter',
    target: '.placement__item--top-start',
    content: 'attribute:data-tooltip-content',
    placement: 'top-start',
});

tooltip.create('.placement', {
    trigger: 'mouseenter',
    target: '.placement__item--top',
    content: 'attribute:data-tooltip-content',
    placement: 'top',
});

tooltip.create('.placement', {
    trigger: 'mouseenter',
    target: '.placement__item--top-end',
    content: 'attribute:data-tooltip-content',
    placement: 'top-end',
});

/* Placement right */
tooltip.create('.placement', {
    trigger: 'mouseenter',
    target: '.placement__item--right-start',
    content: 'attribute:data-tooltip-content',
    placement: 'right-start',
});

tooltip.create('.placement', {
    trigger: 'mouseenter',
    target: '.placement__item--right',
    content: 'attribute:data-tooltip-content',
    placement: 'right',
});

tooltip.create('.placement', {
    trigger: 'mouseenter',
    target: '.placement__item--right-end',
    content: 'attribute:data-tooltip-content',
    placement: 'right-end',
});

/* Placement bottom */
tooltip.create('.placement', {
    trigger: 'mouseenter',
    target: '.placement__item--bottom-start',
    content: 'attribute:data-tooltip-content',
    placement: 'bottom-start',
});

tooltip.create('.placement', {
    trigger: 'mouseenter',
    target: '.placement__item--bottom',
    content: 'attribute:data-tooltip-content',
    placement: 'bottom',
});

tooltip.create('.placement', {
    trigger: 'mouseenter',
    target: '.placement__item--bottom-end',
    content: 'attribute:data-tooltip-content',
    placement: 'bottom-end',
});

/* Placement left */
tooltip.create('.placement', {
    trigger: 'mouseenter',
    target: '.placement__item--left-start',
    content: 'attribute:data-tooltip-content',
    placement: 'left-start',
});

tooltip.create('.placement', {
    trigger: 'mouseenter',
    target: '.placement__item--left',
    content: 'attribute:data-tooltip-content',
    placement: 'left',
});

tooltip.create('.placement', {
    trigger: 'mouseenter',
    target: '.placement__item--left-end',
    content: 'attribute:data-tooltip-content',
    placement: 'left-end',
});

/* Click */
let clickTooltip = tooltip.create('.events', {
    trigger: 'click',
    target: '.events__item--click',
    content: 'attribute:data-tooltip-content',
    interactive: true,
});

/* Mouseenter */
let mouseenterTooltip = tooltip.create('.events', {
    trigger: 'mouseenter',
    target: '.events__item--mouseenter',
    content: 'attribute:data-tooltip-content',
});

/* Focus */
tooltip.create('.events', {
    trigger: 'focus',
    target: '.events__item--focus input',
    content: 'attribute:data-tooltip-content',
});

/* Follow */
tooltip.create('.events', {
    trigger: 'mouseenter',
    target: '.events__item--follow',
    content: 'attribute:data-tooltip-content',
    theme: 'light',
    followCursor: true,
});

/* Destroy click */
let destroyClick = document.querySelector('.methods__item--destroy-click') as HTMLElement | null;
if (!destroyClick) throw new Error('Element ".methods__item--destroy-click" is null.');

destroyClick.addEventListener('click', () => {
    for (let item of clickTooltip) item.destroy();
});

/* Disable mouseenter */
let disableMouseenter = document.querySelector('.methods__item--disable-mouseenter') as HTMLElement | null;
if (!disableMouseenter) throw new Error('Element ".methods__item--disable-mouseenter" is null.');

disableMouseenter.addEventListener('click', () => {
    for (let item of mouseenterTooltip) item.disable();
});

/* Enable mouseenter */
let enableMouseenter = document.querySelector('.methods__item--enable-mouseenter') as HTMLElement | null;
if (!enableMouseenter) throw new Error('Element ".methods__item--enable-mouseenter" is null.');

enableMouseenter.addEventListener('click', () => {
    for (let item of mouseenterTooltip) item.enable();
});
