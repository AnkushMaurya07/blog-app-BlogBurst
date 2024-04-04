import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Logo } from "./index";
// import Input from './index'
// import Logo from './index'

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import {signup as authSignup} from '../reduxStore/authSlice'
import authService from "../appwrite/auth";
import { login } from "../reduxStore/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const signup = async data => {
    setError("");
    try {
      const userAccount = await authService.createAccount(data);
      if (userAccount) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="w-full flex items-center justify-center mb-4">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black  border-solid`}
      >
        <div className="  flex justify-center border border-black rounded-2xl bg-gray-600">
          <span className=" w-full  max-w-[100px] flex justify-center ">
            <Logo width="100%" />
            <div className="text-4xl text text-white font-bold ">BlogBurst</div>
          </span>
        </div>
        <h2
          className="text-center text-2xl font-bold
         leading-tight"
        >
          {" "}
          Create your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?
          <Link
            to="/login"
            className="font-medium text-primary transaction-all duration-200 hover:underline"
          >
            {" "}
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signup)} className="mt-2">
          <div className="space-y-5">
            <Input
              label="Name:"
              placeholder="Enter your name"
              className="border border-black h-10"
              {...register("name", { required: true })}
            />
            <Input
              label="Email:"
              placeholder="Enter your email"
              type="email"
              className="border border-black h-10"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: value =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password:"
              placeholder="Enter your password"
              type="password"
              className="border border-black h-10"
              {...register("password", { required: true })}
            />
            <Button
              type="submit"
              className="w-60 h-14 text-lg text-white  bg-orange-700 hover:text-black hover:text-1xl"
            >
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
//
