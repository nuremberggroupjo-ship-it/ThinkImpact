
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppName, AppDescription, AppURL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import {NextIntlClientProvider} from 'next-intl';
const inter = Inter({ subsets: ["latin"] });

import NextAuthProviders from "../providers/NextAuthProviders";

export const metadata: Metadata = {
  title: { template: `%s | ${AppName}`, default: AppName },
  description: `${AppDescription}`,
  metadataBase: new URL(AppURL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}  antialiased`}>
        <NextAuthProviders>
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          </NextIntlClientProvider>
        </NextAuthProviders>
      </body>
    </html>
  );
}
