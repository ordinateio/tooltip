# Tooltip

Adaptation for Tippy.js.

## Installation

```sh
npm install --save-dev @ordinateio/tooltip
```

## Usage

```ts
import "@ordinateio/tooltip/dist/tooltip.css";

import {Tooltip} from "@ordinateio/tooltip";

Tooltip.set(".container", {
    trigger: "click",
    target: ".button",
});
```
