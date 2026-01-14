"use client";


import useWindowBreakpoint from "../_context/window-breakpoint-context";


export function ClientLayout(props: { children: React.ReactNode }) {
  const windowBreakpoint = useWindowBreakpoint();

  return <>{!!windowBreakpoint.breakpoint && props.children}</>;
}
