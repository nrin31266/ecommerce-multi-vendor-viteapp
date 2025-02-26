import { Draw } from "@mui/icons-material";
import React from "react";
import DrawerList, {
  MenuItem,
} from "../../../components/DrawerList/DrawerList";

const AdminDrawerList = ({
  menu,
  menu2,
  toggleDrawer,
}: {
  menu: MenuItem[];
  menu2: MenuItem[];
  toggleDrawer: () => void;
}) => {
  return (
    <div>
      <DrawerList menu1={menu} menu2={menu2} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default AdminDrawerList;
