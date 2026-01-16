"use client";

import { useLocale, useTranslations } from "next-intl";
import { createContext, useContext, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
// import Image from "next/image";
import { Image } from "@heroui/image";
import { Link } from "@heroui/react";

import useWindowBreakpoint from "./window-breakpoint-context";
import { LocalConfigProps, localeConfigs } from "../config/locale";
import { portalNavbarConfig, PortalNavbarConfigProps } from "../config/navigation";
import { LucideChevronDown, LucideCircleUser, LucideGlobe } from "lucide-react";
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
  const windowBreakpoint = useWindowBreakpoint();

  const t = useTranslations();
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);



  const isActiveLocale = (config: LocalConfigProps) => {
    const isActive = locale === config.key;

    return isActive;
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



  const targetDate = new Date("2026-02-01T00:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Navbar
      shouldHideOnScroll
      classNames={{ base: "py-2  bg-[#112a4d]", menu: "mt-4 py-4", }}
      isMenuOpen={isMenuOpen}
      maxWidth="full"
    >
      <NavbarContent className="flex gap-x-10 max-w-[1520px] w-full mx-auto " justify="center" >
        <Link href="/">
          <Image removeWrapper src="/images/bg-icon.png" width={200} />
        </Link>

        {/* Navbar Nav items start here */}
        <div className="hidden xl:flex items-center w-full">

          {/* LEFT SIDE: Promotion + Timer */}
          <div className="flex items-center gap-x-6">
            <span className="text-white font-medium leading-tight max-w-[90px] text-left mx-20">
              {t("promotion_ends_in")}
            </span>

            <div className="flex items-center gap-3 text-white">
              {/* Days */}
              <div className="flex flex-col items-center">
                <span className="text-3xl">{timeLeft.days}</span>
                <span className="text-xs uppercase">{t("days")}</span>
              </div>

              <span className="text-3xl">:</span>

              {/* Hours */}
              <div className="flex flex-col items-center">
                <span className="text-3xl">{timeLeft.hours}</span>
                <span className="text-xs uppercase">{t("hours")}</span>
              </div>

              <span className="text-3xl">:</span>

              {/* Minutes */}
              <div className="flex flex-col items-center">
                <span className="text-3xl">{timeLeft.minutes}</span>
                <span className="text-xs uppercase">{t("minutes")}</span>
              </div>

              <span className="text-3xl">:</span>

              {/* Seconds */}
              <div className="flex flex-col items-center">
                <span className="text-3xl">{timeLeft.seconds}</span>
                <span className="text-xs uppercase">{t("seconds")}</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: push to end */}
          <div className="ml-auto flex items-center gap-4">
            <Button
              variant="solid"
              className="bg-orange-500 text-white font-semibold"
              radius="full"
            >
              {t("register_now")}
            </Button>

            <Dropdown>
              <DropdownTrigger>
                <LucideCircleUser size={35} className="text-white" />
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu">
                <DropdownItem key="login">{t("login")}</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          <NavbarItem className="hidden md:block pl-4">
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
                    <LucideGlobe size={18} />
                    <LucideChevronDown
                      className="hidden md:flex text-white/80"
                      size={16}
                    />
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
        </div>
      </NavbarContent>

    </Navbar>
  );
}
