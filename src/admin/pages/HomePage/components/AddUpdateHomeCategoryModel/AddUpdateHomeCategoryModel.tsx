import React, { useEffect, useState } from "react";
import {
  addHomeCategory,
  EHomeCategorySection,
  IHomeCategory,
  updateHomeCategory,
} from "../../../../../states/admin/homeCategorySlide";
import { useAppDispatch, useAppSelector } from "../../../../../states/store";
import { useFormik, validateYupSchema } from "formik";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ImageCard from "../../../../../seller/pages/AddProduct/components/ImageCard/ImageCard";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Modal from "@mui/material/Modal";
import { menLevelTwo } from "../../../../../data/category/menLevelTwo";
import { womenLevelTwo } from "../../../../../data/category/womenLevelTwo";
import { homeFurnitureLevelTwo } from "../../../../../data/category/homeFurnitureLevelTwo";
import { electronicsLevelTwo } from "../../../../../data/category/electronicsLevelTwo";
import { ICategory } from "../../../../../types/ProductTypes";
import { menLevelThree } from "../../../../../data/category/menCategoryLevelThree";
import { womenLevelThree } from "../../../../../data/category/womenLevelThree";
import { homeFurnitureLevelThree } from "../../../../../data/category/homeFurnitureLevelThree";
import { electronicsLevelThree } from "../../../../../data/category/electronicsLevelThree";
import { mainCategories } from "../../../../../data/category/mainCategory";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(600px, 98%)",
  bgcolor: "background.paper",
  // border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "4px",
};

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

interface IAddUpdateHomeCategoryModelProps {
  isVisible: boolean;
  onClose: () => void;
  updateItem: IHomeCategory | null;
}

export interface IHomeCategoryRequest {
  name: string;
  image: string;
  categoryId: string;
  homeCategorySection: EHomeCategorySection;
  category1: string;
  category2: string;
}
const homeCategories = [
  {
    label: "Electronics",
    section: EHomeCategorySection.ELECTRIC_CATEGORY,
  },
  {
    label: "Men",
    section: EHomeCategorySection.MEN_CATEGORY,
  },
  {
    label: "Women",
    section: EHomeCategorySection.WOMEN_CATEGORY,
  },
  {
    label: "Home & Furniture",
    section: EHomeCategorySection.HOME_FURNITURE_CATEGORY,
  },
];

const AddUpdateHomeCategoryModel = ({
  isVisible,
  onClose,
  updateItem,
}: IAddUpdateHomeCategoryModelProps) => {
  const [imageSelected, setImageSelected] = useState<File | null>();
  const [imageUrl, setImageUrl] = useState<string | null>(); // ảnh cũ dạng URL
  const homeCategory = useAppSelector((state) => state.homeCategory);
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageSelected(e.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setImageSelected(null);
  };

  const handleClose = () => {
    setImageSelected(null);
      setImageUrl("");
      formik.resetForm(); 
    onClose();
  };
  const dispatch = useAppDispatch();

  const formik = useFormik<IHomeCategoryRequest>({
    initialValues: {
      name: "",
      image: "",
      categoryId: "",
      homeCategorySection: updateItem
        ? updateItem.homeCategorySection
        : EHomeCategorySection.ELECTRIC_CATEGORY,
      category1: "",
      category2: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      if(updateItem){
        await dispatch(updateHomeCategory({id: updateItem.id, rq: values, imageFile: imageSelected}))
      }else{
        await dispatch(addHomeCategory({rq: values, imageFile: imageSelected}))
      }
      handleClose();
    },
    validationSchema: null,
  });

  useEffect(() => {
    if (updateItem) {
      setImageSelected(null);
      setImageUrl(updateItem.image);
      formik.setFieldValue("name", updateItem.name);
      formik.setFieldValue("homeCategorySection", updateItem.homeCategorySection);
      formik.setFieldValue("categoryId", updateItem.categoryId);
      formik.setFieldValue("category1", updateItem.category1);
      formik.setFieldValue("category2", updateItem.category2);
    } 
  }, [updateItem]);
  

  return (
    <Modal
      open={isVisible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {updateItem ? "Update" : "Add"} Home Category
        </Typography>

        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            handleSelectImage(e);
          }}
        />
        <form className="mt-5" onSubmit={formik.handleSubmit}>
          <div className="flex gap-2 flex-wrap">
            {imageUrl ? (
              <ImageCard
                onRemove={() => {
                  setImageUrl(null);
                }}
                item={imageUrl}
              />
            ) : imageSelected ? (
              <ImageCard
                onRemove={() => handleRemoveImage()}
                item={imageSelected}
              />
            ) : (
              <label htmlFor="fileInput">
                <div className="flex gap-2 items-center justify-center w-24 h-24 border border-dashed border-gray-400 rounded-md cursor-pointer">
                  <div>
                    <AddPhotoAlternateIcon />
                  </div>
                </div>
              </label>
            )}
          </div>
          <div className="my-5 grid grid-cols-12 gap-5">
            <div className="col-span-12">
              <TextField
                required
                fullWidth
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </div>
            <div className="col-span-12">
              <FormControl fullWidth required>
                <InputLabel id="homeCategorySection">
                  Home category section
                </InputLabel>
                <Select
                  name="homeCategorySection"
                  labelId="homeCategorySection"
                  id="homeCategorySection"
                  value={formik.values.homeCategorySection}
                  label="Home category section"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                  {homeCategories.map((item) => (
                    <MenuItem key={item.label} value={item.section}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-12">
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
            <div className="col-span-12">
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
            <div className="col-span-12">
              <FormControl fullWidth required>
                <InputLabel id="categoryId">Third Category</InputLabel>
                <Select
                  name="categoryId"
                  labelId="categoryId"
                  id="categoryId"
                  value={formik.values.categoryId}
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
          <Button
            loading={homeCategory.loading}
            disabled={homeCategory.loading}
            type="submit"
            fullWidth
            variant="contained"
            size="large"
          >
            {updateItem ? "Update" : "Create"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddUpdateHomeCategoryModel;
