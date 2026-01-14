import { PortalNavbarProvider } from "../_context/portal-navbar-context";

export function ContextProviders(
  props: Readonly<{ children: React.ReactNode }>,
) {
  return <PortalNavbarProvider>{props.children}</PortalNavbarProvider>;
}
