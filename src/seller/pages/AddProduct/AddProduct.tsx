import { Add, Close, Delete, ImageSearch } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ImageCard from "./components/ImageCard/ImageCard";
import { useFormik, validateYupSchema } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { colors } from "../../../data/filter/colors";
import { mainCategories } from "../../../data/category/mainCategory";
import { useAppDispatch, useAppSelector } from "../../../states/store";
import { createProduct } from "../../../states/seller/sellerProductSlide";

import { menLevelTwo } from "../../../data/category/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/womenLevelTwo";
import { homeFurnitureLevelTwo } from "../../../data/category/homeFurnitureLevelTwo";
import { electronicsLevelTwo } from "../../../data/category/electronicsLevelTwo";
import { menLevelThree } from "../../../data/category/menCategoryLevelThree";
import { womenLevelThree } from "../../../data/category/womenLevelThree";
import { homeFurnitureLevelThree } from "../../../data/category/homeFurnitureLevelThree";
import { electronicsLevelThree } from "../../../data/category/electronicsLevelThree";
import { ICategory } from "../../../types/ProductTypes";
const label = { inputProps: { "aria-label": "Single Product?" } };
const categoriesLevelTwo: { [key: string]: ICategory[] } = {
  men: menLevelTwo,
  women: womenLevelTwo,
  home_furniture: homeFurnitureLevelTwo,
  electronics: electronicsLevelTwo,
};

const categoriesLevelThree: { [key: string]: ICategory[] } = {
  men: menLevelThree,
  women: womenLevelThree,
  home_furniture: homeFurnitureLevelThree,
  electronics: electronicsLevelThree,
};
export interface ICreateProductReq {
  title: string;
  description: string;
  images: string[];
  category1: string;
  category2: string;
  category3: string;
  optionsTypes: string[];
  optionKey: null | string;
  isSubProduct: boolean;
  quantity: number;
  mrpPrice: number;
  sellingPrice: number;
}
const AddProduct = () => {
  const [imageSelected, setImageSelected] = useState<File[]>([]);

  const dispatch = useAppDispatch();
  const sellerProduct = useAppSelector((store) => store.sellerProduct);
  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageSelected((prev) => [...prev, ...e.target.files!]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageSelected(imageSelected.filter((_, i) => i !== index));
  };

  const formik = useFormik<ICreateProductReq>({
    initialValues: {
      title: "",
      description: "",
      images: [],
      category1: "",
      category2: "",
      category3: "",
      optionsTypes: ["Color"],
      optionKey: "",
      isSubProduct: false,
      quantity: 0,
      mrpPrice: 0,
      sellingPrice: 0,
    },
    onSubmit: async (values) => {
      console.log(values);
      await dispatch(
        createProduct({ request: values, imageFiles: imageSelected })
      );
    },
    validationSchema: null,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
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
          <div className="grid grid-cols-12 gap-5 mt-5">
            <div className="col-span-12">
              <TextField
                required
                fullWidth
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </div>
            <div className="col-span-12">
              <TextField
                multiline
                rows={4}
                required
                fullWidth
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </div>

            {/* <div className="col-span-3">
              <FormControl fullWidth required>
                <InputLabel id="color">Color</InputLabel>
                <Select
                  name="color"
                  labelId="color"
                  id="color"
                  value={formik.values.color}
                  label="Color"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  {colors.map((color, index) => (
                    <MenuItem value={color.hex} key={index}>
                      <div className="flex gap-3 items-center">
                        <span>{color.name}</span>
                        <div
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-3">
            <TextField
                type="text"
                required
                fullWidth
                name="sizes"
                label="Sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
                error={
                  formik.touched.sizes &&
                  Boolean(formik.errors.sizes)
                }
                helperText={
                  formik.touched.sizes && formik.errors.sizes
                }
              />
            </div> */}
            <div className="col-span-4">
              <FormControl fullWidth required>
                <InputLabel id="category1">Category</InputLabel>
                <Select
                  name="category1"
                  labelId="category1"
                  id="category1"
                  value={formik.values.category1}
                  label="Category"
                  onChange={(e) => {
                    formik.handleChange(e);
                  }}
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  {mainCategories.map((category, index) => (
                    <MenuItem value={category.categoryId} key={index}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-4">
              <FormControl fullWidth required>
                <InputLabel id="category2">Second Category</InputLabel>
                <Select
                  name="category2"
                  labelId="category2"
                  id="category2"
                  value={formik.values.category2}
                  label="Second Category"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  {categoriesLevelTwo[formik.values.category1]?.map(
                    (category, index) => (
                      <MenuItem value={category.categoryId} key={index}>
                        {category.name}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-4">
              <FormControl fullWidth required>
                <InputLabel id="category3">Third Category</InputLabel>
                <Select
                  name="category3"
                  labelId="category3"
                  id="category3"
                  value={formik.values.category3}
                  label="Third Category"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  {categoriesLevelThree[formik.values.category1]?.map(
                    (category, index) => {
                      if (
                        formik.values.category2 &&
                        category.parentCategory === formik.values.category2
                      )
                        return (
                          <MenuItem value={category.categoryId} key={index}>
                            {category.name}
                          </MenuItem>
                        );
                    }
                  )}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="mt-5">
            <span>Single Product? </span>
            <Switch
              name="isSubProduct"
              {...label}
              value={formik.values}
              onChange={(e) => {
                formik.handleChange(e);
              }}
            />
          </div>
          <div className="grid gap-5 grid-cols-12 mt-4">
            {formik.values.isSubProduct ? (
              <>
                <div className="col-span-12">
                  <TextField
                    type="number"
                    required
                    fullWidth
                    name="mrpPrice"
                    label="Mrp Price"
                    value={formik.values.mrpPrice}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.mrpPrice && Boolean(formik.errors.mrpPrice)
                    }
                    helperText={
                      formik.touched.mrpPrice && formik.errors.mrpPrice
                    }
                  />
                </div>
                <div className="col-span-12">
                  <TextField
                    type="number"
                    required
                    fullWidth
                    name="sellingPrice"
                    label="Selling Price"
                    value={formik.values.sellingPrice}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.sellingPrice &&
                      Boolean(formik.errors.sellingPrice)
                    }
                    helperText={
                      formik.touched.sellingPrice && formik.errors.sellingPrice
                    }
                  />
                </div>
                <div className="col-span-12">
                  <TextField
                    type="number"
                    required
                    fullWidth
                    name="quantity"
                    label="Quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.quantity && Boolean(formik.errors.quantity)
                    }
                    helperText={
                      formik.touched.quantity && formik.errors.quantity
                    }
                  />
                </div>
              </>
            ) : (
              <div className="col-span-12 space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Options Types</h2>
                  <div className="flex flex-wrap gap-4">
                    <FormControl sx={{minWidth: "150px"}} >
                      <InputLabel id="optionKey">Option Key</InputLabel>
                      <Select
                        name="optionKey"
                        labelId="optionKey"
                        id="optionKey"
                        value={formik.values.optionKey}
                        label="Option Key"
                        onChange={(e) => {
                          formik.handleChange(e);
                        }}
                      >
                        <MenuItem value={""}>
                          <em>None</em>
                        </MenuItem>
                        {formik.values.optionsTypes.map((optionType, index) => (
                          <MenuItem value={optionType} key={index}>
                            {optionType}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div>
                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={() => {
                        formik.setFieldValue("optionsTypes", [
                          ...formik.values.optionsTypes,
                          "",
                        ]);
                      }}
                    >
                      Thêm
                    </Button>
                    </div>
                  </div>
                </div>

                {formik.values.optionsTypes.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <TextField
                      required
                      fullWidth
                      label={`Option ${index + 1}`}
                      name={`optionsTypes[${index}]`}
                      value={formik.values.optionsTypes[index]}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.optionsTypes &&
                        Boolean(formik.errors.optionsTypes?.[index])
                      }
                      helperText={
                        formik.touched.optionsTypes &&
                        formik.errors.optionsTypes?.[index]
                      }
                    />
                    <IconButton
                      color="error"
                      onClick={() => {
                        if (formik.values.optionsTypes.length <= 1) return;
                        const newOptions = [...formik.values.optionsTypes];
                        newOptions.splice(index, 1);
                        formik.setFieldValue("optionsTypes", newOptions);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-10">
            <Button
              disabled={sellerProduct.loading}
              type="submit"
              variant="contained"
              fullWidth
              size="large"
            >
              {sellerProduct.loading ? "Adding Product..." : "Add Product"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
