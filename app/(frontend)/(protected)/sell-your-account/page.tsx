//

import AccountForm from "./components/account-form";
import prisma from "@/prisma/db";
import Panel from "@/components/text-panel";

export default async function Page() {
  let platforms = await prisma.platform.findMany();
  let games = await prisma.game.findMany();

  // console.log({ games, platforms });

  return (
    <div className=" pt-24 ">
      <Panel>Sell Your Account</Panel>
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
