import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../reduxStore/authSlice";

const Logoutbtn = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout()).catch(err => {
        throw err;
      });
    });
  };
  return (
    <div>
      <button
        className="inline-block px-6 py-2 text-black duration-200 hover:bg-blue-100 rounded-full"
        onClick={logoutHandler}
      >
        {" "}
        Logout
      </button>
    </div>
  );
};

export default Logoutbtn;
