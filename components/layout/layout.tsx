"use client";
import { usePathname } from "next/navigation";

import React from "react";
import { useLockedBody } from "../hooks/useBodyLock";
import { NavbarWrapper } from "../navbar/navbar";
import { SidebarWrapper } from "../sidebar/sidebar";
import { SidebarContext } from "./layout-context";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  const pathname = usePathname();

  const sideNav =
    !pathname.includes(`login`) &&
    !pathname.includes(`signUp`) &&
    !pathname.includes(`sighup`) &&
    !pathname.includes(`auth`);

  console.log(pathname, sideNav);

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        {!sideNav && children}
        {sideNav && (
          <>
            <SidebarWrapper />
            <NavbarWrapper>{children}</NavbarWrapper>
          </>
        )}
      </section>
    </SidebarContext.Provider>
  );
};
