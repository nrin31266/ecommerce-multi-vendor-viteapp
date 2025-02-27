import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";

const CreateDealForm = () => {
  const formik = useFormik({
    initialValues: {
      discount: 0,
      category: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <h1 className="text-2xl font-semibold text-[var(--primary-color)] text-center">
          Create Deal
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-5 grid-cols-12 mt-10 min-w-[500px]">
            <div className="col-span-12">
              <TextField
                type="number"
                fullWidth
                required
                name="discount"
                label="Discount"
                value={formik.values.discount}
                onChange={formik.handleChange}
                error={
                  formik.touched.discount && Boolean(formik.errors.discount)
                }
                helperText={
                  formik.touched.discount && Boolean(formik.errors.discount)
                }
              />
            </div>
            <div className="col-span-12">
              <FormControl required fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="category"
                  id="demo-simple-select"
                  value={formik.values.category}
                  label="Category"
                  onChange={formik.handleChange}
                >
                  <MenuItem value={""}>
                    <em>None</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="mt-10">
            <Button variant="contained" fullWidth size="large" type="submit">
              Create Deal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateDealForm;
