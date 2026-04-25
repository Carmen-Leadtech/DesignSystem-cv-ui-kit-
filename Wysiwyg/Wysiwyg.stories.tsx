import { Meta, StoryFn } from '@storybook/react-vite';

import { Wysiwyg, type WysiwygProps } from './Wysiwyg';

export default {
  title: 'Components/Wysiwyg',
  component: Wysiwyg,
  parameters: {
    docs: {
      description: {
        component: `
A **Wysiwyg component** (What You See Is What You Get) that provides a rich text editor for formatted text input.

---

### ✨ Features

- ✏️ **Rich formatting:** Bold, italic, underline, lists, and more formatting options.
- 🎨 **Themes:** Light and dark variants for different UI contexts.
- 📊 **Completeness indicator:** Optional progress feedback for content completion.
- 🧩 **Aside component:** Slot for additional content alongside the editor.
- 📋 **Copy control:** Optional paste text cleaning for consistent formatting.
- 📱 **Responsive:** Mobile-friendly layout that adapts to screen size.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { Wysiwyg } from './Wysiwyg';

<Wysiwyg
  variant="light"
  defaultValue="<p>Start typing...</p>"
  helperText="Add your work experience"
  showCompleteness={true}
  onChange={(_, html) => console.log(html)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
      description: 'Theme variant',
      table: {
        type: { summary: '"light" | "dark"' },
      },
    },
    defaultValue: {
      control: { type: 'text' },
      description: 'Initial HTML content',
      table: {
        type: { summary: 'string' },
      },
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text displayed below the editor',
      table: {
        type: { summary: 'string' },
      },
    },
    showCompleteness: {
      control: { type: 'boolean' },
      description: 'Show completeness indicator',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disableCopy: {
      control: { type: 'boolean' },
      description: 'Disable paste text cleaning',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isMobile: {
      control: { type: 'boolean' },
      description: 'Enable mobile layout',
      table: {
        type: { summary: 'boolean' },
      },
    },
    asideComponent: {
      control: false,
      description: 'Additional component to display aside',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    onChange: {
      action: 'change',
      description: 'Callback when content changes',
      table: {
        type: { summary: '(event, html) => void' },
      },
    },
  },
} as Meta<WysiwygProps>;

const Template: StoryFn<WysiwygProps> = (args) => <Wysiwyg {...args} />;

export const Default = Template.bind({});
Default.args = {
  asideComponent: null,
  defaultValue: 'Start typing here...',
  variant: 'light',
  helperText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  showCompleteness: true,
  disableCopy: false,
};
Default.parameters = {
  docs: {
    description: {
      story: 'Default Wysiwyg editor with light theme and completeness indicator.',
    },
  },
};

export const DarkTheme = Template.bind({});
DarkTheme.args = {
  asideComponent: null,
  defaultValue: 'Dark theme editor...',
  variant: 'dark',
  helperText: 'This editor uses the dark theme.',
  showCompleteness: true,
  disableCopy: false,
};
DarkTheme.parameters = {
  docs: {
    description: {
      story: 'Wysiwyg editor with dark theme.',
    },
  },
};

export const WithoutCompleteness = Template.bind({});
WithoutCompleteness.args = {
  asideComponent: null,
  defaultValue: 'Simple editor without indicators...',
  variant: 'light',
  helperText: 'No completeness indicator shown.',
  showCompleteness: false,
  disableCopy: false,
};
WithoutCompleteness.parameters = {
  docs: {
    description: {
      story: 'Wysiwyg editor without the completeness indicator.',
    },
  },
};

export const Mobile = Template.bind({});
Mobile.args = {
  asideComponent: null,
  defaultValue: 'Mobile layout...',
  variant: 'light',
  helperText: 'This is the mobile layout.',
  showCompleteness: true,
  disableCopy: false,
  isMobile: true,
};
Mobile.parameters = {
  docs: {
    description: {
      story: 'Wysiwyg editor with mobile-optimized layout.',
    },
  },
};

const AllVariantsAndStatesTemplate: StoryFn<WysiwygProps> = () => (
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
    <span style={{ fontWeight: 600 }}>Light</span>
    <span style={{ fontWeight: 600 }}>Dark</span>

    <span style={{ justifySelf: 'start' }}>Normal</span>
    <Wysiwyg
      variant="light"
      defaultValue="Text"
      onChange={() => {}}
      helperText=""
      asideComponent={null}
      styles={{}}
      inputId="1"
      inputProps={{}}
      initialFormatOption="bold"
      isMobile={false}
      disableCopy={false}
      showCompleteness={false}
      data-qa="1"
      data-tm-event-label="1"
      data-tm-event-category="1"
      data-tm-type="1"
    />
    <Wysiwyg
      variant="dark"
      defaultValue="Text"
      onChange={() => {}}
      helperText=""
      asideComponent={null}
      styles={{}}
      inputId="2"
      inputProps={{}}
      initialFormatOption="bold"
      isMobile={false}
      disableCopy={false}
      showCompleteness={false}
      data-qa="2"
      data-tm-event-label="2"
      data-tm-event-category="2"
      data-tm-type="2"
    />

    <span style={{ justifySelf: 'start' }}>Focus</span>
    <div id="focus-light">
      <Wysiwyg
        variant="light"
        defaultValue="Text"
        onChange={() => {}}
        helperText=""
        asideComponent={null}
        styles={{}}
        inputId="3"
        inputProps={{}}
        initialFormatOption="bold"
        isMobile={false}
        disableCopy={false}
        showCompleteness={false}
        data-qa="3"
        data-tm-event-label="3"
        data-tm-event-category="3"
        data-tm-type="3"
      />
    </div>
    <div id="focus-dark">
      <Wysiwyg
        variant="dark"
        defaultValue="Text"
        onChange={() => {}}
        helperText=""
        asideComponent={null}
        styles={{}}
        inputId="4"
        inputProps={{}}
        initialFormatOption="bold"
        isMobile={false}
        disableCopy={false}
        showCompleteness={false}
        data-qa="4"
        data-tm-event-label="4"
        data-tm-event-category="4"
        data-tm-type="4"
      />
    </div>
  </div>
);

export const AllVariantsAndStates = AllVariantsAndStatesTemplate.bind({});
AllVariantsAndStates.parameters = {
  pseudo: {
    focus: ['#focus-light [contenteditable="true"]', '#focus-dark [contenteditable="true"]'],
    focusWithin: [
      '#focus-light',
      '#focus-dark',
      '#focus-light > div > div > div',
      '#focus-dark > div > div > div',
    ],
  },
  docs: {
    description: {
      story: 'Comparison of all variants and their states (focus).',
    },
  },
};
