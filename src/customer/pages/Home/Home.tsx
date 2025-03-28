import React from "react";
import ElectricCategories from "./components/ElectricCategories/ElectricCategories";
import CategoryGrid from "./components/CategoryGrid/CategoryGrid";
import Deal from "./components/Deal/Deal";
import ShopByCategory from "./components/ShopByCategory/ShopByCategory";
import Title from "./components/Title/Title";
import { Button } from "@mui/material";
import { Storefront } from "@mui/icons-material";

const Home = () => {
  return (
    <>
      <div className="space-y-5 lg:space-y-10 relative pb-20">
        <ElectricCategories />
        <CategoryGrid />
        <section className="pt-20">
          <Title>TODAY'S DEAL</Title>
          <Deal />
        </section>
        <section className="pt-20">
          <Title>Shop By Category</Title>
          <ShopByCategory />
        </section>
        <section className="lg:px-20  pt-20 relative h-full w-full">
          <img
            className="h-full w-full border-1 border-gray-200 rounded-md object-cover "
            src="https://m.media-amazon.com/images/G/31/amazonservices/Becoming_an_online_seller.jpg"
            alt=""
          />
          <div className="absolute left-1/2 top-0 translate-x-[-50%] translate-y-[150%] font-semibold lg:text-4xl space-y-3 flex flex-col items-center">
            <h1>Sell Your Product</h1>
            <p>
              <span className="text-xs md:text-xl">With </span>
              <span className="logo">Nrin Bazaar</span>
            </p>
          </div>
          <Button
            startIcon={<Storefront />}
            size="large"
            variant="contained"
            className="absolute left-1/2 translate-x-[-50%] bottom-0 translate-y-[-150%]"
          >
            Become Seller
          </Button>
        </section>
      </div>
    </>
  );
};

export default Home;
