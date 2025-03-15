import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="md:justify-center flex items-center flex-col h-[90vh] justify-normal ">
      <div className="md:shadow-2xl md:w-md md:rounded-md">
        <img
          className="md:h-50 w-full object-cover object-top md:rounded-t-md"
          src="/assets/images/banner-1.png"
          alt=""
        />
        <div className="p-6">
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <div className="mt-12 flex justify-center items-center">
            <h1 className="text-center text-sm font-medium text-gray-600">{`${
              isLogin ? "Don't Have An Account?" : "Already Have An Account?"
            }`} </h1><a className="text-[var(--primary-color)] hover:text-[var(--secondary-color)] cursor-pointer ml-1 duration-200" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Register" : "Login"}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
