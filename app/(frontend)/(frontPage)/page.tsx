import HeroSection from "./sections/HeroSection";
import MaskSection from "./sections/MaskSection";
import Footer from "@/components/footer/footer";
import Featured from "./sections/featured";
import prisma from "@/prisma/db";
import getImageUrl from "@/lib/backend/getImageUrl";
import { VortexSection } from "./sections/VortexSection";
import SliderAdSection from "./sections/SliderAdSection";

async function page() {
  return (
    <div>
      {/* <HeroSection /> */}
      <VortexSection />
      {/* <hr className="mx-2 lg:mx-40 shadow-lg border-gray-500 dark:border-gray-600" /> */}

      <SliderAdSection />

      <hr className="mx-2 lg:mx-40 shadow-lg border-gray-500 dark:border-gray-600" />
      {/* @ts-expect-error Server Component */}
      <Featured />
      {/* <Featured
        data={gameData}
        enableDecs={false}
        label={`Featured Games`}
        btnTxt={`SEE MORE`}
        btnTextPrice={false}
        btnUrlPrefix={`/games/`}
      />
      <hr className="mx-2 lg:mx-40 shadow-lg border-gray-500 dark:border-gray-600" />
      <Featured
        data={accountData}
        label={`Featured Accounts`}
        enableDecs={true}
        btnTextPrice={true}
        btnUrlPrefix={`/accounts/`}
      /> */}
      <MaskSection />
      <Footer />
    </div>
  );
}

export default page;
