import { useFormik } from "formik";
import React from "react";
import { FormikProps } from "formik";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";

interface CouponModel {
  code: string;
  discountValue: number;
  validityStartDate: Dayjs | null;
  validityEndDate: Dayjs | null;
  minimumOrderValue: number;
  isActive: boolean;
  couponType: string;
}

const couponTypes = [
  {
    value: "PERCENTAGE",
    label: "Percentage",
  },
  {
    value: "PERMANENT",
    label: "Permanent",
  },
];

const AddNewCoupon = () => {
  const formik = useFormik<CouponModel>({
    initialValues: {
      code: "",
      discountValue: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0,
      isActive: false,
      couponType: "",
    },
    onSubmit: (values) => {
      console.log(values);
      const formatValues = {
        ...values,
        validityStartDate: values.validityStartDate?.toISOString(),
        validityEndDate: values.validityEndDate?.toISOString(),
      };
      console.log(formatValues);
    },
  });

  return (
    <div>
      <h1 className="text-2xl text-center font-semibold mb-10 text-[var(--primary-color)]">Create New Coupon</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12">
            <TextField
              required
              fullWidth
              name="code"
              label="Code"
              value={formik.values.code}
              onChange={formik.handleChange}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />
          </div>
          <div className="col-span-12">
            <TextField
              type="number"
              fullWidth
              required
              name="discountValue"
              label="Discount Value"
              value={formik.values.discountValue}
              onChange={formik.handleChange}
              error={
                formik.touched.discountValue &&
                Boolean(formik.errors.discountValue)
              }
              helperText={
                formik.touched.discountValue && formik.errors.discountValue
              }
            />
          </div>
          <div className="col-span-12">
            <TextField
              type="number"
              fullWidth
              required
              name="minimumOrderValue"
              label="Minimum Order Value"
              value={formik.values.minimumOrderValue}
              onChange={formik.handleChange}
              error={
                formik.touched.minimumOrderValue &&
                Boolean(formik.errors.minimumOrderValue)
              }
              helperText={
                formik.touched.minimumOrderValue &&
                formik.errors.minimumOrderValue
              }
            />
          </div>
          <div className="col-span-12">
            <FormControl fullWidth required>
              <InputLabel id="couponType">Coupon Type</InputLabel>
              <Select
                name="couponType"
                labelId="couponType"
                id="couponType"
                value={formik.values.couponType}
                label="Coupon Type"
                onChange={formik.handleChange}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                {couponTypes.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-span-12">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DesktopDateTimePicker
                  name="validityStartDate"
                  label="Validity Start Date"
                  value={formik.values.validityStartDate}
                  onChange={(value) =>
                    formik.setFieldValue("validityStartDate", value)
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div className="col-span-12">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DesktopDateTimePicker
                  name="validityEndDate"
                  label="Validity End Date"
                  value={formik.values.validityStartDate}
                  onChange={(value) =>
                    formik.setFieldValue("validityEndDate", value)
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        <div className="mt-10">
          <Button fullWidth size="large" variant="contained" type="submit">CRETE COUPON</Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCoupon;
