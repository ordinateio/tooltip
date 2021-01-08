# modstrap-tooltip

Adaptation for Tippy.js.

## Installation

To install a specific version:
```shell script
npm i https://github.com/callisto2410/modstrap-tooltip.git#v1.0.0
```

To install the current version:
```shell script
npm i https://github.com/callisto2410/modstrap-tooltip.git
```

## Usage

HTML

```html
<div class="nav-container">
    <div class="nav-button"
         data-tooltip-content="selector:.nav"
         data-tooltip-class="tooltip-nav"
         data-tooltip-theme="light"
         data-tooltip-placement="bottom"
         data-tooltip-interactive="true"
         data-tooltip-animation="shift-away">Nav
    </div>
    <div class="nav">
        <ul>
            <li><a href="/" title="">First item</a></li>
            <li><a href="/" title="">Second item</a></li>
            <li><a href="/" title="">Third item</a></li>
            <li><a href="/" title="">Fourth item</a></li>
            <li><a href="/" title="">Fifth item</a></li>
        </ul>
    </div>
</div>
```

SCSS

```scss
@use "~@modstrap/tooltip";
```

TypeScript

```ts
import Tooltip from "@modstrap/tooltip";

Tooltip.set({
    trigger: "click",
    target: ".button",
});
```
