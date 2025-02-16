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
import CategorySheet from "./components/CategorySheet/CategorySheet";
import { mainCategories } from "../../../data/category/mainCategory";

const Navbar = () => {
  const them = useTheme();
  const isLarge = useMediaQuery(them.breakpoints.up("lg"));
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [isShowCategorySheet, setIsShowCategorySheet] = useState(false);

  return (
    <div className={classes.root}>
      <Box>
        <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
          <div className="flex gap-9 items-center">
            <div className="items-center flex gap-2">
              {!isLarge && (
                <IconButton>
                  <MenuIcon />
                </IconButton>
              )}
              <h1 className={`logo cursor-pointer text-lg md:text-2xl`}>
                Nrin Bazaar
              </h1>
            </div>
            {isLarge && (
              <ul className="flex items-center text-gray-800">
                {mainCategories.map((item) => (
                  <li
                    onMouseLeave={() => setIsShowCategorySheet(false)}
                    onMouseEnter={() => {
                      setIsShowCategorySheet(true);
                      setSelectedCategory(item.categoryId);
                    }}
                    id={item.categoryId}
                    className="hover:text-[var(--primary-color)]
                      hover:border-b-3 h-[70px] border-[var(--primary-color)] px-4 flex items-center cursor-pointer"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center gap-1 lg:gap-6">
            <IconButton>
              <SearchIcon />
            </IconButton>

            {false ? (
              <Button>
                <Avatar
                  sx={{ height: "2.5rem", width: "2.5rem" }}
                  src="https://img.freepik.com/premium-photo/majestic-eagle-closeup-face-ai-generated_1020331-5725.jpg"
                />
                <h1 className="font-semibold hidden lg:block">Rin</h1>
              </Button>
            ) : (
              <Button variant="contained" startIcon={<AccountCircleIcon />}>
                Login
              </Button>
            )}

            <IconButton>
              <FavoriteBorderIcon sx={{ fontSize: 29 }} />
            </IconButton>
            <IconButton>
              <AddShoppingCartIcon
                sx={{ fontSize: 29 }}
                className="text-gray-700"
              />
            </IconButton>

            {isLarge && (
              <Button startIcon={<Storefront />} variant="outlined">
                Become seller
              </Button>
            )}
          </div>
        </div>
        {isShowCategorySheet && (
          <div
            onMouseEnter={() => setIsShowCategorySheet(true)}
            onMouseLeave={() => setIsShowCategorySheet(false)}
            className="absolute top-[4.41rem] left-20 right-20"
          >
            <CategorySheet selectedCategory={selectedCategory} />
          </div>
        )}
      </Box>
    </div>
  );
};

export default Navbar;
