// "use client";

// import React from 'react'
import HeroSection from "./sections/HeroSection";
import MaskSection from "./sections/MaskSection";
import GlobeSection from "./sections/GlobeSection";
// import FrontNav from "@/components/front-navbar/FrontNav";
import Footer from "@/components/footer/footer";
// import useIsUserLoggedClient from "@/hooks/useIsUserLoggedClient";
// import { signIn, signOut, useSession } from "next-auth/react";

function page() {
  // const auth = useIsUserLoggedC/lient();
  // console.log(`front PAge==>`,auth);
  return (
    <div>
      {/* <FrontNav /> */}
      <HeroSection />
      <GlobeSection className="sm:mb-40" />
      <MaskSection />
      <Footer />
    </div>
  );
}

export default page;
