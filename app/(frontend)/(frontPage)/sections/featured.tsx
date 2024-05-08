import Carousel from "@/components/carousel/";
import prisma from "@/prisma/db";
import getImageUrl from "@/lib/backend/getImageUrl";

export const dynamic = "force-dynamic";

export default async function Featured() {
  let featuredGames = await prisma.game.findMany({
    where: {
      isFeatured: true,
    },
  });
  let featureAccounts = await prisma.account.findMany({
    where: {
      isFeatured: true,
    },
  });

  let gameData = await getImageUrl({ data: featuredGames, key: "gameImg" });
  let accountData = await getImageUrl({ data: featureAccounts, key: "accountImg" });

  // console.log(`enableDecs Featured`, enableDecs);
  return (
    <>
      {/* <div className="flex gap-4 px-12 lg:px-32 xl:36 2xl:px-40 py-3 flex-wrap w-full  "> */}
      <div className="w-[70vw] sm:w-[89vw] lg:my-24 mx-auto">
        <Carousel
          data={gameData}
          enableDecs={false}
          label={`Featured Games`}
          btnTxt={`SEE MORE`}
          btnTextPrice={false}
          btnUrlPrefix={`/games/`}
        />
      </div>
      <hr className="mx-2 lg:mx-40 shadow-lg border-gray-500 dark:border-gray-600" />

      <div className="w-[70vw] sm:w-[89vw] lg:my-24 mx-auto">
        <Carousel
          data={accountData}
          label={`Featured Accounts`}
          enableDecs={true}
          btnTextPrice={true}
          btnUrlPrefix={`/accounts/`}
        />
      </div>
    </>
  );
}
