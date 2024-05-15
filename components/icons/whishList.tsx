"use client";

import { cn } from "@/lib/utils";
import useWishlistStore from "@/store/wishlistStore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useEffect, useState } from "react";
import { Account } from "@prisma/client"; // Import Product type from your application

function WishListIcon({ className = ``, account }: { account: Account; className?: string }) {
  const [selected, setSelected] = useState(false);
  let { wishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  useEffect(() => {
    setSelected(
      !!wishlist.find((ele) => {
        // console.log({ ele });
        return ele?.id == account.id;
      })
    );
  }, [wishlist]);

  return (
    <button
      type="button"
      className={cn(`flex justify-center`)}
      onClick={(e) => {
        e.stopPropagation();
        // setSelected((p) => !p);

        !selected && addToWishlist(account);
        selected && removeFromWishlist(account);
      }}
    >
      <FavoriteBorderIcon
        // fontSize="medium"
        className={cn(
          `p-2 w-10 h-10 md:w-12 md:h-12 border md:p-[0.55rem] md:text-[2.3rem] rounded-full z-[38] transition-all duration-700 flex justify-center`,
          selected ? `bg-gray-100 text-zinc-900 border-zinc-950` : `bg-gray-900 text-white`,
          className
        )}
      />
    </button>
  );
}

export default WishListIcon;
