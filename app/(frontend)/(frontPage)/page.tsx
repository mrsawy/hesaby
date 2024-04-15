// import React from 'react'
import HeroSection from "./sections/HeroSection";
import MaskSection from "./sections/MaskSection";
import GlobeSection from "./sections/GlobeSection";
// import FrontNav from "@/components/front-navbar/FrontNav";
import Footer from "@/components/footer/footer";

function page() {
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
