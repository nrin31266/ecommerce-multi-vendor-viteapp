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
import React, { useEffect, useState } from "react";
import SimilarProduct from "./components/SimilarProduct/SimilarProduct";
import ReviewCard from "../Review/components/ReviewCard/ReviewCard";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductById } from "../../../states/customer/productSlide";
import { useAppDispatch, useAppSelector } from "../../../states/store";
import { addItemToCart } from "../../../states/customer/cartSlide";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams<{ productId: string }>();
  const dispatch = useAppDispatch();
  const product = useAppSelector((store) => store.product.product);
  const [activeImage, setActiveImage] = useState(0);

  const handleActiveImage = (value: number) => {
    setActiveImage(value);
  };

  useEffect(() => {
    dispatch(fetchProductById(productId!));
  }, [productId]);

  return (
    <div className="px-5 lg:px-20 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[15%] flex flex-wrap lg:flex-col gap-3">
            {product?.images.map((item, index) => (
              <img
                
                key={index}
                onClick={() => setActiveImage(index)}
                className={`rounded-md lg:w-full w-[50px] cursor-pointer ${activeImage === index && "border-2 border-[var(--primary-color)]"}`}
                src={item}
                alt=""
              />
            ))}
          </div>
          <div className="w-full lg:w-85%">
            <img
              className="w-full rounded-md"
              src={product?.images[activeImage]}
              alt=""
            />
          </div>
        </section>
        <section>
          <h1 className="font-bold text-lg text-[var(--primary-color)]">
            {product?.seller?.businessDetails.businessName}
          </h1>
          <p className="text-gray-500 font-semibold">{product?.title}</p>
          <div className="flex justify-between items-center py-2 border border-gray-200 w-[180px] px-3 mt-5">
            <div className="flex gap-1 items-center">
              <span>4</span>
              <Star className="text-[var(--primary-color)] text-[17px]" />
            </div>
            <Divider orientation="vertical" flexItem />
            <span>234 Ratings</span>
          </div>
          <div className="price mt-5 flex items-center gap-3 text-2xl">
            <span className="font-sans text-gray-800">{product?.sellingPrice}</span>
            <span className="text-gray-400 line-through">{product?.mrpPrice}</span>
            <span className="font-semibold text-[var(--primary-color)]">
              {product?.discountPercentage}%
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
            onClick={() => {
              dispatch(addItemToCart({productId: product?.id!, quantity: quantity, size: "M"}));
            }}
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
            <p>
              {product?.description}
            </p>
          </div>
          <div className="space-y-5 mt-12">
            <ReviewCard />
            <Divider />
          </div>
        </section>
      </div>
      <div className="mt-20">
        <h1 className="text-lg font-bold">Similar Product</h1>
        <div className="pt-5">
          <SimilarProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
