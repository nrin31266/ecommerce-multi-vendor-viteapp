import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../states/store";
import UserDetailsField from "../../../../../customer/pages/Account/components/Profile/components/UserDetailsField/UserDetailsField";
import { EAccountStatus, ISeller } from "../../../../../types/SellerTypes";
import { Button, IconButton, TextField } from "@mui/material";
import {
  CancelOutlined,
  Check,
  Edit,
  Save,
  WarningAmberOutlined,
} from "@mui/icons-material";
import { useFormik } from "formik";
import { updateSeller } from "../../../../../states/seller/sellerSlide";

const PersonalDetails = () => {
  const dispatch = useAppDispatch();
  const sellerState = useAppSelector((store) => store.seller);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (sellerState.profile) {
      formik.setValues({
        sellerName: sellerState.profile.sellerName,
        mobile: sellerState.profile.mobile,
        taxCode: sellerState.profile.taxCode,
      });
    }
  }, [sellerState.profile]);

  const formik = useFormik({
    initialValues: {
      sellerName: "",
      mobile: "",
      taxCode: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      await dispatch(
        updateSeller({
          rq: {
            sellerName: values.sellerName,
            mobile: values.mobile,
            taxCode: values.taxCode,
          },
        })
      );
      setIsEditing(false);
    },
    validationSchema: null,
  });

  return (
    <div className="flex justify-center">
      <div className="w-[700px]">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-8 flex justify-end">
            {isEditing ? (
              <div className="flex gap-4">
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  loading={sellerState.isUpdateProfileLoading}
                  disabled={sellerState.isUpdateProfileLoading}
                  type="submit"
                  variant="contained"
                  endIcon={<Save />}
                >
                  Save
                </Button>
              </div>
            ) : (
              <>
                <IconButton onClick={() => setIsEditing(true)}>
                  <Edit color="primary" />
                </IconButton>
              </>
            )}
          </div>
          <UserDetailsField
            label={"Email"}
            value={sellerState.profile?.email}
          />
          <UserDetailsField
            label={"Name"}
            value={
              isEditing ? (
                <div>
                  <TextField
                    required
                    fullWidth
                    name="sellerName"
                    label="Seller Name"
                    value={formik.values.sellerName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.sellerName &&
                      Boolean(formik.errors.sellerName)
                    }
                    helperText={
                      formik.touched.sellerName && formik.errors.sellerName
                    }
                  />
                </div>
              ) : (
                sellerState.profile?.sellerName
              )
            }
          />
          <UserDetailsField
            label={"Mobile"}
            value={
              isEditing ? (
                <div>
                  <TextField
                    required
                    fullWidth
                    name="mobile"
                    label="Mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.mobile && Boolean(formik.errors.mobile)
                    }
                    helperText={formik.touched.mobile && formik.errors.mobile}
                  />
                </div>
              ) : (
                sellerState.profile?.mobile
              )
            }
          />

          <UserDetailsField
            label={"Tax code"}
            value={
              isEditing ? (
                <div>
                  <TextField
                    required
                    fullWidth
                    name="taxCode"
                    label="Tax Code"
                    value={formik.values.taxCode}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.taxCode && Boolean(formik.errors.taxCode)
                    }
                    helperText={formik.touched.taxCode && formik.errors.taxCode}
                  />
                </div>
              ) : (
                sellerState.profile?.taxCode
              )
            }
          />

          <UserDetailsField
            label={"Status"}
            value={
              <div
                className={`
            ${
              sellerState.profile?.accountStatus === EAccountStatus.ACTIVE
                ? "text-green-600"
                : "text-yellow-600"
            } font-light`}
              >
                {sellerState.profile?.accountStatus}
              </div>
            }
          />
          <UserDetailsField
            label="Accept Terms"
            value={
              sellerState.profile?.acceptTerms ? (
                <Check color="success" />
              ) : (
                <div className="flex items-center gap-2">
                  <WarningAmberOutlined color="warning" />
                  <div className="text-sm">
                    You need to accept terms to use this service
                  </div>
                </div>
              )
            }
          />
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;
