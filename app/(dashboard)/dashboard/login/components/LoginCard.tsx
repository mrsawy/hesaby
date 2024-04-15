import { Button } from "@/components/ui/button";
import { DarkModeSwitch } from "@/components/navbar/darkmodeswitch";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Input as LightInput } from "@/components/ui/input-light";
import { adminLogin } from "@/actions/admin";
import { cookies } from "next/headers";
// import cookies from 'next-cookies';

import { jwtVerify } from "jose";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";

import LoginForm from "./LoginForm";

// const JWT_SECRET_ADMIN: string = process.env.JWT_SECRET_ADMIN as string;
// export const dynamic = 'force-no-store'

async function LoginCard() {
  const cookieStore = cookies();
  if (cookieStore.has(`admin-token`) && cookieStore.get("admin-token")) {
    const adminToken = cookieStore.get("admin-token");
    try {
      const { payload } = await jwtVerify(
        `${adminToken?.value || ``}`,
        new TextEncoder().encode(
          process.env.JWT_SECRET_ADMIN ? process.env.JWT_SECRET_ADMIN : "pshviroessing-environ"
        )
      );
    } catch (error) {
      console.log(error);
      // return redirect(`/dashboard`);
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
    return redirect(`/dashboard`);
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
