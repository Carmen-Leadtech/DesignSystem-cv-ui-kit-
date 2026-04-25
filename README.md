# CV UI Kit 📝

A set of UI components for resume applications, built with **React** and **TypeScript**.

## 📦 Installation

```bash
npm install @npm_leadtech/cv-ui-kit
```

### 📎 FileUploader (subpath)

`FileUploader` is exposed via a subpath to avoid making `react-dropzone` mandatory in all apps.

Install the additional dependency only if you use `FileUploader`:

```bash
npm install react-dropzone
```

```tsx
import { FileUploader } from '@npm_leadtech/cv-ui-kit/fileUploader';
```

## 🚀 Quick start

```tsx
import { Button, Card, Textfield } from '@npm_leadtech/cv-ui-kit';
import '@npm_leadtech/cv-ui-kit/styles';

function App() {
  return (
    <Card>
      <Textfield placeholder="Your name" />
      <Button variant="primary">Save</Button>
    </Card>
  );
}
```

## 🎨 CSS tokens

Components use CSS custom properties (variables) from the design system. Design tokens are exported from Figma and converted to CSS using [Style Dictionary v5](https://styledictionary.com/).

Token files live in `src/styles/design-system-tokens/` and are published within `@npm_leadtech/cv-ui-kit/styles`. You can override them in your app to customize the theme:

```css
:root {
  --color-primitives-brand-dark-50: #0b6cff;
  --colors-background-brand: var(--color-primitives-brand-dark-50);
  --corner-radius-s-default: 10px;
}
```

To regenerate tokens from the JSON source:

```bash
npm run convert-tokens
```

For detailed documentation, see [`src/styles/design-system-tokens/README.md`](src/styles/design-system-tokens/README.md).

## 🧩 Available components

| Component             | Description                                        |
| --------------------- | -------------------------------------------------- |
| `AccordionCard`       | Expandable/collapsible card                        |
| `Badge`               | Status badge (info, warning, success)              |
| `Banner`              | Banner with title, description, icon, and image    |
| `Button`              | Button variants (primary, secondary, gradient)     |
| `ButtonIcon`          | Icon button                                        |
| `Card`                | Card container                                     |
| `Checkbox`            | Checkbox                                           |
| `Chip`                | Interactive chip with drag & drop and inline edit  |
| `CircularProgress`    | Circular progress indicator                        |
| `ContentHeader`       | Section header with icon, title, and optional slot |
| `Dialog`              | Modal dialog                                       |
| `FileUploader`        | File upload with drag & drop                       |
| `Icon`                | SVG icons                                          |
| `InfoCard`            | Informational card with header and content         |
| `LanguageSelector`    | Language selector                                  |
| `Link`                | Link / anchor                                      |
| `MenuItem`            | Menu item                                          |
| `MenuItemBlock`       | Menu item block                                    |
| `OriginalContentCard` | Card displaying original content w/ empty state    |
| `Popover`             | Positioned floating content                        |
| `PriorityCard`        | Priority card with action button                   |
| `PriorityCardList`    | Container for multiple priority cards              |
| `ProductCard`         | Product card                                       |
| `RadioButton`         | Radio button                                       |
| `ScoreCard`           | Score card with icon and progress                  |
| `ScoreDonut`          | Score donut chart                                  |
| `ScoreProgress`       | Score progress bar                                 |
| `ScoreProgressBar`    | Score progress bar (alternative)                   |
| `ScoreTag`            | Score tag with indicator                           |
| `Select`              | Dropdown select                                    |
| `SelectMenu`          | Selection menu                                     |
| `Skeleton`            | Skeleton loading placeholder                       |
| `Slider`              | Slider input                                       |
| `SuggestionCard`      | Suggestion card with badge and copyable list       |
| `Tab` / `Tabs`        | Tabs system                                        |
| `Textfield`           | Text field                                         |
| `Toast`               | Toast notification                                 |
| `Wysiwyg`             | Rich text editor                                   |

## 🪝 Hooks

| Hook              | Description                                  |
| ----------------- | -------------------------------------------- |
| `useClickOutside` | Detects clicks outside an element            |
| `useIsMobile`     | Detects mobile or tablet device (User-Agent) |
| `useBreakPoint`   | Detects the device based on the screen width |

## 🛠️ Development scripts

| Script          | Command                   | Description                                                     |
| --------------- | ------------------------- | --------------------------------------------------------------- |
| Dev             | `npm run dev`             | Starts Storybook on port 6006                                   |
| Dev Watch       | `npm run dev:watch`       | Start Vite for developers, watching for changes in source files |
| Build           | `npm run build`           | Builds the library for production (ES modules and CommonJS)     |
| Build Storybook | `npm run build:storybook` | Builds static Storybook                                         |
| Chromatic       | `npm run chromatic`       | Publishes Storybook to Chromatic for visual regression testing  |
| Tests           | `npm run test`            | Runs unit tests                                                 |
| Tests (watch)   | `npm run test:watch`      | Runs tests in watch mode                                        |
| Coverage        | `npm run test:coverage`   | Runs tests with coverage report                                 |
| Lint            | `npm run lint`            | Lints the code with ESLint                                      |
| Lint (fix)      | `npm run lint:fix`        | Fixes lint errors automatically                                 |
| Format          | `npm run format`          | Formats the code with Prettier                                  |
| Typecheck       | `npm run typecheck`       | Checks types without compiling                                  |
| Clean           | `npm run clean`           | Removes `dist` and `coverage` directories                       |
| Convert Tokens  | `npm run convert-tokens`  | Converts Design System tokens from JSON format to CSS variables |

## 📚 Storybook & Visual Testing

View and test components in isolation locally:

```bash
npm run dev
```

Open [http://localhost:6006](http://localhost:6006) in your browser.

### 🎨 Chromatic CI/CD Integration

We use [Chromatic](https://www.chromatic.com/library?appId=69c1491e07031ef63f59d795&inviteToken=chpi_ebb75da0e6ff477cb512ab5d74fcd324) for visual regression testing and Storybook hosting.

- Every pull request automatically builds and publishes Storybook to Chromatic.
- Reviewers can approve visual changes directly in the Chromatic UI before merging.
- To publish to Chromatic locally, run:

```bash
npm run chromatic
```

*(Note: Running this locally requires the `CHROMATIC_PROJECT_TOKEN` environment variable to be set.)*

## 🧪 Testing

```bash
# Run all tests
npm run test

# Tests in watch mode
npm run test:watch

# Tests with coverage
npm run test:coverage
```

## 📋 Requirements

- **Node.js**: v24.13.0 (recommended using [nvm](https://github.com/nvm-sh/nvm))
- **React**: 18.x
- **React DOM**: 18.x

## 🔢 Versioning

This project follows [Semantic Versioning (SemVer)](https://semver.org/):

- **MAJOR** (`X.0.0`): Breaking changes in the API
- **MINOR** (`0.X.0`): Backward-compatible new features
- **PATCH** (`0.0.X`): Bug fixes

## 📦 Build format

This library is **pre-compiled** and exported in multiple formats for maximum compatibility:

- **ES Modules** (`dist/index.esm.js`) - For modern bundlers
- **CommonJS** (`dist/index.cjs`) - For Node.js projects and legacy bundlers
- **TypeScript Definitions** (`dist/index.d.ts`) - For type support

### ✨ Pre-compilation: what's the benefit?

This library ships **pre-compiled** (similar to Material-UI), which means the code is already transpiled and ready to use. That provides several benefits:

#### 🚀 Faster builds

```diff
// ❌ WITHOUT pre-compiling
// Webpack has to:
// 1. Read source code from @npm_leadtech/cv-ui-kit
// 2. Run babel-loader
// 3. Transform JSX → JS
// 4. Transform ES6+ → ES5
// 5. Include in the bundle
// Time: ~30-60s more on each build

// ✅ WITH pre-compiling (current)
// Webpack only:
// 1. Reads already compiled code
// 2. Includes it directly in the bundle
// Time: ~5-10s less
```

#### 📦 Fewer dependencies in the consumer project

```diff
// ❌ WITHOUT pre-compiling - You need this in your project:
{
  "devDependencies": {
    "@babel/core": "^7.x",
    "@babel/preset-react": "^7.x",
    "@babel/preset-env": "^7.x",
    "babel-loader": "^9.x"
  }
}

// ✅ WITH pre-compiling - You only need:
{
  "dependencies": {
    "@npm_leadtech/cv-ui-kit": "^1.0.0"
  }
  // No need for Babel for libraries!
}
```

#### ⚙️ Simpler Webpack configuration

```diff
// ❌ WITHOUT pre-compiling (current)
{
    test: /\.(js|jsx)$/,
    include: [
        APP_DIR,
        path.resolve(__dirname, 'node_modules/@npm_leadtech/cv-ui-kit'),
        // ... more libraries
    ],
    loader: 'babel-loader',  // ← You have to process them
}

// ✅ WITH pre-compiling
{
    test: /\.(js|jsx)$/,
    include: [APP_DIR],  // ← Only your code
    loader: 'babel-loader',
}
// The libraries are already compiled, webpack uses them directly
```

### 📋 JavaScript module formats

| Format           | File                | Description                                | Typical use               |
| ---------------- | ------------------- | ------------------------------------------ | ------------------------- |
| **ES Modules** ✅ | `dist/index.esm.js` | `import/export` — Modern standard          | Bundlers, modern browsers |
| **CommonJS** ✅   | `dist/index.cjs`    | `require/module.exports` — Classic Node.js | Legacy Node scripts       |
| **TypeScript** ✅ | `dist/index.d.ts`   | Type definitions                           | TypeScript projects       |
| UMD              | -                   | Universal wrapper                          | CDN without bundler       |
| IIFE             | -                   | Self-invoking function                     | `<script>` tag in HTML    |

### 🎯 Build characteristics

| Feature                 | Benefit                                                        |
| ----------------------- | -------------------------------------------------------------- |
| **Native tree-shaking** | Bundlers remove unused code automatically                      |
| **Single bundles**      | One bundle per format (ES modules and CommonJS) for simplicity |
| **Source maps**         | Easier debugging with source code maps                         |
| **Target ES2015**       | Compatible with most modern browsers                           |
| **No minification**     | The consumer controls minification for better debugging        |

### 🔧 How it works

1. **In the library repo:**

   ```bash
   npm run build  # Builds with Vite
   # Generates: dist/index.esm.js, dist/index.cjs, dist/index.d.ts
   ```

2. **In your project:**

   ```tsx
   import { Button } from '@npm_leadtech/cv-ui-kit';
   // Webpack automatically resolves:
   // - ES modules: dist/index.esm.js
   // - CommonJS: dist/index.cjs
   // ✅ No babel-loader needed
   ```

### ✅ Compatibility

This library is compatible with:

- ✅ **Vite** (recommended)
- ✅ **webpack 5+**
- ✅ **Next.js**
- ✅ **Remix**
- ✅ **Create React App**
- ✅ **Modern browsers** (Chrome 80+, Firefox 75+, Safari 14+, Edge 80+)

## 📄 License

ISC © [Leadtech](https://bitbucket.org/grupoblidoo/cv-ui-kit)
