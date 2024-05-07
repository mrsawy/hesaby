import { cookies } from "next/headers";

import prisma from "@/prisma/db";
import { jwtVerify } from "jose";

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

  return (
    <div className="h-screen flex items-center dark:text-gray-400 justify-center w-full">
      {/* <div className="w-full">/ */}

      {id}
      <br />
      {sameUser ? `true` : `false`}
      {/* </div> */}
    </div>
  );
}
