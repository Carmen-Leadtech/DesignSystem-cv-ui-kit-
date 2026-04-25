import { Meta, StoryFn } from '@storybook/react-vite';

import { Icon } from 'components/Icon/Icon';

import { ButtonIcon, type ButtonIconProps } from './ButtonIcon';

export default {
  title: 'Components/ButtonIcon',
  component: ButtonIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **ButtonIcon component** that provides an icon-only button for compact interactive actions.

---

### ✨ Features

- 🎯 **Compact:** Designed specifically for icon-only actions to save space.
- 📐 **Sizes:** XS, S, and M variants for different UI contexts.
- 🎨 **Variants:** Primary and neutral styles for different action hierarchies.
- 🧩 **Flexible:** Accepts any icon as children.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { ButtonIcon } from './ButtonIcon';
import { Icon } from 'components/Icon/Icon';

<ButtonIcon>
  <Icon name="delete" />
</ButtonIcon>

<ButtonIcon variant="neutral" size="S">
  <Icon name="create" />
</ButtonIcon>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['primary', 'neutral'],
      description: 'Visual style of the button',
      table: {
        type: { summary: '"primary" | "neutral"' },
        defaultValue: { summary: '"primary"' },
      },
    },
    size: {
      control: { type: 'radio' },
      options: ['XS', 'S', 'M'],
      description: 'Size of the button',
      table: {
        type: { summary: '"XS" | "S" | "M"' },
        defaultValue: { summary: '"M"' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
} as Meta<typeof ButtonIcon>;

const Template: StoryFn<ButtonIconProps> = (args) => <ButtonIcon {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <Icon name="drag_indicator" />,
};
Primary.parameters = {
  docs: {
    description: {
      story: 'Default icon button with primary style.',
    },
  },
};

export const Neutral = Template.bind({});
Neutral.args = {
  children: <Icon name="drag_indicator" />,
  variant: 'neutral',
};
Neutral.parameters = {
  docs: {
    description: {
      story: 'Neutral variant for subtle actions.',
    },
  },
};

export const SizeXS = Template.bind({});
SizeXS.args = {
  children: <Icon name="close" />,
  size: 'XS',
};
SizeXS.parameters = {
  docs: {
    description: {
      story: 'Extra small size for tight spaces.',
    },
  },
};

export const SizeS = Template.bind({});
SizeS.args = {
  children: <Icon name="create" />,
  size: 'S',
};
SizeS.parameters = {
  docs: {
    description: {
      story: 'Small size variant.',
    },
  },
};

const AllSizesTemplate: StoryFn<ButtonIconProps> = () => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <ButtonIcon size="XS">
      <Icon name="delete" />
    </ButtonIcon>
    <ButtonIcon size="S">
      <Icon name="delete" />
    </ButtonIcon>
    <ButtonIcon size="M">
      <Icon name="delete" />
    </ButtonIcon>
  </div>
);

export const AllSizes = AllSizesTemplate.bind({});
AllSizes.parameters = {
  docs: {
    description: {
      story: 'Comparison of all button sizes.',
    },
  },
};

const AllVariantsAndStatesTemplate: StoryFn<ButtonIconProps> = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '80px 1fr 1fr',
      gap: '16px 24px',
      alignItems: 'center',
      justifyItems: 'center',
    }}
  >
    <span style={{ justifySelf: 'start' }} />
    <span style={{ fontWeight: 600 }}>Primary</span>
    <span style={{ fontWeight: 600 }}>Neutral</span>

    <span style={{ justifySelf: 'start' }}>Normal</span>
    <ButtonIcon>
      <Icon name="create" />
    </ButtonIcon>
    <ButtonIcon variant="neutral">
      <Icon name="create" />
    </ButtonIcon>

    <span style={{ justifySelf: 'start' }}>Hover</span>
    <ButtonIcon id="hover-primary">
      <Icon name="create" />
    </ButtonIcon>
    <ButtonIcon variant="neutral" id="hover-neutral">
      <Icon name="create" />
    </ButtonIcon>

    <span style={{ justifySelf: 'start' }}>Active</span>
    <ButtonIcon id="active-primary">
      <Icon name="create" />
    </ButtonIcon>
    <ButtonIcon variant="neutral" id="active-neutral">
      <Icon name="create" />
    </ButtonIcon>

    <span style={{ justifySelf: 'start' }}>Focus</span>
    <ButtonIcon id="focus-primary">
      <Icon name="create" />
    </ButtonIcon>
    <ButtonIcon variant="neutral" id="focus-neutral">
      <Icon name="create" />
    </ButtonIcon>

    <span style={{ justifySelf: 'start' }}>Disabled</span>
    <ButtonIcon disabled>
      <Icon name="create" />
    </ButtonIcon>
    <ButtonIcon variant="neutral" disabled>
      <Icon name="create" />
    </ButtonIcon>
  </div>
);

export const AllVariantsAndStates = AllVariantsAndStatesTemplate.bind({});
AllVariantsAndStates.parameters = {
  pseudo: {
    hover: ['#hover-primary', '#hover-neutral'],
    active: ['#active-primary', '#active-neutral'],
    focus: ['#focus-primary', '#focus-neutral'],
  },
  docs: {
    description: {
      story: 'Comparison of all variants and their states (hover, active, focus, disabled).',
    },
  },
};
