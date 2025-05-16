import { Alert, Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { use, useState } from "react";
import SellerAccountFormStep1 from "./components/SellerAccountFormStep1/SellerAccountFormStep1";

import SellerAccountFormStep2 from "./components/SellerAccountFormStep2/SellerAccountFormStep2";

const steps = [
  "Personal Details",
  "Business Details",
  "Bank Details",
  "Pickup Address",
  "Verify",
];

import { useFormik, FormikProps } from "formik";
import SellerAccountFormStep3 from "./components/SellerAccountFormStep3/SellerAccountFormStep3";
import SellerAccountFormStep4 from "./components/SellerAccountFormStep4/SellerAccountFormStep4";
import { useAppDispatch, useAppSelector } from "../../../../../states/store";
import { createSeller, signing } from "../../../../../states/authSlide";
import SellerAccountFormStep5 from "./components/SellerAccountFormStep5/SellerAccountFormStep5";
import { EUserRole } from "../../../../../types/UserTypes";
import { useNavigate } from "react-router-dom";

export interface BecomeSellerFormValue {
  mobile: string;
  taxCode: string;
  otp: string;
  pickupAddress: {
    street: string;
    ward: string;
    district: string;
    province: string;
  };
  bankDetails: {
    accountNumber: string;
    swiftCode: string;
    accountHolderName: string;
  };
  sellerName: string;
  email: string;
  businessDetails: {
    businessName: string;
    businessEmail: string;
    businessMobile: string;
    businessAddress: string;
  };
}

const SellerAccountForm = () => {
  const [stepNumber, setStepNumber] = useState(0);
  const dispatch = useAppDispatch();
  const auth = useAppSelector((store) => store.auth);
  const navigate = useNavigate();

  const formik: FormikProps<BecomeSellerFormValue> = useFormik({
    initialValues: {
      mobile: "",
      taxCode: "",
      otp: "",
      pickupAddress: {
        street: "",
        ward: "",
        district: "",
        province: "",
      },
      bankDetails: {
        accountNumber: "",
        swiftCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessMobile: "",
        businessAddress: "",
      },
    },
    validationSchema: undefined,
    onSubmit: async (values) => {
      console.log(values);
      if (
        stepNumber === 0 &&
        values.sellerName &&
        values.email &&
        values.mobile &&
        values.taxCode
      ) {
        setStepNumber(stepNumber + 1);
      } else if (
        stepNumber === 1 &&
        values.businessDetails.businessName &&
        values.businessDetails.businessEmail &&
        values.businessDetails.businessMobile &&
        values.businessDetails.businessAddress
      ) {
        setStepNumber(stepNumber + 1);
      } else if (
        stepNumber === 2 &&
        values.bankDetails.accountNumber &&
        values.bankDetails.accountHolderName &&
        values.bankDetails.swiftCode
      ) {
        setStepNumber(stepNumber + 1);
      } else if (
        stepNumber === 3 &&
        values.pickupAddress.street &&
        values.pickupAddress.ward &&
        values.pickupAddress.district &&
        values.pickupAddress.province
      ) {
        await dispatch(createSeller({ rq: values }))
          .unwrap()
          .then(() => {
            setStepNumber(stepNumber + 1);
          });
      }else if (stepNumber === 4) {
        await dispatch(signing({ email: values.email, role: EUserRole.ROLE_SELLER, otp: values.otp, navigate }));
      }
    },
  });

  const renderSectionByStep = () => {
    switch (stepNumber) {
      case 0: {
        return <SellerAccountFormStep1 formik={formik} />;
      }
      case 1: {
        return <SellerAccountFormStep2 formik={formik} />;
      }
      case 2: {
        return <SellerAccountFormStep3 formik={formik} />;
      }
      case 3: {
        return <SellerAccountFormStep4 formik={formik} />;
      }
      case 4: {
        return <SellerAccountFormStep5 formik={formik} />;
      }
    }
  };

  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Stepper activeStep={stepNumber} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <section>
          {renderSectionByStep()}
          <div className="mt-4">
            {auth.error && <Alert severity="error">{auth.error}</Alert>}
          {auth.successfullyMessage && <Alert severity="success">{auth.successfullyMessage}</Alert>}
          </div>
        </section>

        <div className="items-center flex justify-between px-10 mt-10">
          <Button
            onClick={() => setStepNumber(stepNumber - 1)}
            color="secondary"
            disabled={stepNumber === 0}
            variant="contained"
          >
            BACK
          </Button>
          <Button
            disabled={auth.loading}
            loading={auth.loading}
            variant="contained"
            type="submit"
          >
            {stepNumber === 3 ? "CREATE" : "NEXT"}
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default SellerAccountForm;
