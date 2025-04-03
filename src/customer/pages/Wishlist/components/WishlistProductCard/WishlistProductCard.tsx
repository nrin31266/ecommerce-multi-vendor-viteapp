import React from "react";
import { IProduct } from "../../../../../types/ProductTypes";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Close, Remove } from "@mui/icons-material";
import { useAppDispatch } from "../../../../../states/store";
import { addOrRemoveProductToWishlist } from "../../../../../states/customer/wishlistSlide";

const WishlistProductCard = ({ item }: { item: IProduct }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div
      className="w-60 relative cursor-pointer "
      onClick={() => navigate(`/product-details/${item.id}`)}
    >
      <div className="w-full">
        <img
          src={item.images[0]}
          className="w-full object-cover object-top"
          alt=""
        />
      </div>
      <div className="pt-3 space-y-1 ">
        <p>{item.title}</p>
        <div className="price flex items-center gap-3">
          <span className="font-semibold text-gray-800">
            {item.sellingPrice}
          </span>
          <span className={`line-through text-gray-400`}>{item.mrpPrice}</span>
          <span className="text-[var(--primary-color)]">
            {item.discountPercentage + "%"}
          </span>
        </div>
      </div>
      <div className="absolute top-2 right-2 rounded-4xl ">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addOrRemoveProductToWishlist({ productId: item.id }));
          }}
        >
          <Close color="error" />
        </IconButton>
      </div>
    </div>
  );
};

export default WishlistProductCard;
