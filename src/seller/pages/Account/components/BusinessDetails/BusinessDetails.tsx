import React, { useEffect, useRef, useState } from "react";
import UserDetailsField from "../../../../../customer/pages/Account/components/Profile/components/UserDetailsField/UserDetailsField";
import { useAppDispatch, useAppSelector } from "../../../../../states/store";
import { ISeller } from "../../../../../types/SellerTypes";
import { Avatar, Button, IconButton, TextField } from "@mui/material";
import { Edit, Save } from "@mui/icons-material";
import { useFormik } from "formik";
import { updateSeller } from "../../../../../states/seller/sellerSlide";
import { uploadImage } from "../../../../../utils/Firebase/uploadFile";

const BusinessDetails = () => {
  const dispatch = useAppDispatch();
  const sellerState = useAppSelector((store) => store.seller);
  const [isEditing, setIsEditing] = useState(false);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [previewBanner, setPreviewBanner] = useState("");
  const [previewLogo, setPreviewLogo] = useState("");
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  useEffect(() => {
    if (sellerState.profile) {
      formik.setValues({
        businessName: sellerState.profile.businessDetails.businessName,
        businessEmail: sellerState.profile.businessDetails.businessEmail,
        businessMobile: sellerState.profile.businessDetails.businessMobile,
        businessAddress: sellerState.profile.businessDetails.businessAddress,
        logo: sellerState.profile.businessDetails.logo,
        banner: sellerState.profile.businessDetails.banner,
      });
      setPreviewBanner(sellerState.profile.businessDetails.banner ?? "");
      setPreviewLogo(sellerState.profile.businessDetails.logo ?? "");
    }
  }, [sellerState.profile]);

  const handleBannerChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewBanner(URL.createObjectURL(file));
      setIsUploadingFile(true);
      const bannerUrl = await uploadImage(file);

      await dispatch(
        updateSeller({
          rq: {
            businessDetails: {
              ...formik.values,
              banner: bannerUrl,
              logo: sellerState.profile?.businessDetails.logo,
            },
          },
        })
      );
      setIsUploadingFile(false);

      formik.setFieldValue("banner", bannerUrl);
    }
  };

  const handleLogoChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewLogo(URL.createObjectURL(file));
      setIsUploadingFile(true);
      const logoUrl = await uploadImage(file);

      await dispatch(
        updateSeller({
          rq: {
            businessDetails: {
              ...formik.values,
              logo: logoUrl,
              banner: sellerState.profile?.businessDetails.banner,
            },
          },
        })
      );
      setIsUploadingFile(false);

      formik.setFieldValue("logo", logoUrl);
    }
  };

  const formik = useFormik({
    initialValues: {
      businessName: "",
      businessEmail: "",
      businessMobile: "",
      businessAddress: "",
      logo: "",
      banner: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      await dispatch(
        updateSeller({
          rq: {
            businessDetails: { ...values },
          },
        })
      );
      setIsEditing(false);
    },
    validationSchema: null,
  });
  return (
    <div className=" flex justify-center items-center flex-col space-y-8">
      <div className="flex flex-col justify-center items-center ">
        <div className="relative w-[400px] h-[200px]">
          <img
            src={previewBanner}
            alt=""
            className="w-full h-full object-contain border border-gray-200"
          />
          <Avatar
            sx={{
              width: 150,
              height: 150,
              objectFit: "cover",
            }}
            src={previewLogo}
            className="border-4 border-gray-200 absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2"
          />
          {/* File inputs ẩn */}
          <input
            type="file"
            accept="image/*"
            hidden
            ref={bannerInputRef}
            onChange={handleBannerChange}
          />
          <input
            type="file"
            accept="image/*"
            hidden
            ref={logoInputRef}
            onChange={handleLogoChange}
          />
        </div>
      </div>

      <div className="mt-14 gap-4 flex">
        <Button
          variant="contained"
          onClick={() => bannerInputRef.current?.click()}
          disabled={isUploadingFile}
        >
          Change banner
        </Button>
        <Button
          variant="contained"
          onClick={() => logoInputRef.current?.click()}
          disabled={isUploadingFile}
        >
          Change avatar
        </Button>
      </div>

      <div className="w-[700px]">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex justify-end mb-5">
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
            label="Name"
            value={
              isEditing ? (
                <div>
                  <TextField
                    required
                    fullWidth
                    name="businessName"
                    label="Business Name"
                    value={formik.values.businessName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.businessName &&
                      Boolean(formik.errors.businessName)
                    }
                    helperText={
                      formik.touched.businessName && formik.errors.businessName
                    }
                  />
                </div>
              ) : (
                sellerState.profile?.businessDetails.businessName
              )
            }
          />
          <UserDetailsField
            label="Email"
            value={
              isEditing ? (
                <div>
                  <TextField
                    required
                    fullWidth
                    name="businessEmail"
                    label="Business Email"
                    value={formik.values.businessEmail}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.businessEmail &&
                      Boolean(formik.errors.businessEmail)
                    }
                    helperText={
                      formik.touched.businessEmail &&
                      formik.errors.businessEmail
                    }
                  />
                </div>
              ) : (
                sellerState.profile?.businessDetails.businessEmail
              )
            }
          />
          <UserDetailsField
            label="Mobile"
            value={
              isEditing ? (
                <div>
                  <TextField
                    required
                    fullWidth
                    name="businessMobile"
                    label="Business Mobile"
                    value={formik.values.businessMobile}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.businessMobile &&
                      Boolean(formik.errors.businessMobile)
                    }
                    helperText={
                      formik.touched.businessMobile &&
                      formik.errors.businessMobile
                    }
                  />
                </div>
              ) : (
                sellerState.profile?.businessDetails.businessMobile
              )
            }
          />
          <UserDetailsField
            label="Address"
            value={
              isEditing ? (
                <div>
                  <TextField
                    required
                    fullWidth
                    name="businessAddress"
                    label="Business Address"
                    value={formik.values.businessAddress}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.businessAddress &&
                      Boolean(formik.errors.businessAddress)
                    }
                    helperText={
                      formik.touched.businessAddress &&
                      formik.errors.businessAddress
                    }
                  />
                </div>
              ) : (
                sellerState.profile?.businessDetails.businessAddress
              )
            }
          />
        </form>
      </div>
    </div>
  );
};

export default BusinessDetails;
