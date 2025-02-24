import React, { useState } from "react";
import SellerAccountForm from "./components/SellerAccoutForm/SellerAccountForm";
import SellerLoginForm from "./components/SellerLoginForm/SellerLoginForm";
import { Button } from "@mui/material";

const BecomeSeller = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleShowPage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="grid md:gap-10 grid-cols-3 min-h-screen">
      <section className="lg:col-span-1 md:col-span-2 col-span-3 p-10 shadow-lg">
        {isLogin ? <SellerLoginForm /> : <SellerAccountForm />}
        <div className="mt-8">
          <h1 className="text-center text-sm font-medium text-gray-600">{`${
            isLogin ? "Don't Have An Account?" : "Already Have An Account?"
          }`}</h1>
          <Button
            sx={{ marginTop: 2 }}
            size="large"
            variant="outlined"
            fullWidth
            onClick={handleShowPage}
          >
            {isLogin ? "Register" : "Login"}
          </Button>
        </div>
      </section>
      <section className="hidden md:flex md:col-span-1 lg:col-span-2 items-center justify-center">
        <div className="lg:w-[70%] px-5 space-y-10">
            <div className="space-y-2 font-bold text-center">
                <p className="text-2xl">Join the Marketplace Revolution</p>
                <p className="text-xl text-[var(--primary-color)]">Boost your sales today</p>
            </div>
          <img src="https://m.media-amazon.com/images/G/31/amazonservices/Becoming_an_online_seller.jpg" alt="" />
        </div>
      </section>
    </div>
  );
};

export default BecomeSeller;
