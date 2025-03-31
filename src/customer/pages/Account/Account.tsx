import { Divider } from "@mui/material";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import Profile from "./components/Profile/Profile";
import Orders from "./components/Orders/Orders";
import Address from "./components/Address/Address";
import { useAppDispatch, useAppSelector } from "../../../states/store";
import { logout } from "../../../states/authSlide";

const menu = [
  { name: "profile", path: "/account" },
  { name: "orders", path: "/account/orders" },
  { name: "saved cards", path: "/account/saved-cards" },
  { name: "addresses", path: "/account/addresses" },
  { name: "logout", path: "/" },
];

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useAppDispatch()
 

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="lg:px-40 px-5 min-h-screen mt-10">
      <div>
        <h1 className="text-xl font-bold pb-5">Name is here</h1>
        <Divider />
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:min-h-[78vh]">
          <section className="left col-span-1 lg:border-r lg:pr-5 py-5 h-full border-gray-200 space-y-1">
            {menu.map((item) => (
              <div
                onClick={() => {
                  if(item.name === "logout"){
                    dispatch(logout({navigate}))
                  }else{
                    handleClick(item.path)
                  }

                }}
                key={item.name}
                className={`
                    ${
                      location.pathname === item.path &&
                      "bg-[var(--primary-color)] text-white"
                    }
                    py-3 hover:bg-[var(--primary-color)] hover:text-white cursor-pointer rounded-md px-5 border-b border-gray-200`}
              >
                <p>{item.name}</p>
              </div>
            ))}
          </section>
          <section className="right lg:col-span-2 lg:pl-5 py-5">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Account;
