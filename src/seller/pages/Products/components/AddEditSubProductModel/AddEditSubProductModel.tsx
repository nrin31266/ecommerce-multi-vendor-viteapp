import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  ICreateSubProductReq,
  IProduct,
  ISubProduct,
} from "../../../../../types/ProductTypes";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import ImageCard from "../../../AddProduct/components/ImageCard/ImageCard";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../../states/store";

import {
  addSubProduct,
  updateSubProduct,
} from "../../../../../states/seller/sellerProductSlide";
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

interface IAddEditSubProductModelProps {
  isVisible: boolean;
  onClose: () => void;
  product: IProduct;
  updateItem: ISubProduct | null;
}

const AddEditSubProductModel = ({
  isVisible,
  onClose,
  product,
  updateItem,
}: IAddEditSubProductModelProps) => {
  const [imageSelected, setImageSelected] = useState<File[]>([]);
  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageSelected((prev) => [...prev, ...e.target.files!]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageSelected(imageSelected.filter((_, i) => i !== index));
  };
  const sellerProductSate = useAppSelector((store) => store.sellerProduct);
  const handleClose = () => {
    onClose();
  };
  const dispatch = useAppDispatch();

  const productOptions: Record<string, string> = {};
  product.optionsTypes.forEach((optionType) => {
    productOptions[optionType.value] = "";
  });

  const formik = useFormik<ICreateSubProductReq>({
    initialValues: {
      images: [],
      quantity: 100,
      mrpPrice: product.maxMrpPrice ?? 0,
      sellingPrice: product.minSellingPrice ?? 0,
      options: productOptions,
    },
    onSubmit: async (values) => {
      if (updateItem) {
        if (imageSelected.length + imageUrls.length < 1) {
          return;
        }
        values.images = imageUrls;
        await dispatch(
          updateSubProduct({
            id: updateItem.id,
            rq: values,
            imageFiles: imageSelected,
            productId: product.id,
          })
        )
          .unwrap()
          .then(() => {
            handleClose();
          });
      } else {
        if (imageSelected.length < 1) {
          return;
        }
        await dispatch(
          addSubProduct({
            id: product.id,
            rq: values,
            imageFiles: imageSelected,
          })
        )
          .unwrap()
          .then(() => {
            handleClose();
          });
      }
    },
    validationSchema: null,
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]); // ảnh cũ dạng URL
  useEffect(() => {
    if (updateItem) {
      console.log("Update");
      setImageUrls(updateItem.images ?? []); // giả sử updateItem.images là string[]
      setImageSelected([]); // clear file khi vào edit

      const convertedOptions: Record<string, string> = {};
      updateItem.options.forEach((option) => {
        convertedOptions[option.optionType.value] = option.optionValue;
      });

      formik.setValues({
        images: [],
        quantity: updateItem.quantity,
        mrpPrice: updateItem.mrpPrice,
        sellingPrice: updateItem.sellingPrice,
        options: convertedOptions,
      });

      // Nếu muốn hiển thị ảnh cũ (từ URL), cần xử lý riêng (optional)
      // setImagePreviewUrls(updateItem.images);  // nếu bạn có
    } else {
      setImageUrls([]);
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
          <span className="font-bold text-[var(--primary-color)]">
            {updateItem ? "Edit" : "Add"}{" "}
          </span>{" "}
          Sub Product To{" "}
          {product.title.length > 20
            ? product.title.slice(0, 20) + "..."
            : product.title}
        </Typography>
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
        <form className="mt-5" onSubmit={formik.handleSubmit}>
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
          <div className="my-5 grid grid-cols-12 gap-5">
            <div className="col-span-4">
              <TextField
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
            <div className="col-span-4">
              <TextField
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
            <div className="col-span-4">
              <TextField
                required
                fullWidth
                name="quantity"
                label="Quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
            </div>
            {product.optionsTypes.map((item, index) => (
              <div key={index} className="col-span-12">
                <TextField
                  fullWidth
                  required
                  className="mb-3"
                  label={item.value}
                  name={`options.${item.value}`}
                  value={formik.values.options[item.value] || ""}
                  onChange={formik.handleChange}
                />
              </div>
            ))}
          </div>
          <Button
            loading={sellerProductSate.isCreateOrUpdateSubproductLoading}
            disabled={sellerProductSate.isCreateOrUpdateSubproductLoading}
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

export default AddEditSubProductModel;
