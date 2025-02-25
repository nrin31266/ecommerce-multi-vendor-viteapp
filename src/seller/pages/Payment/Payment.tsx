import { Button, Card, Divider } from "@mui/material";
import React from "react";
import Transaction from "../Transaction/Transaction";

const Payment = () => {
  return (
    <div className="space-y-5">
      <Card className="space-y-5 py-5 min-w-[500px] w-max px-5">
        <h1 className="text-xl text-gray-600">Total Earning</h1>
        <div>
          <span className="font-semibold text-2xl">424347827468</span>
        </div>
        <div>
          <Divider />
        </div>
        <div>
          <span className="text-gray-600">Last Payment:&nbsp;</span>
          <span className="font-medium">0</span>
        </div>
      </Card>
      <div>
        <div className="mb-2">
          <Button variant="contained">Transaction</Button>
        </div>
        <Transaction />
      </div>
    </div>
  );
};

export default Payment;
