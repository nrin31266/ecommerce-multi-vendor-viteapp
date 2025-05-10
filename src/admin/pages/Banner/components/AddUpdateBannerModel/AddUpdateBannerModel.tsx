import React, { useEffect, useState } from "react";
import {
  addBanner,
  EBannerTargetType,
  IBanner,
  IBannerRequest,
  updateBanner,
} from "../../../../../states/admin/bannerSlide";
import { useFormik } from "formik";
import {
  Box,
  Modal,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import ImageCard from "../../../../../seller/pages/AddProduct/components/ImageCard/ImageCard";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useAppDispatch, useAppSelector } from "../../../../../states/store";
import { DateUtils } from "../../../../../utils/DateTime/dateUtils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "min(600px, 98%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "4px",
};

interface Props {
  isVisible: boolean;
  onClose: () => void;
  updateItem: IBanner | null;
}

const banners = [
  { value: EBannerTargetType.SHOP, label: "Cửa hàng" },
  { value: EBannerTargetType.PRODUCT, label: "Sản phẩm" },
  { value: EBannerTargetType.CATEGORY, label: "Danh mục" },
  { value: EBannerTargetType.LINK, label: "Liên kết" },
];



const AddUpdateBannerModel = ({ isVisible, onClose, updateItem }: Props) => {
  const [imageSelected, setImageSelected] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const bannerState = useAppSelector((store) => store.adminBanner);
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageSelected(e.target.files[0]);
    }
  };

 

  const handleClose = () => {
    setImageSelected(null);
    setImageUrl(null);
    formik.resetForm();
    onClose();
  };

  const formik = useFormik<IBannerRequest>({
    initialValues: {
      imageUrl: updateItem?.imageUrl || "",
      title: updateItem?.title || "",
      targetType: updateItem?.targetType || EBannerTargetType.CATEGORY,
      target: updateItem?.target || "",
      active: updateItem?.active ?? true,
      startDate: updateItem?.startDate || "",
      endDate: updateItem?.endDate || "",
    },
    onSubmit: async (values) => {
      console.log(values);

      if (updateItem) {
        if (updateItem.imageUrl) {
          values.imageUrl = updateItem.imageUrl;
        } 
        await dispatch(updateBanner({ rq: values, id: updateItem.id, imageFile: imageSelected }));
      } else {
        await dispatch(addBanner({ rq: values, imageFile: imageSelected }));
      }
      handleClose();
    },
  });

  useEffect(() => {
    if (updateItem) {
      setImageSelected(null);
      setImageUrl(updateItem.imageUrl);
      formik.setFieldValue("title", updateItem.title);
      formik.setFieldValue("targetType", updateItem.targetType);
      formik.setFieldValue("target", updateItem.target);
      formik.setFieldValue("active", updateItem.active);
      formik.setFieldValue(
        "startDate",
        updateItem.startDate
      );
      formik.setFieldValue("endDate", updateItem.endDate);
    }
  }, [updateItem]);

  return (
    <Modal open={isVisible} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6">
          {updateItem ? "Update" : "Add"} banner
        </Typography>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={handleSelectImage}
        />
        <form className="mt-5" onSubmit={formik.handleSubmit}>
          <div className="flex gap-2 flex-wrap">
            <img
              src={
                imageSelected
                  ? URL.createObjectURL(imageSelected)
                  : imageUrl
                  ? imageUrl
                  : "https://scr.vn/wp-content/uploads/2020/07/n%E1%BB%81n-tr%E1%BA%AFng-full.jpg"
              }
              alt=""
              className="h-[200px] w-[400px] object-contain border border-gray-400"
            />

            <label htmlFor="fileInput">
              <div className="flex items-center justify-center w-24 h-24 border border-dashed border-gray-400 rounded-md cursor-pointer">
                <AddPhotoAlternateIcon />
              </div>
            </label>
          </div>

          <div className="my-5 grid grid-cols-12 gap-5">
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
              <FormControl fullWidth required>
                <InputLabel id="targetType">Target Type</InputLabel>
                <Select
                  labelId="targetType"
                  name="targetType"
                  value={formik.values.targetType}
                  label="Target Type"
                  onChange={formik.handleChange}
                >
                  {banners.map((b) => (
                    <MenuItem key={b.value} value={b.value}>
                      {b.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-12">
              <TextField
                required
                fullWidth
                name="target"
                label="Target"
                value={formik.values.target}
                onChange={formik.handleChange}
              />
              <div className="text-sm text-gray-500 mt-2">
                <p>Link: https://www.google.com</p>
                <p>Category: "books,beds"</p>
                <p>Product: "1"</p>
                <p>Shop: "1"</p>
              </div>
            </div>
            <div className="col-span-6">
              <TextField
                required
                fullWidth
                type="datetime-local"
                name="startDate"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.startDate}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-span-6">
              <TextField
                required
                fullWidth
                type="datetime-local"
                name="endDate"
                label="End Date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.endDate}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-span-12">
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.active}
                    onChange={(e) =>
                      formik.setFieldValue("active", e.target.checked)
                    }
                    name="active"
                    color="primary"
                  />
                }
                label="Active"
              />
            </div>
          </div>
          <Button
            loading={bannerState.actionLoading}
            disabled={bannerState.actionLoading}
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

export default AddUpdateBannerModel;
