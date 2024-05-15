"use client";

import { cn } from "@/lib/utils";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React, { useEffect, useState } from "react";
import { Account } from "@prisma/client"; // Import Product type from your application

import useCartStore from "@/store/cartStore";

function CartIcon({ className = ``, account }: { className?: string; account: Account }) {
  let { cart, addToCart, removeFromCart } = useCartStore();

  useEffect(() => {
    setSelected(!!cart.find((ele) =>  {
      // console.log({ele});
      return ele?.id == account.id;
    }));
  }, [cart]);

  const [selected, setSelected] = useState(
    !!cart.find((ele) => {
      // console.log({ele});
      return ele?.id == account.id;
    })
  );
  return (
    <button
      type="button"
      className={cn(`flex justify-center`)}
      onClick={(e) => {
        e.stopPropagation();
        // setSelected((p) => !p);
        !selected && addToCart(account);
        selected && removeFromCart(account);
        // setSelected
      }}
    >
      <AddShoppingCartIcon
        // fontSize="medium"
        className={cn(
          `p-2 w-10 h-10 md:w-12 md:h-12 border md:p-[0.55rem] md:text-[2.3rem] rounded-full   z-[38] transition-all duration-700 flex justify-center`,
          selected ? `bg-gray-100 text-zinc-900 border-zinc-950` : `bg-gray-900 text-white`,
          className
        )}
      />
    </button>
  );
}

export default CartIcon;
