// import React from 'react';
import { Platforms as PlatformsComponent } from "./components/platforms";
import prisma from "@/prisma/db";

const MainPlatformComponent = async () => {
  const platforms = await prisma.platform.findMany();

  return <PlatformsComponent tableData={platforms} />;
};

export default MainPlatformComponent;
