import { Box, Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

const SellerAccountForm = () => {
  const [stepNumber, setStepNumber] = useState(0);
  const handleCreateAccount = ()=>{
    console.log("Create account")
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
      <section></section>
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
