/**
 * Code Connect — maps this repo’s `SidebarMenu` to the Design System file in Figma.
 * @see https://developers.figma.com/docs/code-connect/react/
 *
 * **Figma setup (variant properties must match `figma.enum` names and keys exactly, case-sensitive):**
 *
 * 1. Use a **component set** (variants), not a single frame: select your sidebar main component →
 *    combine as variants if needed (Object → “Combine as variants”).
 * 2. **Type** — Add a variant property named exactly `Type` with values `Default`, `Collapsed`.
 *    “Default” = expanded rail (~260px); “Collapsed” = narrow rail (~60px). Duplicate variant cells
 *    and resize the frame / show icon-only state so each combination exists in the set.
 *    If you only have one width in Figma today, add the property anyway and create a second variant
 *    column/row for `Collapsed` (even a simplified mock is enough for Dev Mode).
 *
 * **URL** must point to that **component set** (or single component): Assets → right‑click →
 * “Copy link to selection”. Publish fails if the node is not a component / component set.
 *
 * If validation says a property does not exist, open the component in Figma and copy the exact
 * property labels from the sidebar — they must match the first argument of each `figma.enum`.
 */
import figma from '@figma/code-connect/react';

import { SidebarMenu } from './SidebarMenu';

const demoSections = [
  {
    title: 'Documents',
    items: [
      { id: 'resumes', label: 'Resumes', iconName: 'document', badge: '2' },
      { id: 'cover-letters', label: 'Cover letters', iconName: 'plane', badge: '1' },
    ],
  },
];

const demoAccountItems = [
  { id: 'settings', label: 'Settings', iconName: 'settings' },
  {
    id: 'languages',
    label: 'English (US)',
    iconName: 'language',
    showTrailingChevron: true,
  },
  { id: 'logout', label: 'Log out', iconName: 'close' },
];

figma.connect(
  SidebarMenu,
  'https://www.figma.com/design/THqr4HG3voOwUuKdg2KjfF/Design-System---WIP-?node-id=2661-1465&m=dev',
  {
    props: {
      type: figma.enum('Type', {
        Default: 'default',
        Collapsed: 'collapsed',
      }),
    },
    example: ({ type }) => (
      <SidebarMenu
        openButtonLabel="Open sidebar"
        closeButtonLabel="Close sidebar"
        data-qa="sidebar-menu"
        isOpen={type === 'default'}
        sections={demoSections}
        account={{
          userEmail: 'user@example.com',
          userAvatar: 'https://non-existent-avatar.com/avatar.jpg',
          accountTitle: 'Account and settings',
          submenuItems: demoAccountItems,
          languageTitle: 'Languages',
          languageOptions: [
            {
              code: 'en-US',
              description: 'English (US)',
              isProfileLanguage: true,
              flagIcon: 'flag',
            },
            { code: 'es-ES', description: 'Español', isProfileLanguage: false, flagIcon: 'flag' },
            { code: 'de-DE', description: 'Deutsch', isProfileLanguage: false, flagIcon: 'flag' },
          ],
          selectedLanguageId: 'en-US',
          backButtonAriaLabel: 'Go back',
        }}
      />
    ),
  }
);
