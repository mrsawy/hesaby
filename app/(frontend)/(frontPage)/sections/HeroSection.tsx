"use client";

import AwesomeSlider from "react-awesome-slider";
// /
// import AwesomeSliderStyles from 'react-awesome-slider/src/styled/fall-animation.scss';
// import AnimationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';

//
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import "react-awesome-slider/dist/custom-animations/fall-animation.css";
import "react-awesome-slider/dist/custom-animations/open-animation.css";

//
import sliderContent from "@/constants/slidersContent";
import SliderButton from "@/components/slider/SliderButton";

import Image from "next/image";

const SliderSection = () => {
  return (
    <AwesomeSlider
      // startupDelay?: number;
      startupDelay={3000}
      // play={true}
      // cancelOnInteraction={false}
      // interval={6000}
      animation="fallAnimation"
      // animation="openAnimation"
      className="2xl:h-[96vh]"
    >
      {sliderContent.map(({ background, titleAsImage, price, url, id }) => (
        <div
          key={id}
          data-src={background}
          className="w-full md:ps-32 md:pe-32  text-end flex justify-end  pt-24 md:pt-0"
        >
          <div className=" text-center m-1 w-1/3 flex flex-col gap-4 justify-center items-center  ">
            <Image
              width={500}
              height={500}
              className="w-32 lg:w-full   relative z-50 "
              src={titleAsImage ? titleAsImage : ``}
              alt="game banner"
            />
            <div className=" w-32 lg:w-full   pl-16 pr-16 m-auto ">
              <SliderButton price={price} url={url} />
            </div>
          </div>
        </div>
      ))}
    </AwesomeSlider>
  );
};

export default SliderSection;
