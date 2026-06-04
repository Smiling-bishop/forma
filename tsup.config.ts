// tsup.config.ts
import {defineConfig} from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm'],
    dts: {
        compilerOptions: {
            ignoreDeprecations: '6.0',
        },
    },
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom', 'tailwindcss', 'motion'],
    esbuildOptions(options) {
        options.alias = {
            '@/components': './src/components',
            '@/lib': './src/lib',
            '@/styles': './src/styles',
        }
    },
})