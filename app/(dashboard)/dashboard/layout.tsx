import type { Metadata } from "next";
import { Providers } from "./providers";
import { Layout } from "@/components/layout/layout";

import "filepond/dist/filepond.min.css";
import "yet-another-react-lightbox/styles.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import "@/styles/dashboard.css";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Hesaby Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="ltr">
      <Providers>
        <Layout>{children}</Layout>
      </Providers>
    </div>
  );
}
