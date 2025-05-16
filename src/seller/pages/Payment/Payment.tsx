import { Button, Card, Divider } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Transaction from "../Transaction/Transaction";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../states/store";
import { getSellerTransactions } from "../../../states/seller/sellerTransactionSlide";
import { getSellerReport } from "../../../states/seller/sellerReportSlide";
import { CurrencyUtils } from "../../../utils/Currency/CurrencyUtils";


const Payment = () => {
   const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sellerTransactionState = useAppSelector((state) => state.sellerTransaction);
  const sellerReportState = useAppSelector((state) => state.sellerReport);
  const initializeApp = useRef(false);

  useEffect(() => {
    if (!initializeApp.current) {
      initializeApp.current = true;
      dispatch(getSellerTransactions()).unwrap();
      dispatch(getSellerReport()).unwrap();
    }
  }, [dispatch]);
  return (
    <div className="space-y-5">
      <Card className="space-y-5 py-5 min-w-[500px] w-max px-5">
        <h1 className="text-xl text-gray-600">Gross Earnings</h1>
        <div>
          <span className="font-semibold text-2xl">{CurrencyUtils.formatVNDCurrency(sellerReportState.data.grossEarnings)}</span>
        </div>
        <div>
          <Divider />
        </div>
        <div>
          <span className="text-gray-600">Total transaction:&nbsp;</span>
          <span className="font-medium">{sellerTransactionState.transactions.length}</span>
        </div>
      </Card>
      <div>
       
        <Transaction />
      </div>
    </div>
  );
};

export default Payment;
