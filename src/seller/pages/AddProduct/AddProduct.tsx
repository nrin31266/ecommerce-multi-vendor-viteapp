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
import React, { useEffect, useRef, useState } from "react";
import ImageCard from "./components/ImageCard/ImageCard";
import { useFormik, validateYupSchema } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { colors } from "../../../data/filter/colors";
import { mainCategories } from "../../../data/category/mainCategory";
import { useAppDispatch, useAppSelector } from "../../../states/store";
import { clearCurrentProduct, createProduct, updateProduct } from "../../../states/seller/sellerProductSlide";

import { menLevelTwo } from "../../../data/category/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/womenLevelTwo";
import { homeFurnitureLevelTwo } from "../../../data/category/homeFurnitureLevelTwo";
import { electronicsLevelTwo } from "../../../data/category/electronicsLevelTwo";
import { menLevelThree } from "../../../data/category/menCategoryLevelThree";
import { womenLevelThree } from "../../../data/category/womenLevelThree";
import { homeFurnitureLevelThree } from "../../../data/category/homeFurnitureLevelThree";
import { electronicsLevelThree } from "../../../data/category/electronicsLevelThree";
import { ICategory, ISubProduct } from "../../../types/ProductTypes";
import { useNavigate, useParams } from "react-router-dom";
import sellerProductSlice from './../../../states/seller/sellerProductSlide';
import { getAllCategories } from "../../../states/admin/categorySlide";
import { current } from "@reduxjs/toolkit";
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
  const {productId} = useParams();

  const dispatch = useAppDispatch();
  const sellerProduct = useAppSelector((store) => store.sellerProduct);
  const sellerProductState = useAppSelector((store) => store.sellerProduct);
  const categoryState = useAppSelector((store) => store.adminCategory);
  const [imageSelected, setImageSelected] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const hasInitSetForm = useRef(false);
  
  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageSelected((prev) => [...prev, ...e.target.files!]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageSelected(imageSelected.filter((_, i) => i !== index));
  };
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

useEffect(() => {
  // Khi productId đã có (khác -1), và dữ liệu category đã sẵn sàng
  if (
    productId &&
    productId !== "-1" &&
    sellerProductState.currentProduct &&
    categoryState.data !== null &&
    categoryState.data.two.length > 0 // <- Kiểm tra chắc chắn có data
    && !hasInitSetForm.current
  ) {
    console.log("currentProduct", sellerProductState.currentProduct);
    const currentProduct = sellerProductState.currentProduct!!;
    setImageUrls(currentProduct.images??[]);
    setImageSelected([]);

    formik.setFieldValue("title", currentProduct.title);
    formik.setFieldValue("description", currentProduct.description);
    formik.setFieldValue("category3", currentProduct.category.categoryId);
    formik.setFieldValue("category2", currentProduct.category.parentCategory);

    const findCategory2 = categoryState.data.two.find(
      (item) => item.categoryId === currentProduct.category.parentCategory
    );

    if (findCategory2) {
      formik.setFieldValue("category1", findCategory2.parentCategory);
    }
    const isSubProduct = !!currentProduct.isSubProduct
    formik.setFieldValue("isSubProduct", isSubProduct);
    if(isSubProduct){
      const subProduct: ISubProduct = currentProduct.subProducts[0];
      formik.setFieldValue("quantity", subProduct.quantity);
      formik.setFieldValue("mrpPrice", subProduct.mrpPrice);
      formik.setFieldValue("sellingPrice", subProduct.sellingPrice);
    }else{
      formik.setFieldValue("optionKey", currentProduct.optionKey);
      const optionsTypes = currentProduct.optionsTypes.map((item) => item.value);
      formik.setFieldValue("optionsTypes", optionsTypes);
    }
    hasInitSetForm.current = true;
  } else if (productId === "-1") {
    dispatch(clearCurrentProduct());
    formik.resetForm();
  }
}, [productId, categoryState.data, sellerProductState.currentProduct, dispatch]);


  const navigate = useNavigate();
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
      isSubProduct: true,
      quantity: 0,
      mrpPrice: 0,
      sellingPrice: 0,
    },
    onSubmit: async (values) => {
      console.log(values);
      if(sellerProductState.currentProduct){
        values.images = imageUrls;
        await dispatch(
          updateProduct({
            id: sellerProductState.currentProduct.id,
            imageFiles: imageSelected,
            request: values,})
        ).unwrap();
      }else{
        await dispatch(
          createProduct({ request: values, imageFiles: imageSelected })
        ).unwrap();
      }
      navigate("/seller/products");
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
            {imageUrls.length > 0 &&
              imageUrls.map((item, index) => (
                <ImageCard
                  onRemove={() => {
                    setImageUrls(imageUrls.filter((_, i) => i !== index));
                  }}
                  item={item}
                  key={index}
                />
              ))}
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
                  {categoryState.data?.one.map((category, index) => (
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
                  {categoryState.data?.m2[formik.values.category1]?.map(
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
                  {categoryState.data?.m3bym1[formik.values.category1]?.map(
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
              checked={formik.values.isSubProduct}
              onChange={(e) => {
                formik.handleChange(e);
              }}
              disabled={sellerProductState.currentProduct? true : false}
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
                      disabled= {sellerProductState.currentProduct? true : false}
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
                      disabled= {sellerProductState.currentProduct? true : false}
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
              disabled={sellerProduct.isCreateOrUpdateSubproductLoading}
              loading={sellerProduct.isCreateOrUpdateSubproductLoading}
              type="submit"
              variant="contained"
              fullWidth
              size="large"
            >
              {sellerProduct.currentProduct ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
