# SidebarMenuOption

Sticky footer account row: neutral hover, optional avatar leading, label, optional trailing chevron. The parent owns Popover or sliding panel open state (desktop vs mobile).

## Usage

Use only in the sidebar sticky footer for the signed-in account control. For primary nav and submenu lists, use `MenuLink`.

## Accessibility

- Renders as a `<button type="button">`.
- When the rail is collapsed, pass `aria-label` with the full account identifier to avoid duplicating the visible label.

## Props

See `SidebarMenuOptionProps` in `SidebarMenuOption.tsx`.
