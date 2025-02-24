import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import SellerAccountFormStep1 from "./components/SellerAccountFormStep1/SellerAccountFormStep1";

import SellerAccountFormStep2 from "./components/SellerAccountFormStep2/SellerAccountFormStep2";


const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

import { useFormik, FormikProps } from 'formik';
import SellerAccountFormStep3 from "./components/SellerAccountFormStep3/SellerAccountFormStep3";
import SellerAccountFormStep4 from "./components/SellerAccountFormStep4/SellerAccountFormStep4";

export interface BecomeSellerFormValue {
  mobile: string;
  taxCode: string;
  otp: string;
  pickupAddress: {
    name: string;
    mobile: string;
    pinCode: string;
    address: string;
    locality: string;
    city: string;
    state: string;
    zipCode: string;
  };
  bankDetails: {
    accountNumber: string;
    ifscCode: string;
    SWIFTCode: string;
    accountHolderName: string;
  };
  sellerName: string;
  email: string;
  businessDetails: {
    businessName: string;
    businessEmail: string;
    businessMobile: string;
    logo: string;
    banner: string;
    businessAddress: string;
  };
  password: string;
}

const SellerAccountForm = () => {
  const [stepNumber, setStepNumber] = useState(0);
  const formik: FormikProps<BecomeSellerFormValue> = useFormik({
      initialValues: {
        mobile: '',
        taxCode: '',
        otp: '',
        pickupAddress: {
          name: '',
          mobile: '',
          pinCode: '',
          address: '',
          locality: '',
          city: '',
          state: '',
          zipCode:''
        },
        bankDetails:{
          accountNumber: '',
          ifscCode: '',
          SWIFTCode: '',
          accountHolderName: '',
        },
        sellerName: '',
        email: '',
        businessDetails: {
          businessName: '',
          businessEmail: '',
          businessMobile: '',
          logo: '',
          banner: '',
          businessAddress: ''
        },
        password: ''
      },
      validationSchema: undefined,
      onSubmit: (values) =>{
        console.log(values)
      }
    });



  const handleCreateAccount = ()=>{
    console.log("Create account")
  }

  const renderSectionByStep = ()=>{
    switch (stepNumber) {
      case 0 :{
        return <SellerAccountFormStep1 formik={formik}/>;
      }
      case 1: {
        return <SellerAccountFormStep2 formik={formik}/>;
      }
      case 2: {
        return <SellerAccountFormStep3 formik={formik}/>
      }
      case 3: {
        return <SellerAccountFormStep4 formik={formik}/>
      }
      
    }
  }

  return (
    <Box>
      <Stepper activeStep={stepNumber} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <section>
        {
          renderSectionByStep()
        }
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
          sx={{ display: stepNumber === steps.length - 1 ? "none" : "block" }}
          onClick={() => setStepNumber(stepNumber + 1)}
          variant="contained"
          disabled={stepNumber === steps.length - 1}
        >
          NEXT
        </Button>
        <Button
          onClick={handleCreateAccount}
          sx={{ display: stepNumber === steps.length - 1 ? "block" : "none" }}
          variant="contained"
        >
          CREATE
        </Button>
      </div>
    </Box>
  );
};

export default SellerAccountForm;
