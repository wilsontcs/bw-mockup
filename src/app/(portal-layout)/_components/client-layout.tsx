"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useWindowBreakpoint from "../../_context/window-breakpoint-context";
import { PortalNavbar } from "../../_context/portal-navbar-context";




export default function ClientLayout(props: { children: React.ReactNode }) {
  const windowBreakpoint = useWindowBreakpoint();
  const pathname = usePathname();

  const isLargeScreen = windowBreakpoint.gte("lg");

  useEffect(() => {
    document.documentElement.classList.add("portal-layout");

    return () => {
      document.documentElement.classList.remove("portal-layout");
    };
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen w-full max-w-[1440px] mx-auto">
      <PortalNavbar />

      {props.children}
    </div>
  );
}
