// components/ui/bento-box/bento-box.stories.tsx
import type {Meta, StoryObj} from "@storybook/react-vite";
import {expect, within} from "storybook/test";
import {BentoBox} from "./bento-box";

// ─── Composants de démo ───────────────────────────────────────────────────────

function Tile({
                  className,
                  label,
                  value,
              }: {
    className?: string;
    label: string;
    value?: string;
}) {
    return (
        <div
            data-testid="tile"
            className={`flex h-full flex-col rounded-xl border border-border bg-card p-4 ${className ?? ""}`}
        >
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
            </p>
            {value && (
                <p className="mt-auto text-3xl font-medium text-foreground">{value}</p>
            )}
        </div>
    );
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

/**
 * `BentoBox` est un composant de mise en page CSS Grid qui suit le pattern
 * **Compound Component** — `BentoBox` définit la grille, `BentoBox.Element`
 * positionne chaque cellule.
 *
 * ## Caractéristiques
 * - Colonnes et spans **responsive** via `{ base, sm, md, lg }`
 * - Ratio de cellule automatique calculé depuis `baseAspect` et `cqw`
 * - Animations d'entrée/sortie/repositionnement via **Framer Motion**
 * - `dense` pour combler les trous automatiquement (`grid-auto-flow: dense`)
 *
 * ## Installation
 * ```bash
 * # Dépendances requises
 * pnpm add motion
 * ```
 *
 * ## Prérequis CSS
 * Ajouter dans `globals.css` les utilitaires `bento-cols-*` pour le
 * responsive via container queries. Voir la documentation complète.
 *
 * ```tsx
 * import { BentoBox } from "@/components/ui/bento-box"
 * ```
 */
const meta = {
    title: "UI/BentoBox",
    component: BentoBox,
    tags: ["autodocs"],
    parameters: {
        layout: "padded",
        docs: {
            description: {
                component: [
                    "Grille bento composable avec animations et responsive intégré.",
                    "",
                    "**Pattern Compound Component** — utilise `BentoBox.Element` pour chaque cellule.",
                    "",
                    "**Dépendance** : `@container` doit être posé sur l'ancêtre direct de `BentoBox`",
                    "pour que `cqw` et les container queries fonctionnent correctement.",
                ].join("\n"),
            },
        },
    },
    argTypes: {
        cols: {
            control: {type: "select"},
            options: [1, 2, 3, 4, 5, 6],
            description: [
                "Nombre de colonnes de la grille.",
                "Accepte une valeur simple ou un objet responsive `{ base, sm, md, lg }`.",
                "",
                "```tsx",
                "cols={4}",
                "cols={{ base: 1, sm: 2, lg: 4 }}",
                "```",
            ].join("\n"),
            table: {
                type: {summary: "Responsive<1 | 2 | 3 | 4 | 5 | 6>"},
                defaultValue: {summary: "4"},
            },
        },
        baseAspect: {
            control: false,
            description: [
                "Ratio `[width, height]` d'une cellule 1×1.",
                "Les cellules multi-colonnes/lignes sont calculées automatiquement.",
                "",
                "```tsx",
                "baseAspect={[4, 3]}  // paysage 4:3",
                "baseAspect={[3, 4]}  // portrait 3:4",
                "baseAspect={[16, 9]} // cinéma",
                "```",
                "",
                "| Cellule | baseAspect [4,3] | Ratio résultant |",
                "|---------|-----------------|-----------------|",
                "| 1×1     | [4,3]           | 4:3             |",
                "| 2×1     | [4,3]           | 8:3             |",
                "| 1×2     | [4,3]           | 4:6 = 2:3       |",
                "| 2×2     | [4,3]           | 8:6 = 4:3       |",
            ].join("\n"),
            table: {
                type: {summary: "[number, number]"},
                defaultValue: {summary: "[1, 1]"},
            },
        },
        dense: {
            control: "boolean",
            description: [
                "Active `grid-auto-flow: dense`.",
                "Le moteur CSS remonte pour combler les trous laissés par les cellules multi-spans.",
                "⚠️ Peut changer l'ordre visuel des éléments.",
            ].join("\n"),
            table: {
                type: {summary: "boolean"},
                defaultValue: {summary: "false"},
            },
        },
    },
} satisfies Meta<typeof BentoBox>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────────────────────────────────────
// FONDAMENTAUX
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Configuration de base : 4 colonnes, 3 tailles de cellules combinées.
 *
 * Les 3 formats fondamentaux d'une grille bento :
 * - **1×1** — cellule standard
 * - **2×1** — large (deux colonnes)
 * - **1×2** — tall (deux lignes)
 */
export const Default: Story = {
    args: {cols: 4, dense: false},
    render: (args) => (
        <div className="@container">
            <BentoBox {...args}>
                <BentoBox.Element layoutId="a" colSpan={2}>
                    <Tile label="2×1 — large" value="19 400 €"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="b" rowSpan={2}>
                    <Tile label="1×2 — tall" value="74%"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="c">
                    <Tile label="1×1" value="128"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="d">
                    <Tile label="1×1" value="4.8"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="e">
                    <Tile label="1×1" value="31"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="f" colSpan={2}>
                    <Tile label="2×1 — large" value="↗ +18%"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="g">
                    <Tile label="1×1" value="3"/>
                </BentoBox.Element>
            </BentoBox>
        </div>
    ),
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement);
        const grid = canvasElement.querySelector(".grid") as HTMLElement;

        // Grille présente
        expect(grid).toBeInTheDocument();

        // 4 colonnes par défaut
        expect(grid.classList).toContain("grid-cols-4");

        // dense désactivé
        expect(grid.className).not.toContain("grid-flow-dense");

        // 7 tiles rendus
        const tiles = canvas.getAllByTestId("tile");
        expect(tiles).toHaveLength(7);
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// COLONNES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Grille **2 colonnes** — layout serré, adapté aux sidebars ou écrans étroits.
 */
export const TwoColumns: Story = {
    args: {cols: 2},
    render: (args) => (
        <div className="@container">
            <BentoBox {...args}>
                <BentoBox.Element layoutId="a" colSpan={2}>
                    <Tile label="Pleine largeur — 2×1" value="Bannière"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="b" rowSpan={2}>
                    <Tile label="1×2 — tall" value="↕"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="c">
                    <Tile label="1×1" value="A"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="d">
                    <Tile label="1×1" value="B"/>
                </BentoBox.Element>
            </BentoBox>
        </div>
    ),
    play: async ({canvasElement}) => {
        const grid = canvasElement.querySelector(".grid") as HTMLElement;
        expect(grid.classList).toContain("grid-cols-2");
    },
};

/**
 * Grille **3 colonnes** — équilibre entre densité et lisibilité.
 */
export const ThreeColumns: Story = {
    args: {cols: 3},
    render: (args) => (
        <div className="@container">
            <BentoBox {...args}>
                <BentoBox.Element layoutId="a" colSpan={3}>
                    <Tile label="Pleine largeur — 3×1" value="Header"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="b" rowSpan={2}>
                    <Tile label="1×2" value="Tall"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="c">
                    <Tile label="1×1" value="A"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="d">
                    <Tile label="1×1" value="B"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="e" colSpan={2}>
                    <Tile label="2×1" value="Large"/>
                </BentoBox.Element>
            </BentoBox>
        </div>
    ),
    play: async ({canvasElement}) => {
        const grid = canvasElement.querySelector(".grid") as HTMLElement;
        expect(grid.classList).toContain("grid-cols-3");
    },
};

/**
 * Colonnes **responsive** — 1 colonne sur mobile, 2 sur tablette, 4 sur desktop.
 *
 * Nécessite les utilitaires `bento-cols-*` dans `globals.css` et
 * un ancêtre `@container`.
 *
 * ```tsx
 * cols={{ base: 1, sm: 2, lg: 4 }}
 * ```
 */
export const ResponsiveCols: Story = {
    render: () => (
        <div className="@container">
            <BentoBox cols={{base: 1, sm: 2, lg: 4}} dense>
                {Array.from({length: 6}, (_, i) => (
                    <BentoBox.Element key={i} layoutId={`r${i}`}>
                        <Tile label={`Cellule ${i + 1}`} value={`${i + 1}`}/>
                    </BentoBox.Element>
                ))}
            </BentoBox>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story:
                    "Redimensionne la fenêtre pour observer le changement de colonnes.",
            },
        },
    },
    play: async ({canvasElement}) => {
        const grid = canvasElement.querySelector(".grid") as HTMLElement;
        // base: 1 col
        expect(grid.classList).toContain("grid-cols-1");
        // classes responsive présentes
        expect(grid.classList).toContain("sm:grid-cols-2");
        expect(grid.classList).toContain("lg:grid-cols-4");
        // vars container queries présentes
        expect(grid.classList).toContain("bento-cols-1");
        expect(grid.classList).toContain("bento-cols-sm-2");
        expect(grid.classList).toContain("bento-cols-lg-4");
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// DENSE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * **Sans `dense`** — les éléments qui ne rentrent pas sur une ligne
 * laissent un trou visible dans la grille.
 */
export const WithoutDense: Story = {
    args: {cols: 4, dense: false},
    render: (args) => (
        <div className="@container">
            <BentoBox {...args}>
                <BentoBox.Element layoutId="a" colSpan={2}>
                    <Tile label="A — 2×1"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="b" rowSpan={2}>
                    <Tile label="B — 1×2"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="c">
                    <Tile label="C — 1×1"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="d" colSpan={2}>
                    <Tile label="D — 2×1 → trou avant lui"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="e">
                    <Tile label="E — 1×1"/>
                </BentoBox.Element>
            </BentoBox>
        </div>
    ),
    play: async ({canvasElement}) => {
        const grid = canvasElement.querySelector(".grid") as HTMLElement;
        expect(grid.className).not.toContain("grid-flow-dense");
    },
};

/**
 * **Avec `dense`** — `grid-auto-flow: dense` remonte pour combler
 * les trous automatiquement.
 *
 * ⚠️ L'ordre visuel peut différer de l'ordre du DOM.
 */
export const WithDense: Story = {
    args: {cols: 4, dense: true},
    render: (args) => (
        <div className="@container">
            <BentoBox {...args}>
                <BentoBox.Element layoutId="a" colSpan={2}>
                    <Tile label="A — 2×1"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="b" rowSpan={2}>
                    <Tile label="B — 1×2"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="c">
                    <Tile label="C — 1×1"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="d" colSpan={2}>
                    <Tile label="D — 2×1"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="e">
                    <Tile label="E — comblé ici"/>
                </BentoBox.Element>
            </BentoBox>
        </div>
    ),
    play: async ({canvasElement}) => {
        const grid = canvasElement.querySelector(".grid") as HTMLElement;
        expect(grid.classList).toContain("grid-flow-dense");
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// RATIO
// ─────────────────────────────────────────────────────────────────────────────

/**
 * **Ratio paysage 4:3** — configuration typique pour une galerie photo.
 *
 * Les ratios des cellules multi-spans sont calculés automatiquement :
 * - 1×1 → 4:3
 * - 2×1 → 8:3
 * - 1×2 → 4:6 (portrait)
 */
export const AspectLandscape: Story = {
    render: () => (
        <div className="@container">
            <BentoBox cols={3} dense baseAspect={[4, 3]}>
                <BentoBox.Element layoutId="a" colSpan={2}>
                    <Tile label="2×1 → 8:3"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="b" rowSpan={2}>
                    <Tile label="1×2 → 4:6"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="c">
                    <Tile label="1×1 → 4:3"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="d">
                    <Tile label="1×1 → 4:3"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="e" colSpan={2}>
                    <Tile label="2×1 → 8:3"/>
                </BentoBox.Element>
            </BentoBox>
        </div>
    ),
    play: async ({canvasElement}) => {
        const grid = canvasElement.querySelector(".grid") as HTMLElement;
        expect(grid.style.gridAutoRows).toContain("4");
        expect(grid.style.gridAutoRows).toContain("3");
    },
};

/**
 * **Ratio portrait 3:4** — adapté aux photos verticales.
 */
export const AspectPortrait: Story = {
    render: () => (
        <div className="@container">
            <BentoBox cols={4} dense baseAspect={[3, 4]}>
                <BentoBox.Element layoutId="a" colSpan={2}>
                    <Tile label="2×1 → 6:4"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="b">
                    <Tile label="1×1 → 3:4"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="c">
                    <Tile label="1×1 → 3:4"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="d" colSpan={2} rowSpan={2}>
                    <Tile label="2×2 → 6:8 = 3:4"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="e">
                    <Tile label="1×1 → 3:4"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="f">
                    <Tile label="1×1 → 3:4"/>
                </BentoBox.Element>
            </BentoBox>
        </div>
    ),
};

// ─────────────────────────────────────────────────────────────────────────────
// SPANS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * **`colSpan`** — contrôle la largeur de la cellule en nombre de colonnes.
 *
 * ```tsx
 * <BentoBox.Element colSpan={2}>  // occupe 2 colonnes
 * <BentoBox.Element colSpan={{ base: 1, md: 2 }}>  // responsive
 * ```
 */
export const ColSpans: Story = {
    render: () => (
        <div className="@container">
            <BentoBox cols={4}>
                {([1, 2, 3, 4] as const).map((span) => (
                    <BentoBox.Element key={span} layoutId={`cs${span}`} colSpan={span}>
                        <Tile label={`colSpan=${span}`}/>
                    </BentoBox.Element>
                ))}
            </BentoBox>
        </div>
    ),
    play: async ({canvasElement}) => {
        const motionDivs = canvasElement.querySelectorAll(
            ".col-span-1, .col-span-2, .col-span-3, .col-span-4",
        );
        expect(motionDivs).toHaveLength(4);
    },
};

/**
 * **`rowSpan`** — contrôle la hauteur de la cellule en nombre de lignes.
 *
 * ```tsx
 * <BentoBox.Element rowSpan={2}>  // occupe 2 lignes
 * ```
 */
export const RowSpans: Story = {
    render: () => (
        <div className="@container">
            <BentoBox cols={4} dense>
                <BentoBox.Element layoutId="r2" rowSpan={2}>
                    <Tile label="rowSpan=2" value="↕"/>
                </BentoBox.Element>
                <BentoBox.Element layoutId="r3" rowSpan={3}>
                    <Tile label="rowSpan=3" value="↕↕"/>
                </BentoBox.Element>
                {Array.from({length: 6}, (_, i) => (
                    <BentoBox.Element key={i} layoutId={`f${i}`}>
                        <Tile label="1×1"/>
                    </BentoBox.Element>
                ))}
            </BentoBox>
        </div>
    ),
    play: async ({canvasElement}) => {
        const row2 = canvasElement.querySelector(".row-span-2");
        const row3 = canvasElement.querySelector(".row-span-3");
        expect(row2).toBeTruthy();
        expect(document.contains(row2)).toBe(true);
        expect(row3).toBeTruthy();
        expect(document.contains(row3)).toBe(true);
    },
};
