import React, { useEffect, useState } from "react";
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
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FilterAlt } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../states/store";
import { fetchAllProduct } from "../../../states/customer/productSlide";

const Product = () => {
  const them = useTheme();
  const isLarge = useMediaQuery(them.breakpoints.up("lg"));
  const [sortType, setSortType] = useState();
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryId } = useParams();
  const { products } = useAppSelector((state) => state.product);
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});

  const handleChangeSort = () => {};
  const handlePageChange = (value: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", value.toString());
    setSearchParams(newParams);
  };

  useEffect(() => {
    const color = searchParams.get("color");
    const minimumDiscount = searchParams.get("discount");
    const [minimumPrice, maximumPrice] =
      searchParams.get("price-range")?.split("-") || [];
    const pageNumber = searchParams.get("page");

    const params: Record<string, string> = {
      colors: color?.toString() ?? "",
      minimumDiscount: minimumDiscount?.toString() ?? "",
      minimumPrice: minimumPrice?.toString() ?? "",
      maximumPrice: maximumPrice?.toString() ?? "",
      pageNumber: pageNumber?.toString() ?? "",
      category: categoryId!,
    };

    setFilterValues(params);

    console.log(params);

    dispatch(fetchAllProduct({ params: params }));
  }, [searchParams, categoryId]);

  const handleAddFilterValue = (name: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(name, value);
    setSearchParams(newParams);
  };

  const handleClearFilter = () => {
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
  };

  return (
    <div className={`mt-10 -z-10 ${classes.root}`}>
      <h1 className="text-slate-700 text-3xl text-center font-bold pb-5 px-9 uppercase space-x-2">
        Women sarees
      </h1>
      <div className="lg:flex">
        <section className={`${classes.filterSection} hidden lg:block w-[20%]`}>
          <FilterSection
            filterValues={filterValues}
            onAddFilterValue={(n, v) => {
              handleAddFilterValue(n, v);
            }}
            onClearFilter={() => {
              handleClearFilter();
            }}
          />
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
              {/* {!isLarge && (
                <Box>
                  <FilterSection />
                </Box>
              )} */}
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
          <section className="product_section mt-3 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-5 px-5 justify-center">
            {products.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
          </section>
          <section className="py-10 flex justify-center ">
            <Pagination
              shape="rounded"
              color="primary"
              count={10}
              variant="outlined"
              onChange={(e, value) => handlePageChange(value)}
              page={
                filterValues.pageNumber ? Number(filterValues.pageNumber) : page
              }
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Product;
