import React, { useEffect, useRef, useState } from "react";
import "./ProductCard.css";
import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";
import { teal } from "@mui/material/colors";
import { Product } from "../../../../../types/ProductTypes";
import { useNavigate } from "react-router-dom";

// const images = [
//   "https://handcmediastorage.blob.core.windows.net/productimages/CO/COPRA154-G01-126836-1400px-1820px.jpg",
//   "https://i5.walmartimages.com/asr/4176a666-373c-4ecb-8b9b-20accd120fdf_1.f00d9ff653674eb5789b4ffb62877b6d.jpeg",
//   "https://cdnc.lystit.com/photos/6ac9-2016/03/04/boss-hugo-boss-navy-solid-two-piece-wool-travel-suit-blue-product-0-152902930-normal.jpeg",
// ];

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

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
      className="group px-4 relative cursor-pointer"
    >
      <div
        className="card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {product.images.map((item, index) => (
          <img
            key={index}
            className="card-media object-top"
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
              <Button variant="contained" color="secondary">
                <Favorite sx={{ color: "var(--primary-color)" }} />
              </Button>
              <Button color="secondary" variant="contained">
                <ModeComment sx={{ color: "var(--primary-color)" }} />
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
        <div className="name">
          <h1 className="text-gray-600">
            {product.seller?.businessDetails.businessName || "Unknown"}
          </h1>
          <p>{product.title}</p>
        </div>
        <div className="price flex items-center gap-3">
          <span className="font-semibold text-gray-800">
            {product.sellingPrice}
          </span>
          <span className="thin-line-though text-gray-400">
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
