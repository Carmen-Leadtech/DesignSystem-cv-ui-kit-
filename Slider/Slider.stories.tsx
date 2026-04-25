import { useState } from 'react';

import { Meta, StoryFn } from '@storybook/react-vite';

import { Slider, type SliderProps } from './Slider';

export default {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A **Slider component** for selecting numeric values within a specified range with two predefined variants.

---

### ✨ Features

- 🎨 **Two Variants:** Primary and Neutral styling options.
- 📐 **Consistent Size:** Both variants use 16×16px circular thumbs and 4px track height.
- ♿ **Accessible:** Full ARIA support and keyboard navigation.
- 🎯 **Visual Feedback:** Dynamic track gradient showing current value.
- 🧪 **Test-friendly:** \`data-qa\` attributes for automation.

---

### ⚙️ Usage Example

\`\`\`tsx
import { Slider } from './Slider';

const [value, setValue] = useState(50);

// Primary variant (default)
<Slider
  value={value}
  onChange={(e) => setValue(Number(e.target.value))}
  aria-label="Volume control"
/>

// Neutral variant
<Slider
  value={value}
  variant="neutral"
  onChange={(e) => setValue(Number(e.target.value))}
  aria-label="Progress control"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: 'Current value of the slider',
      table: {
        type: { summary: 'number' },
      },
    },
    min: {
      control: { type: 'number' },
      description: 'Minimum value',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: { type: 'number' },
      description: 'Maximum value',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'neutral'],
      description: 'Visual variant of the slider',
      table: {
        type: { summary: '"primary" | "neutral"' },
        defaultValue: { summary: '"primary"' },
      },
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Accessible label for the slider',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as Meta<typeof Slider>;

const Template: StoryFn<SliderProps> = (args) => {
  const [value, setValue] = useState(args.value || 50);

  return (
    <div style={{ width: '300px' }}>
      <Slider {...args} value={value} onChange={(e) => setValue(Number(e.target.value))} />
      <div style={{ marginTop: '16px', textAlign: 'center', color: '#666' }}>Value: {value}</div>
    </div>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  value: 60,
  variant: 'primary',
  'aria-label': 'Primary slider',
};
Primary.parameters = {
  docs: {
    description: {
      story: 'Primary variant with brand-500 color for both track and thumb.',
    },
  },
};

export const Neutral = Template.bind({});
Neutral.args = {
  value: 40,
  variant: 'neutral',
  'aria-label': 'Neutral slider',
};
Neutral.parameters = {
  docs: {
    description: {
      story: 'Neutral variant with gray track (#bec2c6) and custom thumb styling.',
    },
  },
};

const ComparisonTemplate: StoryFn<SliderProps> = () => {
  const [primaryValue, setPrimaryValue] = useState(75);
  const [neutralValue, setNeutralValue] = useState(45);

  return (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold' }}>
          Primary Variant: {primaryValue}%
        </label>
        <Slider
          value={primaryValue}
          variant="primary"
          onChange={(e) => setPrimaryValue(Number(e.target.value))}
          aria-label="Primary variant slider"
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold' }}>
          Neutral Variant: {neutralValue}%
        </label>
        <Slider
          value={neutralValue}
          variant="neutral"
          onChange={(e) => setNeutralValue(Number(e.target.value))}
          aria-label="Neutral variant slider"
        />
      </div>

      <div
        style={{
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '8px',
          fontSize: '14px',
        }}
      >
        <strong>🎨 Variant Specifications:</strong>
        <div style={{ marginTop: '12px' }}>
          <div style={{ marginBottom: '8px' }}>
            <strong>Primary:</strong> Brand-500 (#006dcc) track and thumb, white border
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Neutral:</strong> #bec2c6 track, hsl(208, 8%, 88%) thumb with hsl(208, 4%, 48%)
            border
          </div>
          <div>
            <strong>Both:</strong> 16×16px circular thumbs, 4px track height
          </div>
        </div>
      </div>
    </div>
  );
};

export const VariantComparison = ComparisonTemplate.bind({});
VariantComparison.parameters = {
  docs: {
    description: {
      story: 'Side-by-side comparison of both slider variants with their specific color schemes.',
    },
  },
};

const RangeTemplate: StoryFn<SliderProps> = () => {
  const [volume, setVolume] = useState(65);
  const [temperature, setTemperature] = useState(22);

  return (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold' }}>
          Volume: {volume}%
        </label>
        <Slider
          value={volume}
          min={0}
          max={100}
          variant="primary"
          onChange={(e) => setVolume(Number(e.target.value))}
          aria-label="Volume control"
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '12px', fontWeight: 'bold' }}>
          Temperature: {temperature}°C
        </label>
        <Slider
          value={temperature}
          min={16}
          max={30}
          variant="neutral"
          onChange={(e) => setTemperature(Number(e.target.value))}
          aria-label="Temperature control"
        />
      </div>
    </div>
  );
};

export const CustomRange = RangeTemplate.bind({});
CustomRange.parameters = {
  docs: {
    description: {
      story: 'Examples with custom min/max ranges for different use cases.',
    },
  },
};

const AllVariantsAndStatesTemplate: StoryFn<SliderProps> = () => (
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
    <div style={{ width: '100px' }}>
      <Slider value={50} onChange={() => {}} variant="primary" />
    </div>
    <div style={{ width: '100px' }}>
      <Slider value={50} onChange={() => {}} variant="neutral" />
    </div>

    <span style={{ justifySelf: 'start' }}>Hover</span>
    <div style={{ width: '100px' }}>
      <Slider className="is-hovered" value={50} onChange={() => {}} variant="primary" />
    </div>
    <div style={{ width: '100px' }}>
      <Slider className="is-hovered" value={50} onChange={() => {}} variant="neutral" />
    </div>

    <span style={{ justifySelf: 'start' }}>Active</span>
    <div style={{ width: '100px' }}>
      <Slider className="is-active" value={50} onChange={() => {}} variant="primary" />
    </div>
    <div style={{ width: '100px' }}>
      <Slider className="is-active" value={50} onChange={() => {}} variant="neutral" />
    </div>

    <span style={{ justifySelf: 'start' }}>Focus</span>
    <div style={{ width: '100px' }}>
      <Slider className="is-focused" value={50} onChange={() => {}} variant="primary" />
    </div>
    <div style={{ width: '100px' }}>
      <Slider className="is-focused" value={50} onChange={() => {}} variant="neutral" />
    </div>
  </div>
);

export const AllVariantsAndStates = AllVariantsAndStatesTemplate.bind({});
AllVariantsAndStates.parameters = {
  docs: {
    description: {
      story: 'Comparison of all variants and their states (hover, active, focus).',
    },
  },
};
