import { cookies } from "next/headers";

import prisma from "@/prisma/db";
import { jwtVerify } from "jose";
import { getSingleUrl, getCoverUrl } from "@/lib/backend/getImageUrl";
import Image from "next/image";
import Link from "next/link";

export default async function Page({ params }: any) {
  const cookieStore = cookies();
  let id = params?.id ?? null;
  let user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error(`User Not Found`);

  let sameUser = false;

  try {
    const userToken = cookieStore.get("hesaby-user-token");
    console.log({ userToken });
    const { payload } = await jwtVerify(
      `${userToken?.value}` as string,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    // console.log(payload);
    if (payload.id == id) {
      sameUser = true;
    }
  } catch (error) {
    // console.log(error);
  }

  let profileUrl = await getSingleUrl({ key: user.profileImg });
  let coverUrl = await getCoverUrl({ key: user.coverImg });

  return (
    <div className="h-screen flex flex-col  dark:text-zinc-400 justify-start w-full pt-8 sm:pt-9">
      <div className="w-full h-40 md:h-80 lg:h-[22rem]">
        <Image
          className="w-full h-full relative object-cover"
          src={coverUrl}
          width={500}
          height={400}
          alt="cover image"
        />
      </div>

      <div className="flex gap-10 p-2 sm:p-4 md:py-5 md:px-16  2xl:px-64 flex-wrap sm:flex-nowrap">
        <div className="w-full md:w-1/4 border dark:border-zinc-700 rounded-md px-2">
          <div className=" w-28 h-28 rounded-md border -translate-y-11 overflow-hidden">
            <Image
              className="w-full h-full relative object-cover "
              src={profileUrl}
              width={500}
              height={400}
              alt="cover image"
            />
          </div>
          <div className="flex flex-col gap-2 -translate-y-9">
            <h1 className="text-3xl font-bold capitalize dark:text-zinc-100">
              {user.firstName} {user.lastName}
            </h1>
            <Link href={`mailto:${user.email}`} className="dark:text-zinc-300">
              {user.email}
            </Link>
            <p>{user.bio}</p>
          </div>
        </div>
        <div className="w-full md:w-3/4 p-5 border dark:border-zinc-600 rounded-md">
          {id}
          {sameUser ? `true` : `false`}
        </div>
      </div>

      <br />
      {/* </div> */}
    </div>
  );
}
