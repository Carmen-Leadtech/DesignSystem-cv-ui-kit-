import { Meta, StoryFn } from '@storybook/react';

import { MenuLink, type MenuLinkProps } from './MenuLink';
import README from './README.md?raw';

export default {
  title: 'Components/MenuLink',
  component: MenuLink,
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
  argTypes: {
    collapsed: {
      control: { type: 'boolean' },
    },
    selected: {
      control: { type: 'boolean' },
    },
  },
} as Meta<typeof MenuLink>;

const Template: StoryFn<MenuLinkProps> = (args) => <MenuLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Resumes',
  iconName: 'document',
  badge: '2',
};

export const Selected = Template.bind({});
Selected.args = {
  ...Default.args,
  selected: true,
};

export const WithSecondaryLine = Template.bind({});
WithSecondaryLine.args = {
  label: 'Resumes',
  iconName: 'document',
  subLabel: 'Last updated today',
};

export const Collapsed = Template.bind({});
Collapsed.args = {
  label: 'Resumes',
  iconName: 'document',
  collapsed: true,
};
