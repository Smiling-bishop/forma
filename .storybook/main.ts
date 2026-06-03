import type { StorybookConfig } from '@storybook/react-vite';
import path from "node:path";
import {fileURLToPath} from "node:url";
import tailwindcss from "@tailwindcss/vite";

const dirname = typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    const { mergeConfig } = await import("vite")
    return mergeConfig(config, {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          "@": path.resolve(dirname, "../src"),
        },
      },
    })
  },
};
export default config;