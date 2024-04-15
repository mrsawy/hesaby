import type { Metadata } from "next";
import { Providers } from "./providers";
import { Layout } from "@/components/layout/layout";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Hesaby Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Layout>{children}</Layout>
    </Providers>
  );
}
