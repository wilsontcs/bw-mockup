"use client";
import { Image } from "@heroui/image";
import { useTranslations } from "next-intl";
import { Accordion, AccordionItem, Button, Chip, Link } from "@heroui/react";


export default function Index() {
  const t = useTranslations();
  return (
    <div className="py-5">
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-5">

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
      <FastMatchingPannel></FastMatchingPannel>
      <EasyAnalysisPannel></EasyAnalysisPannel>
      <Image
        src="/images/bg-1.png"
        className="w-full pt-20"
        removeWrapper
      />
      <TradeLikePro></TradeLikePro>
    </div>
  );

}
const FastMatchingPannel = () => {
  const t = useTranslations();

  return (
    <div className="pt-10 text-center px-5">
      <span className="text-sky-400 text-2xl font-semibold">
        {t("fast_matching")}
      </span>

      <div className="flex flex-row py-10 items-center justify-center gap-8">

        {/* Left Image */}
        <video
          src="/videos/fast-matching.mov"
          className="w-40"
          autoPlay
          loop
          muted
          playsInline
        />


        {/* Right List */}
        <ul className="flex flex-col gap-3">
          <li className="flex items-center gap-3">
            <Image src="/images/list-icon.png" className="w-25 h-5" removeWrapper />
            <span>{t("spot_light")}</span>
          </li>
          <li className="flex items-center gap-3">
            <Image src="/images/list-icon.png" className="w-25 h-5" removeWrapper />
            <span>{t("top_strategies")}</span>
          </li>
          <li className="flex items-center gap-3">
            <Image src="/images/list-icon.png" className="w-25 h-5" removeWrapper />
            <span>{t("low_drawdown")}</span>
          </li>
          <li className="flex items-center gap-3">
            <Image src="/images/list-icon.png" className="w-25 h-5" removeWrapper />
            <span>{t("medium_drawdown")}</span>
          </li>
          <li className="flex items-center gap-3">
            <Image src="/images/list-icon.png" className="w-25 h-5" removeWrapper />
            <span>{t("high_drawdown")}</span>
          </li>
          <li className="flex items-center gap-3">
            <Image src="/images/list-icon.png" className="w-25 h-5" removeWrapper />
            <span>{t("new_strategies")}</span>
          </li>
        </ul>

      </div>
    </div>
  );
};

const EasyAnalysisPannel = () => {
  const t = useTranslations();

  return (
    <div className="pt-10 text-center flex flex-col items-center px-5">
      <span className="text-sky-400 text-2xl font-semibold">
        {t("easy_analysis")}
      </span>
      <span className="pt-2 pb-5 text-yellow-300">{t("easy_analysis_message")}</span>
      <div className="relative w-30 h-60">

        {/* Back image */}
        <Image
          src="/images/easy-analysis.png"
          className="w-30 h-65"
          removeWrapper
        />

        {/* Front overlay image */}
        <Image
          src="/images/easy-analysis-1.png"
          className="w-40 h-15 absolute top-[-15] left-[-50]"
          removeWrapper
        />
        <Image
          src="/images/easy-analysis-2.png"
          className="w-40 h-15 absolute top-[35] right-[-50]"
          removeWrapper
        />
        <Image
          src="/images/easy-analysis-3.png"
          className="w-40 h-15 absolute top-[75] left-[-50]"
          removeWrapper
        />
        <Image
          src="/images/easy-analysis-4.png"
          className="w-40 h-15 absolute top-[120] right-[-50]"
          removeWrapper
        />
        <Image
          src="/images/easy-analysis-5.png"
          className="w-40 h-15 absolute top-[170] left-[-50]"
          removeWrapper
        />
      </div>



    </div>
  );
};

const TradeLikePro = () => {
  const t = useTranslations();

  return (
    <div className=" text-center flex flex-col items-center px-5">
      <span className="text-sky-400 text-2xl font-semibold">
        {t("trade_like_a_pro_in_minute")}
      </span>
      <div className="max-w-md mx-auto">
        <Accordion
          selectionMode="single"
          variant="splitted"
          defaultExpandedKeys={["1"]}
          hideIndicator={true}
          className="bg-transparent"
        >

          <AccordionItem startContent={
            <span className="text-yellow-300 text-2xl "> 1</span>
          } key="1" title={t("trade_like_pro_step_1")}

            className="border-2 border-yellow-300 rounded-lg mb-3 bg-transparent text-white"
          >

            <div className="flex justify-center">
              <Image src="/images/guide-1.png" className="h-60" removeWrapper />
            </div>

          </AccordionItem>

          <AccordionItem startContent={
            <span className="text-orange-500 text-2xl"> 2</span>
          } key="2" title={t("trade_like_pro_step_2")}
            className="border-2 border-orange-500 rounded-lg mb-3 bg-transparent text-white"

          >
            <div className="flex justify-center">
              <Image src="/images/guide-2.png" className="h-60" removeWrapper />
            </div>          </AccordionItem>

          <AccordionItem startContent={
            <span className="text-yellow-300  text-2xl"> 3</span>
          } key="3" title="Step 3 — Deposit Funds"
            className="border-2 border-yellow-300 rounded-lg mb-3 bg-transparent text-white"

          >
            <div className="flex justify-center">
              <Image src="/images/guide-3.png" className="h-60" removeWrapper />
            </div>          </AccordionItem>

          <AccordionItem startContent={
            <span className="text-orange-500 text-2xl"> 4</span>
          } key="4" title="Step 4 — Start Trading" className="border-2 border-orange-500 rounded-lg mb-3 bg-transparent text-white"
          >
            <div className="flex justify-center">
              <Image src="/images/guide-4.png" className="h-60" removeWrapper />
            </div>          </AccordionItem>
        </Accordion>
      </div>

      <div className="gap-x-4 flex flex-row py-2 justify-start">
        <Link href="https://play.google.com/store/apps/details?id=com.BlackwellGlobalInvestmentsUKLimited.pelican&hl=en" isExternal>
          <Image src="/images/google-play.jpg" className="w-30" removeWrapper />
        </Link>
        <Link href="https://apps.apple.com/in/app/blackwell-invest/id1666036351" isExternal>
          <Image src="/images/app-store.jpg" className="w-30" />
        </Link>
      </div>

    </div>
  );
};
