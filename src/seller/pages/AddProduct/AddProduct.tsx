import { Add, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import ImageCard from "./components/ImageCard/ImageCard";
import { useFormik, validateYupSchema } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const AddProduct = () => {
  const [imageSelected, setImageSelected] = useState<File[]>([]);

  console.log(imageSelected);

  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imageSelected.length > 0) {
      setImageSelected([...imageSelected, ...e.target.files!]);
    } else {
      setImageSelected([...e.target.files!]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageSelected(
      imageSelected.slice(0, index).concat(imageSelected.slice(index + 1))
    );
  };

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: null,
  });

  return (
    <div>
      <form action="">
        <div>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="images/*"
            multiple
            onChange={(e) => {
              handleSelectImages(e);
            }}
          />
          <div className="flex gap-2 flex-wrap">
            {imageSelected.length > 0 &&
              imageSelected.map((item, index) => (
                <ImageCard
                  onRemove={() => handleRemoveImage(index)}
                  item={item}
                  key={index}
                />
              ))}
            <label htmlFor="fileInput">
              <div className="flex gap-2 items-center justify-center w-24 h-24 border border-dashed border-gray-400 rounded-md cursor-pointer">
                <div>
                  <AddPhotoAlternateIcon />
                </div>
              </div>
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
