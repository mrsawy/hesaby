import "@/styles/globals.css";
import "sweetalert2/src/sweetalert2.scss";

import type { Metadata } from "next";
// import { Providers } from "./providers";
import { fontSans } from "@/config/fonts";
import FrontNav from "@/components/front-navbar/FrontNav";

import clsx from "clsx";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Hesaby",
  description: "Hesaby Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx("font-sans antialiased", fontSans.className)}>
        <FrontNav />

        {children}
      </body>
    </html>
  );
}
