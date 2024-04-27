// import React from 'react';
import { Games } from "./components/games";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import prisma from "@/prisma/db";
import s3 from "@/s3";

const Game = async () => {
  const games = await prisma.game.findMany();
  // const platforms = await prisma.platform.findMany({});

  // platforms.forEach(async (platform) => {
  //   let command = new GetObjectCommand({
  //     Bucket: process.env.AWS_S3_BUCKET_NAME,
  //     Key: platform.platformImg as string,
  //   });
  //   const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });
  //   platform.platformImg = url;
  // });
  console.log(games);
  games.forEach(async (game) => {
    try {
      let command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: game.gameImg as string,
      });
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 * 24 });
      game.gameImg = url;
    } catch (err) {
      // game.gameImg = url;
      console.log(err);
    }
  });

  return <Games tableData={games} />;
};

export default Game;
