import React, { useState } from "react";
import classes from "./Product.module.css";
import FilterSection from "./components/FilterSection/FilterSection";
import ProductCard from "./components/ProductCard/ProductCard";
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";

const Product = () => {
  const them = useTheme();
  const isLarge = useMediaQuery(them.breakpoints.up("lg"));
  const [sortType, setSortType] = useState();

  const handleChangeSort = () => {};

  return (
    <div className={`mt-10 -z-10 ${classes.root}`}>
      <h1 className="text-slate-700 text-3xl text-center font-bold pb-5 px-9 uppercase space-x-2">
        Women sarees
      </h1>
      <div className="lg:flex">
        <section className={`${classes.filterSection} hidden lg:block w-[20%]`}>
          <FilterSection />
        </section>
        <div
          className={`${classes.ProductSection} w-full lg:w-[80%] space-y-5 relative`}
        >
          <div className="h-[30p] flex justify-between items-center px-9">
            <div>
              {!isLarge && (
                <IconButton>
                  <FilterAlt />
                </IconButton>
              )}
              {!isLarge && (
                <Box>
                  <FilterSection />
                </Box>
              )}
            </div>

            <FormControl sx={{ width: "200px" }} size="small">
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortType}
                label="Sort"
                onChange={handleChangeSort}
              >
                <MenuItem value={"price-low"}>Price: Low - High</MenuItem>
                <MenuItem value={"price-high"}>Price: Hight - Low</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Divider />
          <section className="product_section grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-5 px-5 justify-center">
            {
              [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map((item)=><ProductCard />)
            }
          </section>
        </div>
      </div>
    </div>
  );
};

export default Product;
