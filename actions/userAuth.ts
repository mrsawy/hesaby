"use server";

import { NextResponse, NextRequest } from "next/server";

import * as yup from "yup";
import bcrypt from "bcrypt";
import prisma from "@/prisma/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { userLogin as userLoginSchema, userSignup as signupSchema } from "@/lib/formSchemas";
import { redirect } from "next/navigation";

import { jwtVerify, SignJWT } from "jose";
// import { createSecretKey } from "crypto";

//
// const JWT_SECRET = process.env.JWT_SECRET;
const JWT_SECRET: string = process.env.JWT_SECRET as string;
const ROUNDS_OF_HASHING = Number(process.env.ROUNDS_OF_HASHING);

async function loginAction(formData: FormData) {
  try {
    // await waitForFourSeconds();

    const rawFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    await userLoginSchema.validate(rawFormData, { abortEarly: false });

    // console.log(rawFormData, rawFormData.email);
    const user = await prisma.user.findFirst({
      where: {
        email: rawFormData.email,
      },
    });
    if (!user) {
      throw new Error("Invalid Email ");
    }

    const res = await bcrypt.compare(rawFormData.password, user.password);

    if (!res) {
      throw new Error(`Wrong Password`);
    }
    const token = await new SignJWT({ email: user.email, password: rawFormData.password })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1y")
      .sign(new TextEncoder().encode(JWT_SECRET));

    cookies().set(`hesaby-user-token`, token);

    return { user };
    // revalidatePath(`/`);
    // redirect(`/`);
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      // Handle validation errors
      console.error("Validation Error:", error.errors);
      throw new Error(error.errors[0]);
    } else {
      // Handle other errors
      console.error("Error:", error);
      throw new Error(error.message);
    }
  }
  // return
  // redirect(`/`);
}

async function signUpAction(formData: FormData) {
  console.log(`hit signup action`);
  try {
    const rawFormData = {
      firstName: formData.get("fname") as string,
      lastName: formData.get("lname") as string,
      phoneNumber: formData.get("phone") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirm_password: formData.get("confirm_password") as string,
    };
    await signupSchema.validate(rawFormData, { abortEarly: false });
    const FoundedUser = await prisma.user.findFirst({
      where: {
        email: rawFormData.email,
      },
    });
    if (FoundedUser) {
      throw new Error("User with the same Email already exists ");
    }

    const hashedPassword = await bcrypt.hash(rawFormData.password, ROUNDS_OF_HASHING);

    const newUser = await prisma.user.create({
      data: {
        firstName: rawFormData.firstName,
        lastName: rawFormData.lastName,
        email: rawFormData.email,
        password: hashedPassword,
        phoneNumber: rawFormData.phoneNumber,
      },
    });

    // console.log(`newUser`, newUser);

    if (!newUser) {
      throw new Error("Failed to create user");
    }

    const token = await new SignJWT({ email: newUser.email, password: rawFormData.password })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1y")
      .sign(new TextEncoder().encode(JWT_SECRET));

    cookies().set(`hesaby-user-token`, token);
    revalidatePath(`/auth`);
    return { user: newUser };
    // return revalidatePath(`/`);
  } catch (error: any) {
    if (error instanceof yup.ValidationError) {
      console.error("Validation Error:", error.errors);
      throw new Error(error.errors[0]);
    } else {
      console.error("Error:", error);
      throw new Error(error.message);
    }
  }
  // revalidatePath(`/`);
}

export { loginAction, signUpAction };
