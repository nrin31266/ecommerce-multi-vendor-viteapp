import { Close } from "@mui/icons-material";
import React, { useState } from "react";

const ImageCard = ({item, onRemove}: {item: File | string, onRemove: () => void}) => {
    const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-24 w-24 p-1 border border-gray-400 rounded-md cursor-pointer "
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <img
        src={
          typeof item === "string"
            ? item
            : URL.createObjectURL(item)
        }
        alt=""
        className="w-full h-full object-cover"
      />
      <button
      onClick={(e)=>{
        e.stopPropagation();
        e.preventDefault();
        onRemove();
      }}
        className={`${
          // isHovered ? "flex" : "hidden"
          'flex'
        } items-center justify-center border rounded-[100%] border-gray-200 top-0 right-0 absolute cursor-pointer`}
      >
        <Close
          sx={{
            fontSize: 16,
            bgcolor: "red",
            borderRadius: "100%",
            padding: "1px",
          }}
          className="text-white font-bold"
        />
      </button>
    </div>
  );
};

export default ImageCard;
