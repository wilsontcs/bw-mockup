export const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE!;



export type LocalConfigProps = {
  key: string;
  label: string;
  fontVariable: string;
  heroUiLocale: string;
  httpHeaderLocale: string;
};

export const localeConfigs: LocalConfigProps[] = [
  {
    key: "en",
    label: "English",
    fontVariable: "--font-mono",
    heroUiLocale: "en-GB",
    httpHeaderLocale: "en-US",
  },
  {
    key: "zh-Hans",
    label: "简体中文",
    fontVariable: "--font-sans",
    heroUiLocale: "zh-CN",
    httpHeaderLocale: "zh-Hans",
  },
  {
    key: "zh-Hant",
    label: "繁體中文",
    fontVariable: "--font-sans",
    heroUiLocale: "zh-TW",
    httpHeaderLocale: "zh-Hant",
  },
];
