import React, { useState } from "react";
import SellerDrawerList from "../../components/SellerDrawerList/SellerDrawerList";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../states/store";
import { Alert, Button } from "@mui/material";
import { WarningOutlined } from "@mui/icons-material";
import AcceptTermsModel from "./components/AcceptTermsModel/AcceptTermsModel";
import { acceptTerms } from "../../../states/seller/sellerSlide";

const SellerDashboard = () => {
  const handleToggleDrawer = () => {};
  const sellerState = useAppSelector((store) => store.seller);
  const [isViableAcceptTermsModel, setIsViableAcceptTermsModel] = useState(false);   
    const dispatch = useAppDispatch();

  


  return (
    <div>
      <div className="lg:flex lg:h-[90vh]">
        <section className="hidden lg:block h-full">
          <SellerDrawerList toggleDrawer={handleToggleDrawer} />
        </section>
        <section className="p-10 w-full lg:w-[100%] overflow-y-auto">
          {sellerState.profile && sellerState.profile.acceptTerms !== true  && (
            <div className="mb-4 flex items-center justify-between border p-2 rounded-md border-gray-200">
               <div className="text-xl flex gap-4">
                    <WarningOutlined color="warning"/>
                  You need to accept terms to use this service
                </div>
                <div className="">
                    <Button onClick={() => setIsViableAcceptTermsModel(true)} color="warning" variant="outlined">Accept Terms</Button>
                </div>
            </div>
          )}
          <Outlet />
        </section>
      </div>
      <AcceptTermsModel loading={sellerState.isAcceptTermsLoading} isVisible={isViableAcceptTermsModel} onClose={() => {
        setIsViableAcceptTermsModel(false);
      }} onAccept={async () => {
         await dispatch(acceptTerms()).unwrap();
        setIsViableAcceptTermsModel(false);
      }} />
    </div>
  );
};

export default SellerDashboard;
