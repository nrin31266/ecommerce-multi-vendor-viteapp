


import React, { useEffect, useRef, useState } from "react";

import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { IProduct } from "../../../../../types/ProductTypes";
import { useNavigate } from "react-router-dom";
import classes from './ProductCard.module.css';
import { useAppDispatch } from "../../../../../states/store";
import { addOrRemoveProductToWishlist } from "../../../../../states/customer/wishlistSlide";

interface Props {
  product: IProduct;
}



const ProductCard = ({ product }: Props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


  useEffect(() => {
    if (isHovered) {
      intervalRef.current = setInterval(() => {

        

        setCurrentImage((prevImage) => (prevImage === product.images.length - 1) ? 0 : prevImage + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered]);

  return (
    <div
      onClick={() => navigate(`/product-details/${product.id}`)}
      className={`${classes.root} ${classes.group} relative cursor-pointer`}
    >
      <div
        className={classes.card}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {product.images.map((item, index) => (
          <img
            key={index}
            className={`${classes.cardMedia} object-top`}
            src={item}
            alt=""
            style={{
              transform: `translateX(${(index - currentImage) * 100}%)`,
            }}
          />
        ))}

        {isHovered && (
          <div className="indicator absolute left-1/2 translate-x-[-50%] bottom-[16px] flex flex-col items-center space-y-2 ">
            <div className="flex gap-3">
              <Button onClick={(e)=>{
                e.stopPropagation();
                dispatch(addOrRemoveProductToWishlist({productId: product.id}))
              }} variant="contained" color="secondary">
                <Favorite sx={{ color: "var(--primary-color)" }} />
              </Button>
              <Button color="secondary" variant="contained">
                <ModeComment sx={{ color: "var(--primary-color)" }} />
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className={`${classes.details} pt-3 space-y-1 ${classes.groupHoverEffect}`}>
        <div className={classes.shopName}>
          <h1 className="text-gray-600">
            {product.seller?.businessDetails.businessName || "Unknown"}
          </h1>
          <p className={classes.title}>{product.title}</p>
        </div>
        <div className="price flex items-center gap-3">
          <span className="font-semibold text-gray-800">
            {product.sellingPrice}
          </span>
          <span className={`${classes.thinLineThrough} text-gray-400`}>
            {product.mrpPrice}
          </span>
          <span className="text-[var(--primary-color)]">
            {product.discountPercentage + "%"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

