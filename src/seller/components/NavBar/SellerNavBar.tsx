import React, { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Storefront } from "@mui/icons-material";
import classes from "./Navbar.module.css";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../../states/store";
import { EAccountStatus } from "../../../types/SellerTypes";

const SellerNavBar = () => {
  const them = useTheme();
  const isLarge = useMediaQuery(them.breakpoints.up("lg"));
  const navigate = useNavigate();
  const auth = useAppSelector((store) => store.auth);
  const sellerState = useAppSelector((store) => store.seller);
  
  return (
    <div className={classes.root}>
      <Box>
        <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b border-gray-200 ">
          <div className="flex gap-9 items-center">
            <div className="items-center flex gap-2">
              {!isLarge && (
                <IconButton>
                  <MenuIcon />
                </IconButton>
              )}
              <h1
                onClick={() => navigate("/")}
                className={`logo cursor-pointer text-lg md:text-2xl`}
              >
                Nrin Bazaar
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1 lg:gap-6 ">
            
          </div>
        </div>
      </Box>
    </div>
  );
};

export default SellerNavBar;
