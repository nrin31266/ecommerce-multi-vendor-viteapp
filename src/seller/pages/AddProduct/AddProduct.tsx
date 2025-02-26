import { Add, Close } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import ImageCard from "./components/ImageCard/ImageCard";
import { useFormik, validateYupSchema } from "formik";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { colors } from "../../../data/filter/colors";
import { mainCategories } from "../../../data/category/mainCategory";

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
    setImageSelected(imageSelected.filter((_, i) => i !== index));
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: "",
      color: "",
      image: [],
      category1: "",
      category2: "",
      category3: "",
      sizes: "",
    },
    onSubmit: (values) => {
      console.log(values);
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
            <div className="col-span-3">
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
                helperText={formik.touched.mrpPrice && formik.errors.mrpPrice}
              />
            </div>
            <div className="col-span-3">
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
            <div className="col-span-3">
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
                  <MenuItem value={""}><em>None</em></MenuItem>
                  {
                    colors.map((color, index) => (
                      <MenuItem value={color.name} key={index}>
                        <div className="flex gap-3 items-center">
                          <span>{color.name}</span>
                          <div className="w-5 h-5 rounded-full" style={{ backgroundColor: color.hex }}></div>
                        </div>
                      </MenuItem>
                    ))
                  }
                </Select>
              </FormControl>
            </div>
            <div className="col-span-3">
              <FormControl fullWidth required>
                <InputLabel id="sizes">Sizes</InputLabel>
                <Select
                  
                  name="sizes"
                  labelId="sizes"
                  id="sizes"
                  value={formik.values.sizes}
                  label="Sizes"
                  onChange={formik.handleChange}

                >
                  <MenuItem value={""}><em>None</em></MenuItem>
                 
                </Select>
              </FormControl>
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
                  onChange={formik.handleChange}

                >
                  <MenuItem value={""}><em>None</em></MenuItem>
                  {
                    mainCategories.map((category, index) => (
                      <MenuItem value={category.name} key={index}>{category.name}</MenuItem>

                    ))
                  }
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
                  <MenuItem value={""}><em>None</em></MenuItem>
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
                  <MenuItem value={""}><em>None</em></MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="mt-10">
          <Button type="submit" variant="contained" fullWidth size="large">Add Product</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
