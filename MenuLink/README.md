# MenuLink

Navigation row for the sidebar rail: optional leading icon, main label, optional secondary line, optional count badge, and optional trailing chevron or check.

## Usage

Use for primary navigation sections and account submenu lists. Pair with `collapsed` when the desktop rail is icon-only.

## Accessibility

- Renders as a `<button type="button">`.
- Pass `aria-current="page"` from the parent when the item represents the current route.
- Decorative icons use `aria-hidden` on `Icon`.

## Props

See `MenuLinkProps` in `MenuLink.tsx`.
