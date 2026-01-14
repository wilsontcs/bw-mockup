"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type BreakpointType = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

// REF: https://tailwindcss.com/docs/responsive-design#targeting-a-breakpoint-range
export const Breakpoint: Record<BreakpointType, number> = {
  "2xl": 1536,
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640,
  xs: 475, // Custom define.
};

type WindowBreakpointContextProps = {
  breakpoint: BreakpointType | null;
};

const WindowBreakpointContext = createContext<
  WindowBreakpointContextProps | undefined
>(undefined);

export function WindowBreakpointProvider(props: { children: React.ReactNode }) {
  const [breakpoint, setBreakpoint] = useState<BreakpointType | null>(null);

  const handleWindowResize = () => {
    const width = window.innerWidth;

    if (width > 0) {
      const entries = Object.entries(Breakpoint);

      let _breakpoint: BreakpointType = "xs";

      for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i];

        if (width >= value) {
          _breakpoint = key as BreakpointType;

          break;
        }
      }

      if (_breakpoint !== breakpoint) {
        setBreakpoint(_breakpoint);
      }
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    const debouncedResizeHandler = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(handleWindowResize, 30);
    };

    setTimeout(handleWindowResize, 0);

    window.addEventListener("resize", debouncedResizeHandler);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }

      window.removeEventListener("resize", debouncedResizeHandler);
    };
  }, []);

  return (
    <WindowBreakpointContext.Provider
      value={{
        breakpoint,
      }}
    >
      {props.children}
    </WindowBreakpointContext.Provider>
  );
}

export default function useWindowBreakpoint() {
  const context = useContext(WindowBreakpointContext);

  if (!context) {
    throw new Error(
      "useWindowBreakpoint must be used within a WindowBreakpointContext",
    );
  }

  const eq = (breakpointType: BreakpointType) => {
    return window.innerWidth === Breakpoint[breakpointType];
  };

  const gt = (breakpointType: BreakpointType) => {
    return window.innerWidth > Breakpoint[breakpointType];
  };

  const gte = (breakpointType: BreakpointType) => {
    return window.innerWidth >= Breakpoint[breakpointType];
  };

const lt = (breakpointType: BreakpointType) => {
  if (!context.breakpoint) return false;
  return Breakpoint[context.breakpoint] < Breakpoint[breakpointType];
};

  const lte = (breakpointType: BreakpointType) => {
    return window.innerWidth <= Breakpoint[breakpointType];
  };

  return {
    breakpoint: context.breakpoint,
    eq,
    gt,
    gte,
    lt,
    lte,
  };
}
