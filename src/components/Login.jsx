import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../reduxStore/authSlice";
import { Button, Input, Logo } from "./index";
// import Input from "./index";
// import Logo  from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async data => {
    console.log(data);
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full mb-4">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border  border-black border-solid`}
      >
        <div className="mb-2  flex justify-center border border-black rounded-2xl bg-gray-600">
          <span className=" w-full  max-w-[100px] flex justify-center ">
            <Logo width="100%" />
            <div className="text-4xl text text-white font-bold ">BlogBurst</div>
          </span>
        </div>
        <h2
          className="text-center text-2xl font-bold
         leading-tight"
        >
          Sign in to your Account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don't have an account?
          <Link
            to="/signup"
            className="font-medium text-primary transaction-all duration-200 hover:underline"
          >
            {" "}
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8 ">
          <div className="space-y-5">
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
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
