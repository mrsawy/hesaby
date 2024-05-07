import Panel from "@/components/text-panel";
import prisma from "@/prisma/db";
import s3 from "@/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import getImageUrl, { getSingleUrl } from "@/lib/backend/getImageUrl";

import SingleAccountComponent from "./components/SingleAccount";

export default async function SingleAccount({ params }: { params: { id: string } }) {
  if (!params.id) return <WrongId />;
  //
  let account = await prisma.account.findUnique({
    where: { id: params.id },
    include: {
      accountImages: true,
      game: true,
      seller: true,
      platform: true,
    },
  });
  if (!account) return <WrongId />;
  //
  let gallery = await getImageUrl({ data: account.accountImages, key: `image` });
  let accountImgUrl = await getSingleUrl({ key: account.accountImg });
  const gameImg = await getSingleUrl({ key: account.game.gameImg });
  const platformImg = await getSingleUrl({ key: account.platform.platformImg });
  const sellerImg = await getSingleUrl({ key: account.seller.profileImg });
  return (
    <div className="w-full h-full flex flex-col justify-center items-center text-black dark:text-white">
      <div className="mt-8 mb-8"></div>
      <SingleAccountComponent
        platformImgUrl={platformImg}
        gameImgUrl={gameImg}
        sellerImg={sellerImg}
        account={{ ...account }}
        gallery={
          gallery
            ? [{ imgUrl: accountImgUrl, id: "_" }, ...gallery]
            : [{ imgUrl: accountImgUrl, id: "_" }]
        }
      />
    </div>
  );
}

const WrongId = () => (
  <div className="w-full h-full flex justify-center items-center text-black dark:text-white">
    Wrong Id
  </div>
);
