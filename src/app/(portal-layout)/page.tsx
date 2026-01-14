"use client";
import { Image } from "@heroui/image";
import { useTranslations } from "next-intl";
import { Button, Chip, Link } from "@heroui/react";


export default function Index() {
  const t = useTranslations();
  return (<div className="py-5 flex flex-col md:flex-row justify-center items-center gap-6 px-5">

    {/* ===== Left/Text Column ===== */}
    <div className="flex flex-col">

      <span className="text-4xl text-sky-400 font-semibold">
        {t("copy_trading")}
      </span>

      <span className="text-2xl text-white">
        {t("with_blackwell_invest")}
      </span>

      <div className="gap-x-4 flex flex-row py-2 justify-start">
        <Link href="https://play.google.com/store/apps/details?id=com.BlackwellGlobalInvestmentsUKLimited.pelican&hl=en" isExternal>
          <Image src="/images/google-play.jpg" className="w-30" removeWrapper />
        </Link>
        <Link href="https://apps.apple.com/in/app/blackwell-invest/id1666036351" isExternal>
          <Image src="/images/app-store.jpg" className="w-30" />
        </Link>
        <Image src="/images/regular.png" className="w-30 object-fill" />
      </div>

      <div className="hidden md:flex flex-col">
        <span className="text-2xl text-sky-400 font-semibold">
          {t("choose_&_trade")}
        </span>
        <span className="text-2xl text-yellow-300 font-semibold">
          {t("ready_to_go_strategies")}
        </span>
        <span>{t("ready_to_go_message")}</span>

        <div className="flex flex-row gap-x-2 py-2">
          <Chip variant="bordered" radius="sm" className="text-white">{t("forex")}</Chip>
          <Chip color="warning" variant="bordered" radius="sm" className="text-white">{t("precious_metals")}</Chip>
          <Chip color="danger" variant="bordered" radius="sm" className="text-white">{t("oil")}</Chip>
          <Chip color="primary" variant="bordered" radius="sm" className="text-white">{t("indices")}</Chip>
        </div>

        <Button
          variant="solid"
          className="bg-orange-500 text-white font-semibold w-30 my-2"
          radius="full"
        >
          {t("register_now")}
        </Button>

        <span className="italic">{t("invest_hint_message")}</span>
      </div>
    </div>

    {/* ===== Hand Image ===== */}
    <Image
      src="/images/hand.png"
      className="w-full max-w-[500px] h-auto object-cover"
      alt="Hand"
    />

    {/* ===== Mobile-only Choose & Trade ===== */}
    <div className="flex flex-col md:hidden">
      <span className="text-2xl text-sky-400 font-semibold">
        {t("choose_&_trade")}
      </span>
      <span className="text-2xl text-yellow-300 font-semibold">
        {t("ready_to_go_strategies")}
      </span>
      <span>{t("ready_to_go_message")}</span>

      <div className="flex flex-row gap-x-2 py-2">
        <Chip variant="bordered" radius="sm" className="text-white">{t("forex")}</Chip>
        <Chip color="warning" variant="bordered" radius="sm" className="text-white">{t("precious_metals")}</Chip>
        <Chip color="danger" variant="bordered" radius="sm" className="text-white">{t("oil")}</Chip>
        <Chip color="primary" variant="bordered" radius="sm" className="text-white">{t("indices")}</Chip>
      </div>

      <Button
        variant="solid"
        className="bg-orange-500 text-white font-semibold w-30 my-2"
        radius="full"
      >
        {t("register_now")}
      </Button>

      <span className="italic">{t("invest_hint_message")}</span>
    </div>

  </div>
  );


}
