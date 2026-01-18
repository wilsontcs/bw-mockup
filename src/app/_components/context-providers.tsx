"use client";

import { HeroUIProvider } from "@heroui/react";
import { PortalNavbarProvider } from "../_context/portal-navbar-context";
import { localeConfigs } from "../config/locale";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { UserDataProvider } from "../_context/user-data-context";

export function ContextProviders(
  props: Readonly<{ children: React.ReactNode }>,
) {
  const router = useRouter();
  const locale = useLocale();
  const uiLocale =
    localeConfigs.find((e) => e.key === locale)?.heroUiLocale ?? "";

  return (
    <HeroUIProvider locale={uiLocale} navigate={router.push}>
      <PortalNavbarProvider>
        <UserDataProvider>
          {props.children}</UserDataProvider></PortalNavbarProvider>
    </HeroUIProvider>);
}
