# Forma

A private UI component library built with React, Tailwind CSS v4, and Motion. Distributed as source — no build step required.

## Stack

- **React 19** — UI components
- **Tailwind CSS v4** — styling via `@tailwindcss/vite`
- **Motion** (`motion/react`) — animations and layout transitions
- **Storybook 10** — component development and documentation
- **Vitest + Playwright** — interaction tests via story `play()` functions
- **Biome 2** — lint and format

---

## Usage

### Option A — Local file link

Best for monorepo or side-by-side projects on the same machine.

**1. Add the dependency**

```json
// your-app/package.json
{
  "dependencies": {
    "forma": "file:../forma"
  }
}
```

```bash
pnpm install
```

**2. Configure your bundler**

<details>
<summary><strong>Next.js</strong></summary>

```ts
// your-app/next.config.ts
const nextConfig = {
  transpilePackages: ["forma"],
}

export default nextConfig
```

</details>

<details>
<summary><strong>Vite / React</strong></summary>

No extra config needed — Vite resolves `file:` dependencies natively.

Make sure `@tailwindcss/vite` is installed in your app:

```bash
pnpm add -D @tailwindcss/vite
```

```ts
// your-app/vite.config.ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

</details>

**3. Import the styles and configure Tailwind to scan forma's source**

`forma/styles` maps to `src/styles/index.css` in this repo — it includes Tailwind and all utility classes (including `bento-cols-*`).

<details>
<summary><strong>Next.js</strong></summary>

```css
/* your-app/app/globals.css */
@import "tailwindcss";
@import "forma/styles";

/* Let Tailwind scan forma components to generate their classes */
@source "../node_modules/forma/src";
```

</details>

<details>
<summary><strong>Vite / React</strong></summary>

```css
/* your-app/src/index.css */
@import "tailwindcss";
@import "forma/styles";

/* Let Tailwind scan forma components to generate their classes */
@source "../node_modules/forma/src";
```

```tsx
// your-app/src/main.tsx
import "./index.css"
```

</details>

**4. Import and use components**

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

### Option B — Git dependency (public repo)

```json
// your-app/package.json
{
  "dependencies": {
    "forma": "github:your-username/forma",
    "forma": "github:your-username/forma#main",   // pin to branch
    "forma": "github:your-username/forma#abc1234" // pin to commit
  }
}
```

```bash
pnpm install
```

Then follow steps 2–4 from Option A, replacing the `@source` path:

```css
@source "../../node_modules/forma/src";
```

---

### Option B — Git dependency (private repo)

**SSH** — recommended if your machine has an SSH key configured on GitHub:

```json
{
  "dependencies": {
    "forma": "git+ssh://git@github.com:your-username/forma.git",
    "forma": "git+ssh://git@github.com:your-username/forma.git#main"
  }
}
```

**HTTPS with token** — for CI or machines without SSH configured:

```json
{
  "dependencies": {
    "forma": "git+https://your-token@github.com/your-username/forma.git"
  }
}
```

Generate a GitHub token with the `repo` scope. In CI, use an environment variable:

```bash
# GitHub Actions or any CI
GITHUB_TOKEN=ghp_xxx pnpm install
```

```json
"forma": "git+https://${GITHUB_TOKEN}@github.com/your-username/forma.git"
```

Then follow steps 2–4 from Option A, replacing the `@source` path:

```css
@source "../../node_modules/forma/src";
```

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

---

## Project structure

```
forma/
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
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## License

MIT