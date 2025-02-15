import React from "react";
import ElectricCategories from "./components/ElectricCategories/ElectricCategories";
import CategoryGrid from "./components/CategoryGrid/CategoryGrid";
import Deal from "./components/Deal/Deal";
import ShopByCategory from "./components/ShopByCategory/ShopByCategory";
import Title from "./components/Title/Title";

const Home = () => {
  return (
    <>
      <div className="space-y-5 lg:space-y-10 relative pb-20">
        <ElectricCategories />
        <CategoryGrid />
        <div className="pt-20">
          <Title>TODAY'S DEAL</Title>
          <Deal />
        </div>
        <div className="pt-20">
          <Title level="4">Shop By Category</Title>
          <ShopByCategory />
        </div>
      </div>
    </>
  );
};

export default Home;
