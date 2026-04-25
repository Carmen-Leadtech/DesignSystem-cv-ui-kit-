import { Meta, StoryFn } from '@storybook/react';

import { Button } from 'components/Button/Button';

import README from './README.md?raw';
import { Tooltip, TooltipPlacement, type TooltipProps } from './Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: README,
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Tooltip copy',
    },
    placement: {
      control: { type: 'select' },
      options: Object.values(TooltipPlacement),
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} as Meta<typeof Tooltip>;

const Template: StoryFn<TooltipProps> = (args) => (
  <Tooltip {...args}>
    <Button>Focus or hover</Button>
  </Tooltip>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Tooltip label',
  placement: TooltipPlacement.RIGHT,
  disabled: false,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Hover or Tab to the button to show the tooltip.',
    },
  },
};

export const PlacementTop = Template.bind({});
PlacementTop.args = {
  ...Default.args,
  placement: TooltipPlacement.TOP,
  title: 'Above the control',
};
