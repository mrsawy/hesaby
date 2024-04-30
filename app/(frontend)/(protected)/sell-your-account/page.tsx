//

import AccountForm from "./components/account-form";
import prisma from "@/prisma/db";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default async function Page() {
  let platforms = await prisma.platform.findMany();
  let games = await prisma.game.findMany();

  // console.log({ games, platforms });

  return (
    <div className=" pt-24 ">
      <HoverBorderGradient
        containerClassName="text-3xl font-bold bg-slate-50 shadow-md   text-black m-auto text-center  mb-20  rounded"
        className="bg-white text-black px-9 py-4 text-lg"
        as="button"
      >
        Sell Your Account
      </HoverBorderGradient>
      <div className=" font-bold  text-black m-auto w-11/12 md:w-9/12 ">
        <AccountForm
          platforms={platforms.map((e) => ({ ...e, label: e?.title }))}
          games={games.map((e) => ({ ...e, label: e?.title }))}
        />
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
// 'auto' | 'force-dynamic' | 'error' | 'force-static'
