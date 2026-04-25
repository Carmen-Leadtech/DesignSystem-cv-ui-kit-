import type { CSSProperties } from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { Icon } from 'components/Icon/Icon';

import { MenuOption, type MenuOptionProps } from './MenuOption';
import README from './README.md?raw';

const avatarStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  flexShrink: 0,
  marginLeft: 0,
  marginRight: 0,
  transition:
    'margin-left 0.28s cubic-bezier(0.4, 0, 0.2, 1), margin-right 0.28s cubic-bezier(0.4, 0, 0.2, 1), width 0.28s cubic-bezier(0.4, 0, 0.2, 1), height 0.28s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
  borderRadius: 'var(--corner-radius-m)',
  background: 'var(--color-fill-common-brand-weak)',
  fontSize: 'var(--font-size-body-s)',
  fontWeight: 'var(--font-weight-strong)',
  lineHeight: 'var(--line-height-body-s)',
  color: 'var(--color-text-brand)',
};

export default {
  title: 'Components/MenuOption',
  component: MenuOption,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: README,
      },
    },
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof MenuOption>;

const Template: StoryFn<MenuOptionProps> = (args) => <MenuOption {...args} />;

export const FooterAccountExpanded = Template.bind({});
FooterAccountExpanded.args = {
  prefix: (
    <object data="dummy-avatar.jpg" type="image/jpg" style={avatarStyles}>
      D
    </object>
  ),
  label: 'user@example.com',
  suffix: <Icon name="expand_more" />,
};

export const FooterAccountCollapsed = Template.bind({});
FooterAccountCollapsed.args = {
  prefix: (
    <object data="dummy-avatar.jpg" type="image/jpg" style={avatarStyles}>
      D
    </object>
  ),
  label: 'Account',
  collapsed: true,
  'aria-label': 'user@example.com',
};
