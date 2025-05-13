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

const AdminNavbar = () => {
  const them = useTheme();
  const isLarge = useMediaQuery(them.breakpoints.up("lg"));
  const navigate = useNavigate();
  const auth = useAppSelector((store) => store.auth);
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

          <div className="flex items-center gap-1 lg:gap-6">
            {auth.loggedIn ? (
              <Button
                className="flex gap-2"
                onClick={() => navigate("/account")}
              >
                <Avatar
                  sx={{ height: "2.5rem", width: "2.5rem" }}
                  src="https://img.freepik.com/premium-photo/majestic-eagle-closeup-face-ai-generated_1020331-5725.jpg"
                />
                <h1 className="font-semibold hidden lg:block">
                  Hello Admin: {auth.user?.fullName}
                </h1>
              </Button>
            ) : (
              <Button
                onClick={() => navigate("/authentication")}
                variant="contained"
                startIcon={<AccountCircleIcon />}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default AdminNavbar;
