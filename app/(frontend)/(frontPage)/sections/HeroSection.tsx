import { Carousel } from "flowbite-react";
import Image from "next/image";

import sliderContent from "@/constants/slidersContent";
import SliderButton from "@/components/slider/SliderButton";

import classes from "./styles.module.css";
import { cn } from "@/lib/utils";

export async function Component() {
  return (
    <div className=" h-72  sm:h-[80vh] 2xl:h-[90vh] " dir="ltr">
      <Carousel
        // pauseOnHover
        // onSlideChange={(index) => {
        //   console.log("onSlideChange()", index);
        //   document.querySelector(`.identifier-anim-1`)?.classList.remove(`animate-appear-1s`);
        //   document.querySelector(`.identifier-anim-1`)?.classList.add(`animate-appear-1s`);
        // }}
        slideInterval={2500}
        // slide={false}
        slide={true}
        
        className={cn(classes[`carouselContainer`])}
      >
        {sliderContent.map(({ background, titleAsImage, price, url, id }) => (
          <div
            key={id}
            data-src={background}
            style={{
              background: `url(${background})`,
              backgroundSize: `cover`,
              backgroundPosition: `center`,
              backgroundRepeat: `no-repeat`,
            }}
            className="w-full md:ps-32 md:pe-32  text-end flex justify-end  pt-12 md:pt-0 h-full  pe-16 sm:pe-0"
          >
            <div className=" text-center m-1 w-1/3 flex flex-col gap-2 md:gap-4 justify-center items-center my-auto  sm:h-1/2  ">
              <Image
                width={500}
                height={500}
                className={cn(
                  "w-32 sm:w-full   relative identifier-anim-1 ",
                  classes[`animate-appear-1s`]
                )}
                src={titleAsImage ? titleAsImage : ``}
                alt="game banner"
              />
              <div className={cn("w-full mx-auto my-4", classes[`animate-appear-2s`])}>
                <SliderButton price={price} url={url} />
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Component;

// div[data-active="true"] .absolute .animate-appear-1s {
//   animation: appear 1s ease-in-out;
// }

// div[data-active="true"] .absolute .animate-appear-2s {
//   animation: appear 1.5s ease-in-out;
// }
