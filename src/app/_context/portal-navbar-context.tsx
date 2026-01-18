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
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { Image } from "@heroui/image";
import { Link } from "@heroui/react";

import useWindowBreakpoint from "./window-breakpoint-context";
import { LocalConfigProps, localeConfigs } from "../config/locale";
import { portalNavbarConfig, PortalNavbarConfigProps } from "../config/navigation";
import { LucideChevronDown, LucideCircleUser, LucideGlobe } from "lucide-react";
import { textTv } from "../styles/text-tv";
import { useUserData } from "./user-data-context";
import AuthModal from "../(portal-layout)/_components/auth-modal";
import { logout } from "../services/fake-auth";

/* ---------------- Context (unchanged) ---------------- */

type PortalNavbarContextProps = {
  navbarConfig: PortalNavbarConfigProps[];
  activeMenuKey: string;
  setActiveMenuKey: (key: string) => void;
};

const PortalNavbarContext = createContext<PortalNavbarContextProps | undefined>(undefined);

export function PortalNavbarProvider(props: { children: React.ReactNode }) {
  const t = useTranslations();

  const [navbarConfig] = useState<PortalNavbarConfigProps[]>(() =>
    portalNavbarConfig((key) => t(key))
  );
  const [activeMenuKey, setActiveMenuKey] = useState("");

  return (
    <PortalNavbarContext.Provider value={{ navbarConfig, activeMenuKey, setActiveMenuKey }}>
      {props.children}
    </PortalNavbarContext.Provider>
  );
}

export function usePortalNavbar() {
  const context = useContext(PortalNavbarContext);
  if (!context) throw new Error("usePortalNavbar must be used within PortalNavbarProvider");
  return { ...context };
}

/* ---------------- Navbar ---------------- */

export function PortalNavbar() {
  const windowBreakpoint = useWindowBreakpoint();
  const t = useTranslations();
  const locale = useLocale();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActiveLocale = (config: LocalConfigProps) => locale === config.key;

  const onLanguageChange = async (config: LocalConfigProps) => {
    const locale = config.key;
    await fetch("/api/set-locale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale }),
    });
    window.location.reload();
  };

  /* Countdown Timer */
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
        return;
      }

      setTimeLeft({
        days: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((distance / 1000) % 60)).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  const { isAuthenticated, logout, user } = useUserData();

  const [openAuth, setOpenAuth] = useState(false);

  return (
    <Navbar
      shouldHideOnScroll
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      classNames={{ base: "py-2 bg-[#112a4d]", menu: "mt-4 py-4" }}
      maxWidth="xl"
    >
      {/* ----------- Mobile Header ----------- */}


      <NavbarContent justify="center">
        <Link href="/">
          <Image removeWrapper src="/images/bg-icon.png" width={180} />
        </Link>
      </NavbarContent>
      <NavbarContent justify="end" className="xl:hidden">
        <NavbarMenuToggle className="text-white" />
      </NavbarContent>
      {/* ----------- Desktop Nav ----------- */}
      <NavbarContent className="hidden xl:flex w-full max-w-[1520px] mx-auto">
        {/* LEFT - Timer */}
        <div className="flex items-center gap-x-6">
          <span className="text-white font-medium max-w-[90px] text-left mx-20">
            {t("promotion_ends_in")}
          </span>

          <div className="flex items-center gap-3 text-white">
            {["days", "hours", "minutes", "seconds"].map((unit, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center">
                  <span className="text-3xl">
                    {timeLeft[unit as keyof typeof timeLeft]}
                  </span>
                  <span className="text-xs uppercase">{t(unit)}</span>
                </div>
                {i < 3 && <span className="text-3xl mx-2">:</span>}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="ml-auto flex items-center gap-4">
          {
            isAuthenticated ? (
              <span className="text-sm">{t("logged_in_message", {
                name: user?.firstName ?? "",
              })}</span>
            ) : (
              <Button className="bg-orange-500 text-white font-semibold" radius="full" onPress={() => setOpenAuth(true)}>
                {t("register_now")}
              </Button>

            )
          }


          {
            isAuthenticated ? (
              <Dropdown>
                <DropdownTrigger>
                  <LucideCircleUser size={34} className="text-white cursor-pointer" />
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="logout"
                    className="text-danger"
                    onPress={logout}
                  >
                    {t("logout")}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <Dropdown>
                <DropdownTrigger>
                  <LucideCircleUser size={34} className="text-white cursor-pointer" />
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    key="login"
                    onPress={() => setOpenAuth(true)}
                  >
                    {t("login")}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )
          }
          <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />



          {/* Language */}
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" radius="full">
                <LucideGlobe size={18} />
                <LucideChevronDown size={16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {localeConfigs.map((lc) => (
                <DropdownItem key={lc.key} onPress={() => onLanguageChange(lc)}>
                  <span className={textTv({ active: isActiveLocale(lc) })}>
                    {lc.label}
                  </span>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </NavbarContent>

      {/* ----------- Mobile Menu ----------- */}
      <NavbarMenu className="bg-[#112a4d] text-white space-y-4">
        {
          !isAuthenticated && (
            <NavbarMenuItem>
              <Button className="bg-orange-500 text-white w-full" radius="full" onPress={() => setOpenAuth(true)}>
                {t("register_now")}
              </Button>
            </NavbarMenuItem>
          )
        }


        {
          !isAuthenticated && (
            <NavbarMenuItem>
              <Button  radius="full" className="bg-sky-500 w-full text-white" onPress={() => setOpenAuth(true)}>
                {t("login")}
              </Button>
            </NavbarMenuItem>
          )
        }

          {
          isAuthenticated && (
            <NavbarMenuItem>
              <Button radius="full" className="w-full text-white" color="danger" onPress={() => logout()}>
                {t("logout")}
              </Button>
            </NavbarMenuItem>
          )
        }

        <NavbarMenuItem>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="bordered" className="w-full justify-between text-white">
                {t("language")}
                <LucideChevronDown size={16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              {localeConfigs.map((lc) => (
                <DropdownItem key={lc.key} onPress={() => onLanguageChange(lc)}>
                  {lc.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar >
  );
}
