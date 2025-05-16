import React from "react";
import { Outlet } from "react-router-dom";
import AdminDrawerList from "../../components/AdminDrawerList/AdminDrawerList";
import { MenuItem } from "../../../components/DrawerList/DrawerList";
import {
  AccountBox,
  Add,
  Category,
  Dashboard,
  ElectricBolt,
  Home,
  IntegrationInstructions,
  LocalOffer,
  Logout,
  Store,
} from "@mui/icons-material";

const menu: MenuItem[] = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <Dashboard className="text-[var(--primary-color)]" />,
    activeIcon: <Dashboard className="text-white" />,
  },
{
    name: "Seller",
    path: "/admin/seller",
    icon: <Store className="text-[var(--primary-color)]" />,
    activeIcon: <Store className="text-white" />,
  },
  {
    name: "Home Category",
    path: "/admin/home-category/0",
    icon: <Home className="text-[var(--primary-color)]" />,
    activeIcon: <Home className="text-white" />,
  },
  {
    name: "Banner",
    path: "/admin/banner",
    icon: <ElectricBolt className="text-[var(--primary-color)]" />,
    activeIcon: <ElectricBolt className="text-white" />,
  },

];

const menu2: MenuItem[] = [
  {
    name: "Account",
    path: "/admin/account",
    icon: <AccountBox className="text-[var(--primary-color)]" />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout className="text-[var(--primary-color)]" />,
    activeIcon: <Logout className="text-white" />,
  },
];

const MainAdmin = () => {
  const handleToggleDrawer = () => {};
  return (
    <div>
      <div className="lg:flex lg:h-[90vh]">
        <section className="hidden lg:block h-full">
          <AdminDrawerList
            menu={menu}
            menu2={menu2}
            toggleDrawer={handleToggleDrawer}
          />
        </section>
        <section className="p-10 w-full lg:w-[100%] overflow-y-auto">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default MainAdmin;
