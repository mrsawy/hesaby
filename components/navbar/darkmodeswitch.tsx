"use client";

import React, { useEffect, useState } from "react";
import { useTheme as useNextTheme } from "next-themes";
import SunIcon from "@mui/icons-material/WbSunny";
// import MoonIcon from "@mui/icons-material/NightsStay";
import MoonIcon from '@mui/icons-material/DarkMode';
import { Switch } from "@nextui-org/react";

export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme } = useNextTheme();
  const [theme, setThemeState] = useState(`${resolvedTheme ?? ``}`);
  // console.log(resolvedTheme);

  useEffect(() => {
    setThemeState(`${resolvedTheme ?? ``}`);
  }, [resolvedTheme]);
  return (
    <Switch
      isSelected={!(resolvedTheme == "light")}
      onValueChange={(e) => setTheme(e ? "dark" : "light")}
      thumbIcon={({ isSelected, className }) =>
        theme == `light` ? <SunIcon className={className} /> : <MoonIcon className={className} />
      }
    />
  );
};
