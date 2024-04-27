// import React from 'react';
import { Accounts } from "./components/Account";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import prisma from "@/prisma/db";
import s3 from "@/s3";

const Account = async () => {
  const accounts = await prisma.account.findMany({
    include: {
      platform: true,
      game: true,
    },
  });
  console.log(accounts);
  try {
    const promises = accounts.map(async (account) => {
      try {
        let command = new GetObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: account.accountImg as string,
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });
        account.accountImg = url;
      } catch (err) {
        console.log(err);
      }
    });
    await Promise.all(promises);
    console.log(accounts);
  } catch (err) {
    console.log(`error in signed private url`,err);
  }

  return <Accounts tableData={accounts} />;
};

export default Account;
