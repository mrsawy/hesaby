import HeroSection from "./sections/HeroSection";
import MaskSection from "./sections/MaskSection";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { FAQ } from "@/components/FAQ";
import Featured from "./sections/featured";
import prisma from "@/prisma/db";
import getImageUrl from "@/lib/backend/getImageUrl";
import { VortexSection } from "./sections/VortexSection";
import SliderAdSection from "./sections/SliderAdSection";
import HowItWorks from "./sections/HowItWorks";
import { About } from "../about-us/_components/about";

async function page() {
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <HeroSection />
      <HowItWorks />
      <About />
      <hr className="mx-2 lg:mx-40 shadow-lg border-gray-500 dark:border-gray-600" />
      {/* @ts-expect-error Server Component */}
      <Featured />
      <hr className="mx-2 lg:mx-40 shadow-lg border-gray-500 dark:border-gray-600" />
      <FAQ />
    </div>
  );
}

export default page;
