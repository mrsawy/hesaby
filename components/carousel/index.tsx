"use client";

import React, { useEffect } from "react";
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
import { ProductCard } from "../cards/product-card";

export default function CarouselSize({
  data,
  label,
  btnTxt,
  btnTextPrice,
  btnUrlPrefix,
  type,
  cardClassName,
  carouselItemClassName,
}: {
  data?: any[];
  btnTxt?: string;
  btnTextPrice: boolean;
  label?: string;
  btnUrlPrefix: string;
  type: string;
  cardClassName?: string;
  carouselItemClassName?: string;
}) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        active: true,
      }}
      className="w-full lg:my-24"
    >
      {label && (
        <label className="text-center  font-bold lg:text-[3rem] py-8 flex justify-start">
          {label}
        </label>
      )}

      <CarouselContent className="gap-0 lg:gap-0 xl:gap-1 justify-start   " dir="ltr">
        {data &&
          data.map((d, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "basis-full md:basis-1/3 xl:basis-1/3 2xl:basis-1/4 ",
                `   sm:w-auto`,
                carouselItemClassName
              )}
            >
              <div className="p-1 h-full">
                <ProductCard
                  btnUrlPrefix={btnUrlPrefix}
                  type={type}
                  btnTxt={btnTxt ?? ``}
                  product={d}
                />
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
