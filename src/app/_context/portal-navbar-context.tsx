"use client";

import { useLocale, useTranslations } from "next-intl";
import { createContext, useContext, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Menu,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
// import Image from "next/image";
import { Image } from "@heroui/image";
import { Link } from "@heroui/react";
import clsx from "clsx";

import useWindowBreakpoint from "./window-breakpoint-context";
import { LocalConfigProps, localeConfigs } from "../config/locale";
import { portalNavbarConfig, PortalNavbarConfigProps } from "../config/navigation";
import { textTv } from "../styles/text-tv";

type PortalNavbarContextProps = {
  navbarConfig: PortalNavbarConfigProps[];
  activeMenuKey: string;
  setActiveMenuKey: (key: string) => void;
};

// Context
const PortalNavbarContext = createContext<PortalNavbarContextProps | undefined>(
  undefined,
);

// Provider
export function PortalNavbarProvider(props: { children: React.ReactNode }) {
  const t = useTranslations();

  const [navbarConfig] = useState<PortalNavbarConfigProps[]>(() =>
    portalNavbarConfig((key) => t(key)),
  );
  const [activeMenuKey, setActiveMenuKey] = useState("");

  return (
    <PortalNavbarContext.Provider
      value={{
        navbarConfig,
        activeMenuKey,
        setActiveMenuKey,
      }}
    >
      {props.children}
    </PortalNavbarContext.Provider>
  );
}

// Hook
export function usePortalNavbar() {
  const context = useContext(PortalNavbarContext);

  if (!context) {
    throw new Error(
      "usePortalNavbar must be used within a PortalNavbarProvider",
    );
  }

  return {
    ...context,
  };
}

export function PortalNavbar() {
  const portalNavbar = usePortalNavbar();
  const windowBreakpoint = useWindowBreakpoint();

  const t = useTranslations();
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActiveMenu = (config: PortalNavbarConfigProps) => {
    let isActive = portalNavbar.activeMenuKey === config.key;

    // Check if any child is active
    if (!isActive && config.children) {
      isActive = config.children.some(
        (child) => portalNavbar.activeMenuKey === child.key,
      );
    }

    return isActive;
  };

  const isActiveLocale = (config: LocalConfigProps) => {
    const isActive = locale === config.key;

    return isActive;
  };

  const navbarConfigs = (configs: PortalNavbarConfigProps[]) => {
    return configs.filter((config) => config.isPublic);
  };

  const onLanguageChange = async (config: LocalConfigProps) => {
    const locale = config.key;

    try {
      // Send the POST request to the server
      const response = await fetch("/api/set-locale", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Make sure content type is correct
        },
        body: JSON.stringify({ locale }), // Sending the locale as JSON
      });

      // Check if the response is OK (status 200-299)
      if (response.ok) {
        const responseData = await response.json();

        window.location.reload(); // Reload the page to apply the new locale
      } else {
        // If the response is not OK, log the error
        const errorData = await response.json();

        console.error("Error changing locale:", errorData);
      }
    } catch (error) {
      // Log any errors that occur during the request
      console.error("Error during locale change:", error);
      alert("Request failed!");
    }
  };

  const togleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Navbar
      shouldHideOnScroll
      classNames={{ base: "py-2 xl:py-8 xl:px-5", menu: "mt-4 py-4" }}
      isMenuOpen={isMenuOpen}
      maxWidth="full"
    >
      <NavbarContent className="flex gap-x-10">
        <Link href="/">
          <Image removeWrapper src="/images/bg-icon.png" width={80} />
        </Link>

        {/* Navbar Nav items start here */}
        <div className="hidden xl:flex gap-x-2">
          {navbarConfigs(portalNavbar.navbarConfig).map((navbar) => (
            <NavbarItem key={navbar.key}>
              {navbar.children && navbar.children.length > 0 ? (
                // If the navbar item has children, render a dropdown
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className={clsx(
                        "px-3 py-2 text-white/60 rounded-full font-bold text-base hover:!text-white hover:border-white border-1 border-transparent",
                        isActiveMenu(navbar) &&
                        "!text-white border-white !text-base",
                      )}
                      // endContent={<LucideChevronDown size={16} />}
                      variant="light"
                    >
                      {navbar.label}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label={`${navbar.label} submenu`}>
                    {navbar.children.map((child) => (
                      <DropdownItem
                        key={child.key}
                        onPress={() => {
                          // Navigate to the URL when dropdown item is clicked
                          window.location.href = child.url ?? "/";
                        }}
                      >
                        <span
                          className={textTv({ active: isActiveMenu(child) })}
                        >
                          {child.label}
                        </span>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              ) : (
                // If no children, render a normal link
                <Link href={navbar.url ?? "/"}>
                  <div
                    className={clsx(
                      "px-3 py-2 text-white/60 rounded-full font-bold text-sm hover:!text-white hover:border-white border-1 border-transparent",
                      isActiveMenu(navbar) &&
                      "!text-white border-white !text-sm",
                    )}
                  >
                    {navbar.label.toLocaleUpperCase()}
                  </div>
                </Link>
              )}
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>
      <NavbarContent justify="end">

        <NavbarItem className="hidden md:block">
          <Dropdown
            classNames={{
              base: "before:bg-default-200",
              content: "p-2 border-small border-divider bg-background",
            }}
          >
            <DropdownTrigger>
              <Button
                disableRipple
                isIconOnly={windowBreakpoint.lt("md")}
                radius="full"
                size={"md"}
                variant="bordered"
              >
                <div className="flex space-x-3 items-center">
                  {/* <LucideGlobe size={18} />
                  <LucideChevronDown
                    className="hidden md:flex text-white/80"
                    size={16}
                  /> */}
                </div>
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {localeConfigs.map((locale) => (
                <DropdownItem
                  key={locale.key}
                  onPress={() => onLanguageChange(locale)}
                >
                  <span className={textTv({ active: isActiveLocale(locale) })}>
                    {locale.label}
                  </span>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem className="hidden md:block">
    
        </NavbarItem>
      
      </NavbarContent>
      {/* Menu */}
      <NavbarMenu>
        {navbarConfigs(portalNavbar.navbarConfig).map((navbar) => (
          <NavbarMenuItem key={navbar.key}>
            {navbar.children && navbar.children.length > 0 ? (
              // For items with children, we need to handle the structure differently
              <div>
                <div className="flex items-center mb-2">
                  <span className="font-medium">{navbar.label}</span>
                </div>
                <div className="pl-4">
                  {/* Render child items outside of NavbarMenuItem to avoid nested li elements */}
                  {navbar.children.map((child) => (
                    <div key={child.key} className="ml-4 py-2">
                      <Link
                        className="block"
                        href={child.url ?? "/"}
                        onClick={() => togleMenu()}
                      >
                        <span
                          className={textTv({ active: isActiveMenu(child) })}
                        >
                          {child.label}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // If no children, render a normal link
              <Link href={navbar.url ?? "/"} onClick={() => togleMenu()}>
                <span className={textTv({ active: isActiveMenu(navbar) })}>
                  {navbar.label}
                </span>
              </Link>
            )}
          </NavbarMenuItem>
        ))}

        <NavbarMenuItem className="md:hidden">
          <div className="flex flex-col items-start mt-6 space-y-2">
            <Dropdown
              classNames={{
                base: "before:bg-default-200",
                content: "p-2 border-small border-divider bg-background",
              }}
            >
              <DropdownTrigger>
                <Button
                  disableRipple
                  radius="full"
                  size={"md"}
                  variant="bordered"
                >
                  {/* <div className="flex space-x-3 items-center">
                    <LucideGlobe size={18} />
                    <LucideChevronDown
                      className="flex text-white/80"
                      size={16}
                    />
                  </div> */}
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                {localeConfigs.map((locale) => (
                  <DropdownItem
                    key={locale.key}
                    onPress={() => onLanguageChange(locale)}
                  >
                    <span
                      className={textTv({ active: isActiveLocale(locale) })}
                    >
                      {locale.label}
                    </span>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

          </div>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
