import type {HTMLAttributes, ReactElement} from "react";

type BentoElementSize = 1 | 2 | 3 | 4 | 5 | 6;
type BentoResponsive<T = BentoElementSize> =
    | T
    | { base?: T; sm?: T; md?: T; lg?: T };

type AspectRatio = [number, number];

interface BentoBoxProps extends HTMLAttributes<HTMLDivElement> {
    cols?: BentoResponsive;
    baseAspect?: AspectRatio;
    dense?: boolean;
}

interface BentoElementProps {
    children: ReactElement<{ className?: string }>;
    layoutId: string; // same as key
    colSpan?: BentoResponsive;
    rowSpan?: BentoResponsive;
}

export type {BentoBoxProps, BentoElementProps, BentoResponsive};
