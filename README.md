# Tooltip

The implementation of simple tooltips.

## Installation

```
npm install --save-dev @ordinateio/tooltip
```

## Usage

```ts
import '@ordinateio/tooltip/dist/tooltip.css';
import {Tooltip} from '@ordinateio/tooltip';

let tooltip = new Tooltip();
tooltip.create('.container', {
    trigger: 'click',
    target: '.button',
    content: 'attribute:data-tooltip-content',
});
```
