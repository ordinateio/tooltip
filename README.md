# Tooltip

The implementation of simple tooltips.

## Installation

```
npm install --save-dev @ordinateio/tooltip
```

## Usage

```ts
import "@ordinateio/tooltip/dist/tooltip.css";
import {Tooltip} from "@ordinateio/tooltip";

const tooltip = new Tooltip();

tooltip.set('.container', {
    trigger: 'click',
    target: '.button',
});
```
