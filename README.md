# Forma

Storybook → https://smiling-bishop.github.io/forma

A private UI component library built with React, Tailwind CSS v4, and Motion. Distributed as a compiled ESM package — built automatically on install.

## Stack

* React 19 — UI components
* Tailwind CSS v4 — styling via `@tailwindcss/vite`
* Motion (`motion/react`) — animations and layout transitions
* Storybook 10 — component development and documentation
* Vitest + Playwright — interaction tests via story `play()` functions
* Biome 2 — lint and format

## Usage

### Option A — Git dependency (public repo)

```json
// your-app/package.json
{
  "dependencies": {
    "forma": "github:Smiling-bishop/forma",
    "forma": "github:Smiling-bishop/forma#main",    // pin to branch
    "forma": "github:Smiling-bishop/forma#abc1234"  // pin to commit
  }
}
```

```bash
pnpm install
```

**1. Import the styles and configure Tailwind**

`forma/styles` maps to `src/styles/index.css` — it includes Tailwind and all utility classes (including `bento-cols-*`). The `@source` directive points to `src/` so Tailwind can scan the original class names.

Next.js

```css
/* app/globals.css */
@import "forma/styles";
@source "../../node_modules/forma/src";
```

Vite / React

```css
/* src/index.css */
@import "forma/styles";
@source "../../node_modules/forma/src";
```

**2. Import and use components**

```tsx
import { BentoBox } from "forma"

export default function Gallery() {
  return (
    <div className="@container">
      <BentoBox cols={{ base: 1, sm: 2, lg: 4 }} dense baseAspect={[4, 3]}>
        <BentoBox.Element key="a" layoutId="a" colSpan={2}>
          <MyCard />
        </BentoBox.Element>
        <BentoBox.Element key="b" layoutId="b" rowSpan={2}>
          <MyCard />
        </BentoBox.Element>
      </BentoBox>
    </div>
  )
}
```

---

### Option B — Git dependency (private repo)

SSH — recommended if your machine has an SSH key configured on GitHub:

```json
{
  "dependencies": {
    "forma": "git+ssh://git@github.com:Smiling-bishop/forma.git",
    "forma": "git+ssh://git@github.com:Smiling-bishop/forma.git#main"
  }
}
```

HTTPS with token — for CI or machines without SSH configured:

```json
{
  "dependencies": {
    "forma": "git+https://your-token@github.com/Smiling-bishop/forma.git"
  }
}
```

Generate a GitHub token with the `repo` scope. In CI, use an environment variable:

```bash
# GitHub Actions or any CI
GITHUB_TOKEN=ghp_xxx pnpm install
```

```json
"forma": "git+https://${GITHUB_TOKEN}@github.com/Smiling-bishop/forma.git"
```

Then follow steps 1–2 from Option A.

---

## Development

```bash
# Install dependencies
pnpm install

# Start Storybook (component development)
pnpm dev

# Run interaction tests once
pnpm test --run

# Lint and format
pnpm check
```

## Project structure

```
forma/
├── dist/                     # Compiled output (auto-generated)
│   ├── index.js
│   └── index.d.ts
├── src/
│   ├── components/
│   │   ├── index.ts
│   │   └── bento-box/
│   │       ├── bento-box.tsx
│   │       ├── bento-box.stories.tsx
│   │       └── image-tile.tsx
│   ├── lib/
│   │   └── utils.ts          # cn() utility
│   ├── styles/
│   │   └── index.css         # Tailwind + bento-cols utilities
│   └── index.ts              # Public API
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── biome.json
├── tsup.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

## License

MIT