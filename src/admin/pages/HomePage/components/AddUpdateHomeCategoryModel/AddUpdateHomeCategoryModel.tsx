import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import ImageCard from "../../../../../seller/pages/AddProduct/components/ImageCard/ImageCard";
import {
  addHomeCategory,
  EHomeCategorySection,
  IHomeCategory,
  updateHomeCategory
} from "../../../../../states/admin/homeCategorySlide";
import { useAppDispatch, useAppSelector } from "../../../../../states/store";
import { ICategory } from "../../../../../types/ProductTypes";
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

interface IAddUpdateHomeCategoryModelProps {
  isVisible: boolean;
  onClose: () => void;
  updateItem: IHomeCategory | null;
}

export interface IHomeCategoryRequest {
  name: string;
  image: string;
  homeCategorySection: EHomeCategorySection | "";
  categoryIds: string[];
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
  const categoryState = useAppSelector((state) => state.adminCategory);
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
      homeCategorySection: "",
      categoryIds: [],
    },
    onSubmit: async (values) => {
      console.log(values);
      if (updateItem) {
        if(imageUrl){
          values.image = imageUrl;
        }
        await dispatch(
        
          updateHomeCategory({
            id: updateItem.id,
            rq: values,
            imageFile: imageSelected,
          })
        );
      } else {
        await dispatch(
          addHomeCategory({ rq: values, imageFile: imageSelected })
        );
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
      formik.setFieldValue(
        "homeCategorySection",
        updateItem.homeCategorySection
      );
      formik.setFieldValue(
        "categoryIds",
        updateItem.categoryIds.split(",") // Tách chuỗi thành mảng
      );
      
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
              
                <Autocomplete
                  disabled={categoryState.loading}
                  multiple
                  options={categoryState.data?.three??[]}
                  getOptionLabel={(option) => option.name}
                  value={categoryState.data?.three.filter((category: ICategory) =>
                    formik.values.categoryIds.includes(category.categoryId)
                  )}
                  onChange={(event, newValue) =>
                    formik.setFieldValue(
                      "categoryIds",
                      newValue.map((item: ICategory) => item.categoryId)
                    )
                  }
                  filterOptions={(options, { inputValue }) => {
                    const lowerInput = inputValue.toLowerCase();
                    return options.filter(
                      (option) =>
                        option.name.toLowerCase().includes(lowerInput) ||
                        option.parentCategory.toLowerCase().includes(lowerInput)
                    );
                  }}
                  renderInput={(params) => (
                    <TextField
                    
                      {...params}
                      label="Select multi categories"
                      placeholder="Search categories..."
                    />
                  )}
                  renderOption={(props, option: ICategory) => (
                    <li {...props} key={option.categoryId}>
                      {option.name}{" "}
                      <span className="text-gray-500">({option.parentCategory})</span>
                    </li>
                  )}
                  
                />
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
