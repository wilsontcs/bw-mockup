import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ContextProviders } from "./_components/context-providers";
import { WindowBreakpointProvider } from "./_context/window-breakpoint-context";
import { ClientLayout } from "./_components/client-layout";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlackWell Invest",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();

  return (
    <html
      lang={locale} suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >     <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
      >
          <NextIntlClientProvider messages={messages}>
            <ContextProviders>
              <WindowBreakpointProvider>
                <ClientLayout>
                  {children}
                </ClientLayout>
              </WindowBreakpointProvider>
            </ContextProviders>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
