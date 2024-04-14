import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";
// import clsx from "clsx";
import { Providers } from "./providers";
// import { fontSans } from "@/config/fonts";
import { Layout } from "@/components/layout/layout";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Hesaby Dashboard",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Layout>{children}</Layout>
    </Providers>
  );
}
