import React from "react";
import { About } from "./_components/about";
import { Services } from "./_components/services";
import { FAQ } from "@/components/FAQ";

function PageAbout() {
  return (
    <div className="container">
      <About />
      <Services />
      <FAQ />
    </div>
  );
}

export default PageAbout;
