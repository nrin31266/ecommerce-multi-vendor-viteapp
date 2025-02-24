import { CheckCircle, FiberManualRecord } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const steps = [
  { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
  { name: "Packed", description: "on Thu, 11 Jul", value: "PACKED" },
  { name: "Shipped", description: "on Thu, 11 Jul", value: "SHIPPED" },
  { name: "Arriving", description: "on Thu, 11 Jul", value: "ARRIVING" },
  { name: "Arrived", description: "on Thu, 11 Jul", value: "ARRIVED" },
  // {name: "Cancelled", description: "on Thu, 11 Jul", value: "CANCELLED"},
];

const cancelledSteps = [
  { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
  { name: "Cancelled", description: "on Thu, 11 Jul", value: "CANCELLED" },
];

const currentStep = 2;

const OrderStepper = ({ orderStatus = "SHIPPED" }: any) => {
  const [statusStep, setStatusStep] = useState(steps);

  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusStep(cancelledSteps);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);

  return (
    <Box className="my-10">
      {statusStep.map((item, index) => (
        <>
          <div key={index} className={`flex px-4`}>
            <div className="flex flex-col items-center">
              <Box
                className={`w-12 h-12 rounded-full flex items-center
                justify-center ${
                  index <= currentStep
                    ? "bg-gray-200 text-teal-500"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {item.value === orderStatus ? (
                  <CheckCircle sx={{ fontSize: 29 }} />
                ) : (
                  <div>
                    <FiberManualRecord sx={{ fontSize: 29, zIndex: -1 }} />
                  </div>
                )}
              </Box>
              {index < statusStep.length - 1 && (
                <div
                  className={` h-20 w-[2px] ${
                    index <= currentStep - 1 ? " bg-teal-500" : " bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
            <div className="ml-2 w-full">
              <div
                className={` p-2 rounded-md ${
                  item.value === orderStatus
                    ? "bg-[var(--primary-color)] text-white"
                    : ""
                } ${orderStatus === "CANCELLED" && item.value === orderStatus && "bg-red-500 text-white"}`}
              >
                <p>{item.name}</p>
                <p
                  className={`text-sm ${
                    item.value === orderStatus
                      ? "text-gray-200"
                      : "text-gray-400"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        </>
      ))}
    </Box>
  );
};

export default OrderStepper;
