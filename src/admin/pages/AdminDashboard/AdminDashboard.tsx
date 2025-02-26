import React from "react";
import { Outlet } from "react-router-dom";
import AdminDrawerList from "../../components/AdminDrawerList/AdminDrawerList";
import { MenuItem } from "../../../components/DrawerList/DrawerList";

const menu : MenuItem[] = [

]

const menu2 : MenuItem[] = [

]


const AdminDashboard = () => {
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

export default AdminDashboard;
