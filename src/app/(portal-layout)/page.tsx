"use client";
import { Image } from "@heroui/image";
import { useTranslations } from "next-intl";
import { Accordion, AccordionItem, Button, Card, CardBody, Chip, Input, Link, Select, SelectItem, Tab, Tabs, Textarea } from "@heroui/react";
import { useState } from "react";
import { ArrowDownUp, Disc, icons, Search, User, Zap } from "lucide-react";
import { useUserData } from "../_context/user-data-context";
import AuthModal from "./_components/auth-modal";
type LinkAccountBoxProps = {
  message: string;
  imagePath: string;
  prevPressed: () => void;
  nextPressed: () => void;
  index: number;
};

type WhyChooseUsBoxProps = {
  message: string;
  title: string;
  imagePath: string;

};

const GooglePlayButton = () => {
  return (
    <>
      <Link href="https://play.google.com/store/apps/details?id=com.BlackwellGlobalInvestmentsUKLimited.pelican&hl=en" isExternal>
        <Image src="/images/google-play.jpg" className="w-30" removeWrapper />
      </Link>
    </>);
};

const AppleAppleStoreButton = () => {
  return (<>

    <Link href="https://apps.apple.com/in/app/blackwell-invest/id1666036351" isExternal>
      <Image src="/images/app-store.jpg" className="w-30" />
    </Link>
  </>);
}

export default function Index() {
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <div className="py-5 overflow-x-hidden relative">
      {/* ===== Original Page Content ===== */}
      <div className="hidden md:block">
        <HeaderDesktop onRegister={() => setOpenAuth(true)} />
      </div>

      <div className="block md:hidden">
        <HeaderMobile onRegister={() => setOpenAuth(true)} />
      </div>

      <FastMatchingPannel />
      <EasyAnalysisPannel />
      <Image src="/images/bg-1.png" className="w-full pt-20 object-fill" removeWrapper />
      <TradeLikePro />
      <LinkAccount onRegister={() => setOpenAuth(true)} />
      <Image src="/images/bg-2.png" className="w-full pt-20 object-fill" removeWrapper />
      <WhyChooseUs onRegister={() => setOpenAuth(true)} />
      <NavigateApp />
      <EnquireNowForm />

      {/* ===== Auth Modal ===== */}
      <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />
    </div>
  );
}

const HeaderDesktop = ({ onRegister }: { onRegister: () => void }) => {
  const t = useTranslations();
  const { isAuthenticated } = useUserData();

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-6 px-5">

      <Image
        src="/images/hand.png"
        className="w-full max-w-[900px] h-auto object-cover"
        alt="Hand"
      />
      {/* ===== Left/Text Column ===== */}
      <div className="flex flex-col">

        <span className="text-4xl text-[#01f2f2] font-semibold">
          {t("copy_trading")}
        </span>

        <span className="text-2xl text-white">
          {t("with_blackwell_invest")}
        </span>

        <div className="gap-x-4 flex flex-row py-2 justify-start">
          <GooglePlayButton></GooglePlayButton>
          <AppleAppleStoreButton></AppleAppleStoreButton>
          <Image src="/images/regular.png" className="w-30 object-fill" />
        </div>

        <div className="hidden md:flex flex-col">
          <span className="text-2xl text-[#01f2f2] font-semibold">
            {t("choose_&_trade")}
          </span>
          <span className="text-2xl text-[#f2df79] font-semibold">
            {t("ready_to_go_strategies")}
          </span>
          <span className="max-w-[700px]">{t("ready_to_go_message")}</span>

          <div className="flex flex-row gap-x-2 py-2 items-center">
            <Chip variant="bordered" radius="sm" className="text-white">{t("forex")}</Chip>
            <Chip color="warning" variant="bordered" radius="sm" className="text-white">{t("precious_metals")}</Chip>
            <Chip color="danger" variant="bordered" radius="sm" className="text-white">{t("oil")}</Chip>
            <Chip color="primary" variant="bordered" radius="sm" className="text-white">{t("indices")}</Chip>
          </div>

          {!isAuthenticated && (
            <Button
              variant="solid"
              className="bg-[#F37406] text-white font-semibold w-30 my-2"
              radius="full"
              onPress={onRegister}
            >
              {t("register_now")}
            </Button>
          )}

          <span className="italic">{t("invest_hint_message")}</span>
        </div>
      </div>



      {/* ===== Mobile-only Choose & Trade ===== */}
      <div className="flex flex-col md:hidden">
        <span className="text-2xl text-[#01f2f2] font-semibold">
          {t("choose_&_trade")}
        </span>
        <span className="text-2xl text-[#f2df79] font-semibold">
          {t("ready_to_go_strategies")}
        </span>
        <span>{t("ready_to_go_message")}</span>

        <div className="flex flex-row gap-x-2 py-2">
          <Chip variant="bordered" radius="sm" className="text-white">{t("forex")}</Chip>
          <Chip color="warning" variant="bordered" radius="sm" className="text-white">{t("precious_metals")}</Chip>
          <Chip color="danger" variant="bordered" radius="sm" className="text-white">{t("oil")}</Chip>
          <Chip color="primary" variant="bordered" radius="sm" className="text-white">{t("indices")}</Chip>
        </div>

        {!isAuthenticated && (
          <Button
            variant="solid"
            className="bg-[#F37406] text-white font-semibold w-30 my-2"
            radius="full"
            onPress={onRegister}
          >
            {t("register_now")}
          </Button>
        )}

        <span className="italic">{t("invest_hint_message")}</span>
      </div>
    </div>
  );
}
const HeaderMobile = ({ onRegister }: { onRegister: () => void }) => {
  const t = useTranslations();
  const { isAuthenticated } = useUserData();

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 px-5">

      {/* ===== Left/Text Column ===== */}
      <div className="flex flex-col">

        <span className="text-4xl text-[#01f2f2] font-semibold">
          {t("copy_trading")}
        </span>

        <span className="text-2xl text-white">
          {t("with_blackwell_invest")}
        </span>

        <div className="gap-x-4 flex flex-row py-2 justify-start">
          <GooglePlayButton></GooglePlayButton>
          <AppleAppleStoreButton></AppleAppleStoreButton>
          <Image src="/images/regular.png" className="w-30 object-fill" />
        </div>

        <div className="hidden md:flex flex-col">
          <span className="text-2xl text-[#01f2f2] font-semibold">
            {t("choose_&_trade")}
          </span>
          <span className="text-2xl text-[#f2df79] font-semibold">
            {t("ready_to_go_strategies")}
          </span>
          <span>{t("ready_to_go_message")}</span>

          <div className="flex flex-row gap-x-2 py-2 items-center">
            <Chip variant="bordered" radius="sm" className="text-white">{t("forex")}</Chip>
            <Chip color="warning" variant="bordered" radius="sm" className="text-white">{t("precious_metals")}</Chip>
            <Chip color="danger" variant="bordered" radius="sm" className="text-white">{t("oil")}</Chip>
            <Chip color="primary" variant="bordered" radius="sm" className="text-white">{t("indices")}</Chip>
          </div>

          {!isAuthenticated && (
            <Button
              variant="solid"
              className="bg-[#F37406] text-white font-semibold w-30 my-2"
              radius="full"
              onPress={onRegister}
            >
              {t("register_now")}
            </Button>
          )}

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
        <span className="text-2xl text-[#01f2f2] font-semibold">
          {t("choose_&_trade")}
        </span>
        <span className="text-2xl text-[#f2df79] font-semibold">
          {t("ready_to_go_strategies")}
        </span>
        <span>{t("ready_to_go_message")}</span>

        <div className="flex flex-row gap-x-2 py-2 ">
          <Chip variant="bordered" radius="sm" className="text-white">{t("forex")}</Chip>
          <Chip color="warning" variant="bordered" radius="sm" className="text-white">{t("precious_metals")}</Chip>
          <Chip color="danger" variant="bordered" radius="sm" className="text-white">{t("oil")}</Chip>
          <Chip color="primary" variant="bordered" radius="sm" className="text-white">{t("indices")}</Chip>
        </div>

        {!isAuthenticated && (
          <Button
            variant="solid"
            className="bg-[#F37406] text-white font-semibold w-30 my-2"
            radius="full"
          >
            {t("register_now")}
          </Button>
        )}
        <span className="italic">{t("invest_hint_message")}</span>
      </div>
    </div>
  );
}
const FastMatchingPannel = () => {
  const t = useTranslations();

  return (
    <div className="pt-10 text-center px-5">
      <span className="text-[#01f2f2] text-2xl font-semibold">
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
      <span className="text-[#01f2f2] text-2xl font-semibold">
        {t("easy_analysis")}
      </span>
      <span className="pt-2 pb-5 text-[#f2df79]">{t("easy_analysis_message")}</span>
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
      <span className="text-[#01f2f2] text-2xl font-semibold">
        {t("trade_like_a_pro_in_minute")}
      </span>
      <div className="max-w-md mx-auto py-5">
        <Accordion
          selectionMode="single"
          variant="splitted"
          defaultExpandedKeys={["1"]}
          hideIndicator={true}
          className="bg-transparent"
        >

          <AccordionItem startContent={
            <span className="text-[#f2df79] text-2xl "> 1</span>
          } key="1" title={t("trade_like_pro_step_1")}

            className="border-2 border-[#f2df79] rounded-xl mb-3 bg-transparent text-white"
          >

            <div className="flex justify-center">
              <Image src="/images/guide-1.png" className="h-60" removeWrapper />
            </div>

          </AccordionItem>

          <AccordionItem startContent={
            <span className="text-[#F37406] text-2xl"> 2</span>
          } key="2" title={t("trade_like_pro_step_2")}
            className="border-2 border-[#F37406] rounded-xl mb-3 bg-transparent text-white"

          >
            <div className="flex justify-center">
              <Image src="/images/guide-2.png" className="h-60" removeWrapper />
            </div>          </AccordionItem>

          <AccordionItem startContent={
            <span className="text-[#f2df79]  text-2xl"> 3</span>
          } key="3" title="Step 3 — Deposit Funds"
            className="border-2 border-[#f2df79] rounded-xl mb-3 bg-transparent text-white"

          >
            <div className="flex justify-center">
              <Image src="/images/guide-3.png" className="h-60" removeWrapper />
            </div>          </AccordionItem>

          <AccordionItem startContent={
            <span className="text-[#F37406] text-2xl"> 4</span>
          } key="4" title="Step 4 — Start Trading" className="border-2 border-[#F37406] rounded-xl mb-3 bg-transparent text-white"
          >
            <div className="flex justify-center">
              <Image src="/images/guide-4.png" className="h-60" removeWrapper />
            </div>          </AccordionItem>
        </Accordion>
      </div>

      <div className="gap-x-4 flex flex-row py-2 justify-start">
        <GooglePlayButton />
        <AppleAppleStoreButton />
      </div>

    </div>
  );
};

const LinkAccountBox = ({
  message,
  imagePath,
  prevPressed,
  nextPressed,
  index
}: LinkAccountBoxProps) => {
  return (
    // ⬇️ Add relative here
    <div className="relative border-2 border-[#F37406] rounded-xl mb-3 bg-transparent text-white w-[320px] md:w-full max-h-[300]">

      {/* Left Arrow */}
      <button
        onClick={prevPressed}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10"
      >
        <Image
          src="/images/arrow.png"
          alt="Previous"
          width={40}
          height={40}
          className="rotate-180"
        />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextPressed}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10"
      >
        <Image
          src="/images/arrow.png"
          alt="Next"
          width={40}
          height={40}
        />
      </button>

      {/* Content */}
      <div className="flex flex-col items-center justify-center px-10 py-4">
        <Image
          src={imagePath}
          removeWrapper
          alt="guide"
          className="object-contain h-40 sm:h-48 md:h-56"
        />

        <span className="px-4 py-2 text-center text-sm sm:text-base">
          {index + 1 + ")"} {message}
        </span>
      </div>
    </div>
  );
};

const LinkAccount = ({ onRegister }: { onRegister: () => void }) => {
  const t = useTranslations();
  const steps = [
    { message: t("trade_like_pro_step_1"), image: "/images/register-step-1.png" },
    { message: t("how_to_link_mt4_account_step2"), image: "/images/register-step-2.png" },
    { message: t("how_to_link_mt4_account_step3"), image: "/images/register-step-3.png" },
    { message: t("how_to_link_mt4_account_step4"), image: "/images/register-step-4.png" },
    { message: t("how_to_link_mt4_account_step5"), image: "/images/register-step-5.png" },
    { message: t("how_to_link_mt4_account_step6"), image: "/images/register-step-6.png" },
    { message: t("how_to_link_mt4_account_step7"), image: "/images/register-step-7.png" },
    { message: t("how_to_link_mt4_account_step8"), image: "/images/register-step-8.png" },
  ];
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % steps.length);
  const prev = () => setIndex((prev) => (prev - 1 + steps.length) % steps.length);
  const { isAuthenticated } = useUserData();

  return (
    <div className="pt-10 text-center flex flex-col items-center px-5">
      <span className="text-[#01f2f2] text-2xl font-semibold">
        {t("how_to_link_mt4_account")}
      </span>

      {/* Slider stays width-limited and centered */}
      <div className="pt-10 max-w-md mx-auto relative w-full">
        <div className="overflow-hidden md:overflow-visible items-center">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {steps.map((step, i) => (
              <div key={i} className="min-w-full px-2">
                <LinkAccountBox
                  message={step.message}
                  imagePath={step.image}
                  prevPressed={prev}
                  nextPressed={next}
                  index={i}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isAuthenticated && (
        <div className="flex justify-center mt-4">
          <Button
            variant="solid"
            className="bg-[#F37406] text-white font-semibold w-30"
            radius="full"
            onPress={onRegister}
          >
            {t("register_now")}
          </Button>
        </div>
      )}
    </div>

  );
};

const WhyChooseUsBox = ({
  message,
  title,
  imagePath,
}: WhyChooseUsBoxProps) => {
  return (
    <Card className="bg-white w-full">
      <CardBody>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">

          {/* Top row: Icon + Title */}
          <div className="flex items-center gap-x-4">
            <Image
              src={imagePath}
              className="w-14 h-14 flex-shrink-0"
              removeWrapper
            />
            <span className="text-[#040dbf] font-semibold whitespace-nowrap">
              {title}
            </span>
          </div>

          {/* Message */}
          <span className="text-black sm:flex-1 text-left">
            {message}
          </span>

        </div>
      </CardBody>
    </Card>
  );
};



const WhyChooseUs = ({ onRegister }: { onRegister: () => void }) => {
  const t = useTranslations();
  const { isAuthenticated } = useUserData();

  return (
    <div className="text-center flex flex-col items-center px-5 w-full">
      <span className="text-[#01f2f2] text-2xl font-semibold">
        {t("why_choose_us")}?
      </span>
      <div className="pt-5 max-w-4xl mx-auto w-full flex flex-col gap-y-3">
        <WhyChooseUsBox imagePath="/images/why-choose-us-1.png" title={t("regulated")} message={t("why_choose_us_message1")}></WhyChooseUsBox>
        <WhyChooseUsBox imagePath="/images/why-choose-us-2.png" title={"0 " + t("comission")} message={t("why_choose_us_message2")}></WhyChooseUsBox>
        <WhyChooseUsBox imagePath="/images/why-choose-us-3.png" title={t("user_friendly")} message={t("why_choose_us_message3")}></WhyChooseUsBox>
        <WhyChooseUsBox imagePath="/images/why-choose-us-4.png" title={t("tier_1_liquidity")} message={t("why_choose_us_message4")}></WhyChooseUsBox>
      </div>

      {!isAuthenticated && (
        <Button
          variant="solid"
          className="bg-[#F37406] text-white font-semibold w-30 my-5"
          radius="full"
          onPress={onRegister}
        >
          {t("register_now")}
        </Button>
      )}


    </div>
  );
};
const NavigateApp = () => {
  const t = useTranslations();
  const tabs = [
    {
      id: "discover",
      label: t("discover"),
      message: t("discover_message"),
      image: "/images/reason-1.png",
      icon: <Search></Search>
    },
    {
      id: "activity",
      label: t("activity"),
      message: t("activity_message"),
      image: "/images/reason-2.png",
      icon: <Zap></Zap>

    },
    {
      id: "trade",
      label: t("trade"),
      message: t("trade_message"),
      image: "/images/reason-3.png",
      icon: <ArrowDownUp></ArrowDownUp>

    },
    {
      id: "positions",
      label: t("positions"),
      message: t("positions_message"),
      image: "/images/reason-4.png",
      icon: <Disc></Disc>

    },
    {
      id: "account",
      label: t("account"),
      message: t("account_message"),
      image: "/images/reason-5.png",
      icon: <User></User>

    },
  ];
  return (
    <div className="pt-10 text-center flex flex-col items-center px-5">
      <span className="text-[#01f2f2] text-2xl font-semibold">
        {t("navigate_app_title")}?
      </span>

      <div className="flex flex-col pt-5 w-full items-center">
        <Tabs aria-label="Dynamic tabs" items={tabs} className="w-full "

          classNames={{
            tabList: "mx-auto bg-white p-1",
            tab: "px-4 py-2",
            cursor: "hidden",
            tabContent: `
    text-[#F37406]
    group-data-[selected=true]:text-[#040dbf]
  `
          }}
        >
          {(item) => (
            <Tab key={item.id} title={
              <div className="flex items-center space-x-2 h-full ">
                {item.icon}
              </div>
            }>
              <Card className="bg-[#ffdf6b] max-w-4xl mx-auto w-full">
                <CardBody>
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">

                    {/* Text Section takes remaining space */}
                    <div className="flex flex-col text-left justify-between flex-1">
                      <span className="text-[#040dbf] font-semibold text-lg">
                        {item.label}
                      </span>
                      <span className="text-black mt-2">
                        {item.message}
                      </span>
                    </div>

                    {/* Image stays at right end */}
                    <Image
                      src={item.image}
                      className="h-48 w-96 object-contain flex-shrink-0"
                    />

                  </div>

                </CardBody>
              </Card>
            </Tab>
          )
          }
        </Tabs >
      </div >

      <div className="gap-x-4 flex flex-row py-2 justify-start">
        <GooglePlayButton />
        <AppleAppleStoreButton />
      </div>
    </div >

  );
};

const EnquireNowForm = () => {
  const t = useTranslations();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // 👉 Here you can later send API request

    // Show system dialog
    alert(t("submit_success")); // "Submit successful!"

    // Reset fields
    setName("");
    setEmail("");
    setMobile("");
    setCountry("");
    setMessage("");
  };

  return (

    <div className="my-10 relative overflow-hidden">
      <Image
        src="/images/bg-3.png"
        removeWrapper
        className="absolute inset-0 w-full h-full object-fill rounded-none"
      />

      <div className="pt-20 text-center flex flex-col items-center px-5 relative z-10 pb-10">
        <span className="text-[#01f2f2] text-2xl font-semibold">
          {t("enquire_now")}
        </span>

        <div className="flex flex-col gap-3 w-full max-w-md mt-5">

          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Input
              label={t("name")}
              variant="bordered"
              className="flex-1"
              value={name}
              onValueChange={setName}
            />
            <Input
              label={t("email")}
              type="email"
              variant="bordered"
              className="flex-1"
              value={email}
              onValueChange={setEmail}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Input
              label={t("mobile_no")}
              variant="bordered"
              className="flex-1"
              value={mobile}
              onValueChange={setMobile}
            />

            <Select
              label={t("country_of_residence")}
              variant="bordered"
              className="flex-1"
              selectedKeys={country ? [country] : []}
              onSelectionChange={(keys) => setCountry([...keys][0] as string)}
            >
              <SelectItem key="MY">Malaysia</SelectItem>
              <SelectItem key="SG">Singapore</SelectItem>
            </Select>
          </div>

          <Textarea
            placeholder={t("enter_your_message_here")}
            variant="bordered"
            className="w-full"
            value={message}
            onValueChange={setMessage}
          />
        </div>

        <Button
          variant="solid"
          className="bg-[#F37406] text-white font-semibold w-30 my-5"
          radius="full"
          onPress={handleSubmit}
        >
          {t("submit")}
        </Button>
      </div>
    </div>
  );
};
