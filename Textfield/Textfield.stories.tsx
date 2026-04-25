import { useState } from 'react';

import type { Meta, StoryObj, StoryFn } from '@storybook/react-vite';

import { Icon } from 'components/Icon/Icon';

import { Textfield } from './Textfield';

const meta: Meta<typeof Textfield> = {
  title: 'Forms/Textfield',
  component: Textfield,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A **Textfield component** that provides a text input field with floating label, decorators, and validation states.

---

### ✨ Features

- 🏷️ **Floating label:** Label animates into position on focus or when value is present.
- 🎨 **Decorators:** Support for prefix decorators and suffix icons.
- 🚦 **States:** Error and disabled states with visual feedback.
- 📝 **Assistive text:** Helper text for additional context and validation messages.
- ♿ **Accessible:** Proper label association and ARIA attributes.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { useState } from 'react';
import { Textfield } from './Textfield';
import { Icon } from 'components/Icon/Icon';

const [email, setEmail] = useState('');

<Textfield
  label="Email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<Textfield
  label="Name"
  decorator={<Icon name="contact" />}
  suffix={<Icon name="check" />}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Floating label text',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text (optional)',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Input value',
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      control: { type: 'text' },
      description: 'Input type (text, email, password, etc.)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"text"' },
      },
    },
    isError: {
      control: { type: 'boolean' },
      description: 'Enables error state styling',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the input',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    assistiveText: {
      control: { type: 'text' },
      description: 'Helper text or custom content below the input (string or React node)',
      table: {
        type: { summary: 'string | ReactNode' },
      },
    },
    assistiveTextAlign: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Alignment of the assistive text only',
      table: {
        type: { summary: '"left" | "center" | "right"' },
        defaultValue: { summary: '"left"' },
      },
    },
    multiline: {
      control: { type: 'boolean' },
      description:
        'If true, renders a textarea that wraps text to the next line instead of scrolling horizontally',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    rows: {
      control: { type: 'number', min: 2, max: 10 },
      description: 'Number of visible rows when multiline',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '3' },
      },
    },
    decorator: {
      control: false,
      description: 'Leading icon/element',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
    suffix: {
      control: false,
      description: 'Trailing icon/element',
      table: {
        type: { summary: 'ReactElement' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textfield>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Textfield
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-qa="default"
      />
    );
  },
  args: {
    label: 'Full Name',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default textfield with floating label.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    disabled: true,
    value: 'Cannot edit this',
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled textfield that cannot be edited.',
      },
    },
  },
};

export const Error: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Textfield
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-qa="error"
      />
    );
  },
  args: {
    label: 'Email',
    isError: true,
    assistiveText: 'Please enter a valid email address.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield in error state with assistive text.',
      },
    },
  },
};

export const WithAssistiveText: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Textfield
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-qa="assistive-text"
      />
    );
  },
  args: {
    label: 'Username',
    assistiveText: 'Use 6-20 characters. Letters and numbers only.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield with assistive text.',
      },
    },
  },
};

export const WithAssistiveTextRight: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Textfield
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-qa="assistive-text-right"
      />
    );
  },
  args: {
    label: 'Reference ID',
    assistiveText: 'Optional. For your records.',
    assistiveTextAlign: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield with assistive text aligned to the right.',
      },
    },
  },
};

export const WithAssistiveTextList: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Textfield
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-qa="assistive-text-list"
      />
    );
  },
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    assistiveText: (
      <ul>
        <li>At least 8 characters</li>
        <li>One uppercase letter</li>
        <li>One number or symbol</li>
      </ul>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield with assistive text as a custom React node (ul list with 3 items).',
      },
    },
  },
};

export const Multiline: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Textfield
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-qa="multiline"
      />
    );
  },
  args: {
    label: 'Summary',
    placeholder: 'Describe your experience...',
    multiline: true,
    rows: 3,
    value:
      'Creative and detail-oriented Product Designer with experience crafting intuitive user experiences and visually engaging interfaces.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Multiline textfield (textarea). Text wraps to the next line when it reaches the edge of the width instead of scrolling horizontally.',
      },
    },
  },
};

export const MultilineWithAssistiveTextRight: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Textfield
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-qa="multiline-assistive-right"
      />
    );
  },
  args: {
    label: 'Summary',
    placeholder: 'Describe your experience...',
    multiline: true,
    rows: 3,
    assistiveText: 'Optional. For your records.',
    assistiveTextAlign: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiline textfield with assistive text aligned to the right.',
      },
    },
  },
};

export const WithDecorator: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Textfield
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-qa="decorated"
      />
    );
  },
  args: {
    label: 'Contact Name',
    decorator: <Icon name="info" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield with leading decorator icon.',
      },
    },
  },
};

export const WithSuffix: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Textfield
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-qa="suffix"
      />
    );
  },
  args: {
    label: 'Experience',
    suffix: (
      <>
        <Icon name="experience" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield with trailing suffix icon.',
      },
    },
  },
};

export const WithDecoratorAndSuffix: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Textfield
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-qa="full"
      />
    );
  },
  args: {
    label: 'Education',
    decorator: <Icon name="education" />,
    suffix: (
      <>
        <Icon name="info" />
        <Icon name="info" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield with both decorator and suffix icons.',
      },
    },
  },
};

export const WithPlaceholder: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Textfield
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-qa="placeholder"
      />
    );
  },
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Textfield with placeholder text.',
      },
    },
  },
};

const AllVariantsAndStatesTemplate: StoryFn<typeof Textfield> = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '80px 1fr 1fr 1fr',
      gap: '16px 24px',
      alignItems: 'center',
      justifyItems: 'center',
    }}
  >
    <span style={{ justifySelf: 'start' }} />
    <span style={{ fontWeight: 600 }}>Default</span>
    <span style={{ fontWeight: 600 }}>Error</span>
    <span style={{ fontWeight: 600 }}>Multiline</span>

    <span style={{ justifySelf: 'start' }}>Normal</span>
    <Textfield label="Label" value="" onChange={() => {}} />
    <Textfield label="Label" value="" onChange={() => {}} isError />
    <Textfield label="Label" value="" onChange={() => {}} multiline />

    <span style={{ justifySelf: 'start' }}>Hover</span>
    <Textfield
      className="hover-target"
      id="hover-default"
      label="Label"
      value=""
      onChange={() => {}}
    />
    <Textfield
      className="hover-target"
      id="hover-error"
      label="Label"
      value=""
      onChange={() => {}}
      isError
    />
    <Textfield
      className="hover-target"
      id="hover-multiline"
      label="Label"
      value=""
      onChange={() => {}}
      multiline
    />

    <span style={{ justifySelf: 'start' }}>Focus</span>
    <Textfield
      className="focus-target"
      id="focus-default"
      label="Label"
      value=""
      onChange={() => {}}
    />
    <Textfield
      className="focus-target"
      id="focus-error"
      label="Label"
      value=""
      onChange={() => {}}
      isError
    />
    <Textfield
      className="focus-target"
      id="focus-multiline"
      label="Label"
      value=""
      onChange={() => {}}
      multiline
    />

    <span style={{ justifySelf: 'start' }}>Disabled</span>
    <Textfield label="Label" value="" onChange={() => {}} disabled />
    <Textfield label="Label" value="" onChange={() => {}} isError disabled />
    <Textfield label="Label" value="" onChange={() => {}} multiline disabled />
  </div>
);

export const AllVariantsAndStates: Story = {
  render: AllVariantsAndStatesTemplate,
  parameters: {
    pseudo: {
      hover: [
        '.hover-target',
        '#hover-default-textfield',
        '#hover-error-textfield',
        '#hover-multiline-textfield',
      ],
      focus: ['#focus-default-textfield', '#focus-error-textfield', '#focus-multiline-textfield'],
      focusWithin: ['.focus-target'],
    },
    docs: {
      description: {
        story: 'Comparison of all variants and their states (hover, focus, disabled).',
      },
    },
  },
};
