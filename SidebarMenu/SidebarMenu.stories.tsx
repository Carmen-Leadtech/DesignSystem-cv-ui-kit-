import { useState } from 'react';
import type { CSSProperties } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { Button } from 'components/Button/Button';
import { Icon } from 'components/Icon/Icon';

import { SidebarMenu } from './SidebarMenu';
import { type SidebarMenuAccountConfig, type SidebarMenuProps } from './SidebarMenu';
import type { SidebarMenuNavSection } from './SidebarNavSections/SidebarMenuNavSections';

const demoSections: SidebarMenuNavSection[] = [
  {
    items: [{ id: 'application-hub', label: 'Application Hub', iconName: 'experience' }],
  },
  {
    title: 'Documents',
    items: [
      { id: 'resumes', label: 'Resumes', iconName: 'resume_doc', badge: '2', selected: true },
      { id: 'cover-letters', label: 'Cover letters', iconName: 'letter_doc', badge: '1' },
    ],
  },
  {
    title: 'Career tools',
    items: [
      { id: 'interview-ai', label: 'Interview AI', iconName: 'mic' },
      { id: 'linkedin', label: 'Linkedin Analyzer', iconName: 'in' },
      { id: 'resume-review', label: 'Resume Review', iconName: 'document_search' },
    ],
  },
];

const demoAccountSubmenuItems: NonNullable<SidebarMenuAccountConfig['submenuItems']> = [
  {
    id: 'languages',
    label: 'English (US)',
    iconName: 'language',
    suffix: <Icon name="chevron_right" />,
    onClick: () => {
      console.log('languages clicked');
    },
  },
  {
    id: 'help',
    label: 'Help & Contact',
    iconName: 'help',
    onClick: () => {
      console.log('help clicked');
    },
  },
  {
    id: 'settings',
    label: 'Settings',
    iconName: 'gear',
    onClick: () => {
      console.log('settings clicked');
    },
  },
  {
    id: 'logout',
    label: 'Sign Out',
    iconName: 'exit',
    onClick: () => {
      console.log('logout clicked');
    },
  },
];

const demoAccountLanguageOptions: NonNullable<SidebarMenuAccountConfig['languageOptions']> = [
  {
    code: 'en-US',
    description: 'English (US)',
    isProfileLanguage: true,
    flagIcon: 'flag',
  },
  {
    code: 'en-GB',
    description: 'English (GB)',
    isProfileLanguage: false,
    flagIcon: 'flag',
  },
  { code: 'es-ES', description: 'Español', isProfileLanguage: false, flagIcon: 'flag' },
  { code: 'fr-FR', description: 'Français', isProfileLanguage: false, flagIcon: 'flag' },
  { code: 'de-DE', description: 'Deutsch', isProfileLanguage: false, flagIcon: 'flag' },
  { code: 'it-IT', description: 'Italiano', isProfileLanguage: false, flagIcon: 'flag' },
  {
    code: 'pt-BR',
    description: 'Português',
    isProfileLanguage: false,
    flagIcon: 'flag',
  },
  { code: 'ru-RU', description: 'Русский', isProfileLanguage: false, flagIcon: 'flag' },
  { code: 'ja-JP', description: '日本語', isProfileLanguage: false, flagIcon: 'flag' },
];

const demoAccount: SidebarMenuAccountConfig = {
  accountTitle: 'Account and settings',
  submenuItems: demoAccountSubmenuItems,
  languageTitle: 'Languages',
  languageOptions: demoAccountLanguageOptions,
  selectedLanguageId: 'en-US',
  userEmail: 'test@test.com',
  userAvatar: 'T',
  backButtonAriaLabel: 'Go back',
};

const LogoStyle: CSSProperties = {
  fontSize: 'var(--font-size-titles-m)',
  fontWeight: 'var(--font-weight-strong)',
  lineHeight: 'var(--line-height-titles-m)',
  color: 'var(--color-text-default)',
  fontFamily: 'var(--font-family-heading)',
};
const SidebarMenuLogo = () => <span style={LogoStyle}>Sidebar Menu</span>;

export default {
  title: 'Components/SidebarMenu',
  component: SidebarMenu,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Sidebar navigation aligned with the **Sidebar menu** frame in Figma (desktop expanded / collapsed + mobile). Uses **design tokens** via CSS modules and composes **Icon** and **Button** from this library.

**Icons:** \`side_menu\` (toggle), \`mic\`, \`crown\`. **Account:** pass an \`account\` object with \`submenuItems\` (use \`showTrailingChevron\` on the language row) and \`languageOptions\` + \`onLanguageSelect\` for the language picker. On **desktop**, nested items open in a **dropdown** (see [RC-31242](https://www.figma.com/design/8DpJ6hJqyDBILXp5sT0DOK/RC-31242---Dise%C3%B1o-de-men%C3%BA-Persistente?node-id=5214-4660)); on **mobile**, account and language levels use **sliding panels** inside the drawer. Pass \`labels\` to localize tooltips, \`aria-label\` strings, and submenu copy.

**Open state (mobile and desktop):** \`isOpen\` + \`onOpenChange\` control the sidebar in one place: **open** means the mobile drawer is visible and the desktop rail is expanded; **closed** means the drawer is hidden and the rail is collapsed. Omit \`isOpen\` for uncontrolled mode and optionally set \`defaultOpen\` (defaults to \`true\`). On mobile, **pointer down outside** the \`aside\` calls \`onOpenChange(false)\`. Rail width uses the same motion tokens as the sliding panels.
        `,
      },
    },
  },
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
      description: 'Controlled open state (mobile drawer + desktop rail)',
    },
    defaultOpen: {
      control: { type: 'boolean' },
      description: 'Initial open state when uncontrolled',
    },
    onOpenChange: { action: 'onOpenChange' },
  },
} as Meta<SidebarMenuProps>;

const shellStyle: CSSProperties = {
  height: 640,
  display: 'flex',
  alignItems: 'stretch',
};

const Template: StoryFn<SidebarMenuProps> = (args: SidebarMenuProps) => (
  <div style={shellStyle}>
    <SidebarMenu {...args} />
  </div>
);

/**
 * Desktop viewport.
 * @viewport desktop1
 */
export const DesktopDefault = Template.bind({});
DesktopDefault.args = {
  'data-qa': 'sidebar-demo',
  openButtonLabel: 'Open sidebar',
  closeButtonLabel: 'Close sidebar',
  logo: <SidebarMenuLogo />,
  sections: demoSections,
  account: demoAccount,
  upgradeLabel: 'Upgrade',
  onUpgradeClick: () => {
    console.log('upgrade clicked');
  },
};
DesktopDefault.parameters = {
  viewport: {
    defaultViewport: 'desktop1',
  },
};

export const DesktopCollapsed: StoryFn<SidebarMenuProps> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={shellStyle}>
      <SidebarMenu {...args} isOpen={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
};
DesktopCollapsed.args = {
  ...DesktopDefault.args,
};
DesktopCollapsed.parameters = {
  viewport: {
    defaultViewport: 'desktop1',
  },
  docs: {
    description: {
      story:
        'Controlled mode starting collapsed. The rail toggle updates `isOpen` via `onOpenChange` (required when `isOpen` is set).',
    },
  },
};

/**
 * Mobile viewport (locked). Uses `globals.viewport` so the viewport toolbar cannot switch to desktop.
 */
export const MobileWithToggle: StoryFn<SidebarMenuProps> = (args) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div style={{ padding: 'var(--spacing-m)' }}>
        <Button onClick={() => setIsOpen((open) => !open)} type="button" variant="secondary">
          {isOpen ? 'Close menu' : 'Open menu'}
        </Button>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'stretch', minHeight: 0 }}>
        <SidebarMenu {...args} isOpen={isOpen} onOpenChange={setIsOpen} />
      </div>
    </div>
  );
};
MobileWithToggle.args = {
  ...DesktopDefault.args,
};
MobileWithToggle.globals = {
  viewport: { value: 'mobile2', isRotated: false },
};
MobileWithToggle.parameters = {
  docs: {
    description: {
      story:
        'Mobile viewport. Use the button to toggle the drawer; `onOpenChange` also runs when the overlay or outside-click closes the menu. Viewport is fixed to **mobile1** (Storybook cannot change it via the toolbar).',
    },
  },
};
