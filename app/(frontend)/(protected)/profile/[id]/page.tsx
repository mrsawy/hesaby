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
    const { payload } = await jwtVerify(
      `${userToken}` as string,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    if (payload.id == id) {
      sameUser = true;
    }
  } catch (error) {}

  return (
    <div>
      <div className="w-full"></div>

      {id}
    </div>
  );
}
