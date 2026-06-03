"use client";
import {AnimatePresence, motion, type Variants} from "motion/react";
import {type HTMLAttributes, isValidElement, type ReactElement} from "react";
import {cn} from "@/lib/utils";

// ─── Constants ────────────────────────────────────────────────────────────────

const GRID_COLS_CLS = {prefix: "grid-cols-"} as const;
const BENTO_COLS_CLS = {prefix: "bento-cols-"} as const;
const COL_SPAN_CLS = {prefix: "col-span-"} as const;
const ROW_SPAN_CLS = {prefix: "row-span-"} as const;

// ─── Variants Framer Motion ───────────────────────────────────────────────────

const BENTO_VARIANTS: Variants = {
    hidden: {opacity: 0, scale: 0.96},
    visible: {
        opacity: 1,
        scale: 1,
        transition: {duration: 0.2, ease: "easeOut"},
    },
    exit: {
        opacity: 0,
        scale: 0.96,
        transition: {duration: 0.15, ease: "easeIn"},
    },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type Size = 1 | 2 | 3 | 4 | 5 | 6;
type Responsive<T = Size> = T | { base?: T; sm?: T; md?: T; lg?: T };

type AspectRatio = [number, number];

interface BentoBoxProps extends HTMLAttributes<HTMLDivElement> {
    cols?: Responsive;
    baseAspect?: AspectRatio;
    dense?: boolean;
}

interface BentoElementProps {
    children: ReactElement<{ className?: string }>;
    layoutId: string; // same as key
    colSpan?: Responsive;
    rowSpan?: Responsive;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function classNamesFromSize(
    cls: { prefix?: string; suffix?: string },
    size: Responsive,
    prefixBp: string = "",
) {
    return cn(
        typeof size === "number" && [cls.prefix, size, cls.suffix].join(""),
        typeof size !== "number" &&
        Object.entries(size)
            .map(([bp, sizeEl]) =>
                [
                    bp !== "base" ? `${prefixBp}${bp}` : null,
                    [cls.prefix, sizeEl, cls.suffix].join(""),
                ]
                    .filter(Boolean)
                    .join(":"),
            )
            .join(" "),
    );
}

function bentoColsSize(
    cls: { prefix?: string; suffix?: string },
    size: Responsive,
) {
    return cn(
        typeof size === "number" && [cls.prefix, size, cls.suffix].join(""),
        typeof size !== "number" &&
        Object.entries(size)
            .map(([bp, sizeEl]) =>
                [
                    cls.prefix?.replace(/-$/g, ""),
                    bp !== "base" ? bp : null,
                    sizeEl,
                    cls.suffix,
                ]
                    .filter(Boolean)
                    .join("-"),
            )
            .join(" "),
    );
}

// ─── BentoBox (root) ──────────────────────────────────────────────────────────

function BentoBox({
                      cols = 4,
                      dense = false,
                      className,
                      baseAspect = [1, 1],
                      children,
                      style,
                      ...props
                  }: BentoBoxProps) {
    return (
        <div
            className={cn(
                "grid",
                classNamesFromSize(GRID_COLS_CLS, cols),
                bentoColsSize(BENTO_COLS_CLS, cols),
                "gap-3",
                dense && "grid-flow-dense",
                className,
            )}
            style={{
                ...(style || {}),
                gridAutoRows: `calc((100cqw - (12px * (var(--bento-cols) - 1))) / var(--bento-cols) * (${baseAspect[0]} / ${baseAspect[1]}))`,
            }}
            {...props}
        >
            <AnimatePresence mode="popLayout">{children}</AnimatePresence>
        </div>
    );
}

// ─── BentoBox.Element ─────────────────────────────────────────────────────────

function BentoElement({
                          colSpan = 1,
                          rowSpan = 1,
                          layoutId,
                          children,
                      }: BentoElementProps) {
    if (!isValidElement(children)) {
        throw new Error("BentoBox.Element attend un unique enfant React valide");
    }

    return (
        <motion.div
            layoutId={layoutId}
            layout // repositionnement fluide
            variants={BENTO_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
                classNamesFromSize(COL_SPAN_CLS, colSpan),
                classNamesFromSize(ROW_SPAN_CLS, rowSpan),
            )}
        >
            {children}
        </motion.div>
    );
}

// ─── Attach sub-component ─────────────────────────────────────────────────────

BentoBox.Element = BentoElement;

export type {BentoBoxProps, BentoElementProps};
export {BentoBox};
