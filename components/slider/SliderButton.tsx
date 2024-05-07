import { ReactNode } from "react";
import { Button } from "@nextui-org/react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Link from "next/link";
import Classes from "./SliderButton.module.css";
import { cn } from "@/lib/utils";
// import { Url } from "url";

//

interface Props {
  //   children?: ReactNode | undefined;
  url?: string | undefined;
  price?: string | number | undefined;
}

export default function App({ url, price }: Props) {
  return (
    <Link href={url ? url : `#`} className="w-full text-center flex justify-center">
      <button
        className={cn(Classes["button"], `bg-red-700 min-w-28 rounded-sm   md:min-w-60 text-sm  lg:text-3xl gap-5 md:gap-10  py-1 sm:py-4`)}
      >
        <div className="flex gap-1 md:gap-2">
          <p>{price}</p>
          <span>SR</span>
        </div>
        {<ShoppingCartCheckoutIcon className="text-md lg:text-4xl" />}
      </button>
    </Link>
  );
}
