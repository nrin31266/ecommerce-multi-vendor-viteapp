import {
  Add,
  AddShoppingCart,
  Favorite,
  FavoriteBorder,
  FavoriteOutlined,
  LocalShipping,
  Remove,
  Shield,
  Star,
  Wallet,
  WorkspacePremium,
} from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import React, { useState } from "react";
import SimilarProduct from "./components/SimilarProduct/SimilarProduct";
import ReviewCard from "../Review/components/ReviewCard/ReviewCard";


const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {[1, 1, 1, 1].map((item) => (
              <img
                className="rounded-md lg:w-full w-[50px] "
                src="https://noritter.com/upload/blogs/4942_1582004443.jpg"
              />
            ))}
          </div>
          <div className="w-full lg:w-85%">
            <img
              className="w-full rounded-md"
              src="https://noritter.com/upload/blogs/4942_1582004443.jpg"
              alt=""
            />
          </div>
        </section>
        <section>
          <h1 className="font-bold text-lg text-[var(--primary-color)]">
            Raam Clothing
          </h1>
          <p className="text-gray-500 font-semibold">women black shirt</p>
          <div className="flex justify-between items-center py-2 border border-gray-200 w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>4</span>
              <Star className="text-[var(--primary-color)] text-[17px]" />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>234 Ratings</span>
          </div>
          <div className="price mt-5 flex items-center gap-3 text-2xl">
            <span className="font-sans text-gray-800">₫ 100000</span>
            <span className="text-gray-400 line-through">₫ 999999</span>
            <span className="font-semibold text-[var(--primary-color)]">
              88%
            </span>
          </div>
          <div className="mt-5">
            <p className="text-sm">
              Inclusive of all taxes. Free Shipping above ₫ 200000
            </p>
          </div>
          <div className="mt-5 space-y-3">
            <div className="flex item-center gap-4">
              <Shield className="text-cyan-500" />
              <p>Authentic & Quality Assured</p>
            </div>
            <div className="flex item-center gap-4">
              <WorkspacePremium className="text-cyan-500" />
              <p>100% money back guarantee</p>
            </div>
            <div className="flex item-center gap-4">
              <LocalShipping className="text-cyan-500" />
              <p>Free Shipping & Return</p>
            </div>
            <div className="flex item-center gap-4">
              <Wallet className="text-cyan-500" />
              <p>Pay on delivery might be available</p>
            </div>
          </div>
          <div className="mt-7 space-y-2">
            <h1>QUANTITY</h1>
            <div className="flex items-center gap-2 w-[140px] justify-between">
              <Button
                disabled={quantity == 1}
                onClick={() => setQuantity((pre) => pre - 1)}
              >
                <Remove />
              </Button>
              <span>{quantity}</span>
              <Button onClick={() => setQuantity((pre) => pre + 1)}>
                <Add />
              </Button>
            </div>
          </div>
          <div className="mt-12 flex items-center gap-5">
            <Button
              className="w-full"
              variant="contained"
              startIcon={<AddShoppingCart />}
              sx={{ py: "1rem" }}
            >
              Add To Bag
            </Button>
            <Button
              className="w-full"
              variant="outlined"
              startIcon={<FavoriteBorder />}
              sx={{ py: "1rem" }}
            >
              Add Wishlist
            </Button>
          </div>
          <div className="mt-12 text-sm">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio
            neque id exercitationem delectus animi repellendus laudantium
            tempore sapiente quam, suscipit ut, qui obcaecati tempora omnis
            blanditiis pariatur sunt dolorum expedita?</p>
          </div>
          <div className="space-y-5 mt-12">
            <ReviewCard/>
            <Divider/>
          </div>
        </section>
      </div>
      <div className="mt-20">
        <h1 className="text-lg font-bold">Similar Product</h1>
        <div className="pt-5">
            <SimilarProduct/>
        </div>
        


      </div>
    </div>
  );
};

export default ProductDetail;
