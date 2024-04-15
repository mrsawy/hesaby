import { Button } from "@/components/ui/button";
import { DarkModeSwitch } from "@/components/navbar/darkmodeswitch";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Input as LightInput } from "@/components/ui/input-light";
import { adminLogin } from "@/actions/admin";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";

import LoginForm from "./LoginForm";

// const JWT_SECRET_ADMIN: string = process.env.JWT_SECRET_ADMIN as string;

async function LoginCard() {
  try {
    const cookieStore = cookies();

    if (cookieStore.has(`admin-token`) && cookieStore.get("admin-token")) {
      const adminToken = cookieStore.get("admin-token");
      const { payload } = await jwtVerify(
        `${adminToken?.value || ``}`,
        new TextEncoder().encode(
          process.env.JWT_SECRET_ADMIN ? process.env.JWT_SECRET_ADMIN : "pshviroessing-environ"
        )
      );
      if (payload) {
        let foundedAdmin = await prisma.admin.findFirst({
          where: {
            email: `${payload?.email || ``} `,
          },
        });
        if (foundedAdmin) {
          return redirect(`/dashboard`);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
  return (
    <Card className="py-4 min-w-[400px] ">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <div className="flex items-between justify-between w-full ">
          <h2 className="text-lg font-semibold">Sign in to your account .</h2>
          <DarkModeSwitch />
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <LoginForm />
      </CardBody>
    </Card>
  );
}
export default LoginCard;
