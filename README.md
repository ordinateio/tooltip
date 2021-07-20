# Tooltip

The implementation of simple tooltips.

## Installation

```
npm install --save-dev @ordinateio/tooltip
```

## Usage

```ts
import {Tooltip} from "@ordinateio/tooltip";
import "@ordinateio/tooltip/dist/tooltip.css";

const tooltip = new Tooltip();

tooltip.set('.container', {
    trigger: 'click',
    target: '.button',
});
```
