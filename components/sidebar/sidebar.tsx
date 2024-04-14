
"use client";

import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";
//
import Logo from "@/components/Logo";
import { DarkModeSwitch } from "../navbar/darkmodeswitch";

//
export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? <div className={Sidebar.Overlay()} onClick={setCollapsed} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem title="Home" icon={<HomeIcon />} isActive={pathname === "/"} href="/" />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/users"}
                title="users"
                href="/dashboard/users"
                icon={<CustomersIcon />}
              />
              <CollapseItems
                icon={<ProductsIcon />}
                items={[
                  { text: "Active", href: `/dashboard/products/active` },
                  { text: "Pending", href: `/dashboard/products/pending` },
                  { text: "Refused", href: "/dashboard/products/refused" },
                ]}
                title="products"
              />
              {/* <SidebarItem
                isActive={pathname === "/products"}
                title="Products"
                icon={<ProductsIcon />}
              /> */}
            </SidebarMenu>

            <SidebarMenu title="General">
              <SidebarItem isActive={pathname === "/view"} title="Site Data" icon={<ViewIcon />} />
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<SettingsIcon />}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            {/* <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip> */}
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <DarkModeSwitch />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Logo width={50} />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
