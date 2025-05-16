import { Divider, ListItemIcon, ListItemText } from "@mui/material";
import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../states/store";
import { logout } from "../../states/authSlide";

export interface MenuItem {
  name: string;
  path: string;
  icon: ReactNode;
  activeIcon: ReactNode;
}
interface Props {
  menu1: MenuItem[];
  menu2: MenuItem[];
  toggleDrawer: () => void;
}

const DrawerList = ({ menu1, menu2, toggleDrawer }: Props) => {

    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();


  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full w-[300px] border-r py-5 border-gray-200 pr-2">
        <div>
          <div className="space-y-2">
            {
                menu1.map((item, index)=><div onClick={()=>navigate(item.path)} className=" cursor-pointer" key={index}>
                    <div className={`${location.pathname === item.path? "bg-[var(--primary-color)] text-white" : "hover:bg-[var(--secondary-color)]"} 
                    flex p-3 items-center px-3 `}>
                        <ListItemIcon>{location.pathname === item.path ? item.activeIcon : item.icon}</ListItemIcon>
                        <ListItemText primary={item.name}/>
                    </div>
                </div>)
            }
          </div>
          <Divider/>
          <div className="space-y-2">
            {
                menu2.map((item, index)=><div onClick={()=>{

                  if(item.name === "Logout"){
                    dispatch(logout({navigate}));
                  }else if(item.path !== location.pathname){
                    navigate(item.path)
                  }
                  
                }} className=" cursor-pointer" key={index}>
                    <div className={`flex p-3 items-center px-3 ${location.pathname === item.path? "bg-[var(--primary-color)] text-white" : "hover:bg-[var(--secondary-color)]"} 
                    `}>
                        <ListItemIcon>{location.pathname === item.path ? item.activeIcon : item.icon}</ListItemIcon>
                        <ListItemText primary={item.name}/>
                    </div>
                </div>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawerList;
