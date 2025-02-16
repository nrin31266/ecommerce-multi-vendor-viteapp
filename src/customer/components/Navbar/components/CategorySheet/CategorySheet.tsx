import React from "react";
import { menLevelTwo } from "../../../../../data/category/menLevelTwo";
import { womenLevelTwo } from "../../../../../data/category/womenLevelTwo";
import { homeFurnitureLevelTwo } from "./../../../../../data/category/homeFurnitureLevelTwo";
import { electronicsLevelTwo } from "../../../../../data/category/electronicsLevelTwo";
import { menLevelThree } from "./../../../../../data/category/menCategoryLevelThree";
import { womenLevelThree } from "../../../../../data/category/womenLevelThree";
import { homeFurnitureLevelThree } from "../../../../../data/category/homeFurnitureLevelThree";
import { electronicsLevelThree } from "../../../../../data/category/electronicsLevelThree";
import { Box } from "@mui/material";

interface Category{
    
    "name": string
    "categoryId": string
    "level": number
    "parentCategory": string
}

const categoriesLevelTwo:{[key:string]:Category[]} = {
  men: menLevelTwo,
  women: womenLevelTwo,
  home_furniture: homeFurnitureLevelTwo,
  electronics: electronicsLevelTwo,
};

const categoriesLevelThree:{[key:string]:Category[]} = {
  men: menLevelThree,
  women: womenLevelThree,
  home_furniture: homeFurnitureLevelThree,
  electronics: electronicsLevelThree,
};



const CategorySheet = ({selectedCategory}:{selectedCategory: string}) => {
    
  return (
    <div>
      <Box className="bg-white shadow-lg drop-shadow-lg lg:h-[500px] overflow-y-scroll">
        <div className="flex text-sm flex-wrap">
          {categoriesLevelTwo[selectedCategory]?.map((item, index) => (
            <div className={`p-8 lg:w-[20%] ${index % 2===0 && "bg-slate-50"}`}>
              <p className="text-[var(--primary-color)] font-semibold pb-5">
                {item.name}
              </p>
              <ul className="space-y-3">
                {categoriesLevelThree[selectedCategory].map((categoryLevel3) => {
                  if (categoryLevel3.parentCategory === item.categoryId)
                    return (
                      <li className="cursor-pointer hover:text-[var(--primary-color)]">
                        {categoryLevel3.name}
                      </li>
                    );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default CategorySheet;
