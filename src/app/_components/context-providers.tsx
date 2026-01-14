"use client";

import { HeroUIProvider } from "@heroui/react";
import { PortalNavbarProvider } from "../_context/portal-navbar-context";
import { localeConfigs } from "../config/locale";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ContextProviders(
  props: Readonly<{ children: React.ReactNode }>,
) {
  const router = useRouter();
  const locale = useLocale();
  const uiLocale =
    localeConfigs.find((e) => e.key === locale)?.heroUiLocale ?? "";

  return (
    <HeroUIProvider locale={uiLocale} navigate={router.push}>
      <NextThemesProvider enableSystem attribute="class">
        <PortalNavbarProvider>{props.children}</PortalNavbarProvider>
      </NextThemesProvider>
    </HeroUIProvider>);
}
