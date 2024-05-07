"use server";

import { Prisma as PrismaType } from "@prisma/client";
import { prisma } from "@/prisma/db";
import TableName from "@/types/table-names";
// import { redirect } from "next/navigation";
// import { join } from "path";
import generateUniqueId from "@/lib/date_id";
// import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import s3 from "@/s3";
// import { editGameAndPlatformSchema } from "@/lib/formSchemas";
import handleUploadFilesS3 from "@/lib/backend/s3Upload";
import handleDeleteFileS3 from "@/lib/backend/s3Delete";
// const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");
import { editGameAndPlatformSchema, editUserSchema } from "@/lib/formSchemas";

export const editUser = async (userData: any, formData: FormData) => {
  editUserSchema.validateSync(userData);

  let profileImg = Object.fromEntries(formData.entries()).profileImg,
    coverImg = Object.fromEntries(formData.entries()).coverImg;

  let updatedData: any = {
    firstName: userData.fileName as string,
    lastName: userData.lastName as string,
    bio: userData.bio as string,
    isBlocked: userData.isBlocked,
    isWithdrawRequested: userData.isWithdrawRequested,
    isEmailVerified: userData.isEmailVerified,
    isPhoneVerified: userData.isPhoneVerified,
    profileImg,
    coverImg,
  };

  if (profileImg) {
    if (userData.profileImgKey) {
      let { ok } = await handleDeleteFileS3({ key: userData.profileImgKey as string });
      if (!ok) throw new Error("Error while deleting profile old image");
    }
    let bytes = await (profileImg as File).arrayBuffer();
    let buffer = Buffer.from(bytes);

    let { name, ok: uploadOk } = await handleUploadFilesS3({
      buffer,
      filename: (profileImg as File).name,
      tableName: "user",
      identifier: "profileImg",
    });
    if (!uploadOk) throw new Error("Error while uploading profile  image");
    updatedData.profileImg = name;
  }
  if (coverImg) {
    if (userData.coverImgKey) {
      let { ok } = await handleDeleteFileS3({ key: userData.coverImgKey as string });
      if (!ok) throw new Error("Error while deleting cover old image");
    }
    let bytes = await (coverImg as File).arrayBuffer();
    let buffer = Buffer.from(bytes);

    let { name, ok: uploadOk } = await handleUploadFilesS3({
      buffer,
      filename: (coverImg as File).name,
      tableName: "user",
      identifier: "coverImg",
    });
    if (!uploadOk) throw new Error("Error while uploading cover  image");
    updatedData.coverImg = name;
  }

  let updatedUser = await prisma.user.update({
    where: { id: userData.id, email: userData.email },
    data: updatedData,
  });
  return updatedUser;
};
