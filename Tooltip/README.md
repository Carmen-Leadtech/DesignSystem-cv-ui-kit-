# Tooltip

Small floating label anchored to a **single child element**, shown on **pointer hover** and **keyboard focus**. Intended for **collapsed** layouts where the trigger has no visible text (e.g. icon-only sidebar rail).

The bubble is **presentational** (`aria-hidden`): the trigger should already expose a proper accessible name so assistive technologies are not given duplicate wording.

## Usage

Wrap any focusable element (typically `Button` or `MenuLink`).

- **`title`**: string shown in the tooltip.
- **`placement`**: `right` (default), `left`, `top`, or `bottom`.
- **`disabled`**: when `true`, the child is rendered with no tooltip behavior (e.g. expanded sidebar with visible labels).

Press **Escape** while the tooltip is open to dismiss it without moving focus.
