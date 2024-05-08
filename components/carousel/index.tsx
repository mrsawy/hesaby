// "use client"

import * as React from "react";
import Card1 from "@/components/cards/nextui-card";
import Carde3d from "@/components/cards/3d-card";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

// import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import classes from "@/components/cards/styles.module.css";
// "./styles.module.css"
import { cn } from "@/lib/utils";

export default function CarouselSize({
  data,
  label,
  enableDecs,
  btnTxt,
  btnTextPrice,
  btnUrlPrefix,
  cardClassName,
  carouselItemClassName,
}: {
  data?: any[];
  btnTxt?: string | React.ReactNode;
  btnTextPrice: boolean;
  label?: string;
  enableDecs: boolean;
  btnUrlPrefix: string;
  cardClassName?: string;
  carouselItemClassName?: string;
}) {
  // console.log(`enableDecs CarouselSize index`, enableDecs);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full lg:my-24"
    >
      {label && (
        <label className="text-center  font-bold lg:text-[3rem] py-8 flex justify-start">
          {label}
        </label>
      )}

      <CarouselContent className="gap-0 lg:gap-0 xl:gap-1 justify-start   ">
        {data.map((_, index) => (
          <CarouselItem
            key={index}
            className={cn(
              "basis-1/2 md:basis-1/3 xl:basis-1/3 2xl:basis-1/4 ",
              `   sm:w-auto`,
              carouselItemClassName
              // ` xl:my-8 xxl:mx-12`
            )}
          >
            <div className="p-1">
              <Card1
                title={data[index].title}
                img={data[index].imgUrl}
                id={data[index].id}
                className={cn(
                  " h-[12rem] sm:h-[15rem]  lg:h-[17rem] min-[1100px]:h-[20rem]  2xl:h-[25rem]  m-auto sm:mx-6",
                  cardClassName
                )}
                desc={enableDecs ? data[index].description : undefined}
                // enableDecs={enableDecs}
                btnUrl={
                  btnUrlPrefix.includes(`game`)
                    ? `${btnUrlPrefix}${data[index].id}?gameName=${data[index].title}`
                    : `${btnUrlPrefix}${data[index].id}`
                }
                btnTxt={
                  btnTextPrice ? (
                    <div className="flex gap-1 sm:gap-3 flex-row flex-nowrap justify-center items-center">
                      <div className="flex gap-[2px] sm:gap-1 md:gap-2 lg:text-xl">
                        <p>{data[index].price}</p>
                        <span>SR</span>
                      </div>
                      <ShoppingCartCheckoutIcon className="text-xs sm:text-md lg:text-lg" />
                    </div>
                  ) : btnTxt ? (
                    btnTxt
                  ) : (
                    `Details`
                  )
                }
              />
            </div>

            {/* // <div className="text-xs sm:text-md lg:text-lg flex-row flex justify-center items-center "> */}
            {/* </div> */}
            {/* lg:w-[20rem] xl:w-[24rem]  */}
            {/* <Carde3d /> */}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
