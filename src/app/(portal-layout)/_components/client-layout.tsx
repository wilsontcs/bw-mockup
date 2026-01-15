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
    <div className=" h-full w-full bg-[#3A53BA]">
      <PortalNavbar />

      {/* Constrained content layer */}
      <div className="relative flex flex-col min-h-screen w-full max-w-[1520px] mx-auto">
        {props.children}
      </div>

    </div>

  );
}
