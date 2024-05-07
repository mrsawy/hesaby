"use client";

import Gallery from "./Gallery";
// import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";

import Button from "@/components/main-button";
import AddToCartIcon from "@/components/icons/AddToCartIcon";

export default function SingleAccount({
  gallery,
  account,
  gameImgUrl,
  platformImgUrl,
  sellerImg,
}: any) {
  console.log({ gallery });
  return (
    // <div className="mt-32">
    <div className="container flex justify-center text-center  mt-4 capitalize">
      <div className="w-full md:w-8/12  ">
        <div className="border rounded-xl p-4 dark:border-gray-800 lg:px-10">
          <div className="header">
            <h1 className=" text-2xl text-black dark:text-gray-50  mt-10 mb-6">{account?.title}</h1>
          </div>
          <div className="desc  text-base  text-gray-900 dark:text-gray-300">
            {account?.description}
          </div>
          <Gallery images={gallery} className="my-16" />

          <Divider className="mt-4 mb-6" />

          <div className="flex h-5 items-center space-x-4 text-small justify-center ">
            <div className="flex flex-col gap-1">
              <div>البائع</div>
              <div className="flex gap-1  justify-center items-center">
                <Avatar src={sellerImg} alt="seller profile image" name={account.seller.title} />
                <div>
                  {account?.seller?.firstName} {account?.seller?.lastName}
                </div>
              </div>
            </div>
            <Divider orientation="vertical" />
            <div className="flex flex-col gap-1">
              <div>اللعبة</div>
              <div className="flex gap-1  justify-center items-center">
                <Avatar src={gameImgUrl} alt="game  image" name={account.game.title} />

                <div>{account?.game?.title}</div>
              </div>
            </div>
            <Divider orientation="vertical" />

            <div className="flex flex-col gap-1">
              <div>المنصة</div>
              <div className="flex gap-1  justify-center items-center">
                <Avatar src={platformImgUrl} alt="platform  image" name={account.platform.title} />
                <div>{account?.platform.title}</div>
              </div>{" "}
            </div>
          </div>
          <Divider className="mt-8 mb-6" />

          <Button className="m-auto py-2 px-4 mb-3">
            <div className="flex  gap-4  ">
              <div className="flex gap-1 md:gap-2 ">
                <p>{account.price}</p>
                <span>SR</span>
              </div>
              <div>
                <AddToCartIcon className="text-md lg:text-2xl" />
              </div>
            </div>
          </Button>

          {/* </div> */}
        </div>
      </div>
    </div>
    // </div>
  );
}
