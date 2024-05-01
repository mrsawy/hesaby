import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/db";

import bcrypt from "bcrypt";
import { jwtVerify } from "jose";

export const POST = async (request: Request) => {
  try {
    let data = await request.json();
    // console.log(data);
    let { token } = data;
    // let { token } = await request.json();
    const { payload } = await jwtVerify(
      `${token || ``}`,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    let user = await prisma.user.findFirst({
      where: {
        email: `${payload.email}`,
      },
    });
    if (!user) throw Error("User not found");

    const res = await bcrypt.compare(`${payload.password}`, user.password);
    if (!res) throw new Error(`Invalid Token`);

    return new NextResponse(JSON.stringify({ user }), { status: 200 });
    // console.log(payload);
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }
};
