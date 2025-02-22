import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {useDispatch} from "react-redux";
import { authActions } from "../store/auth";
export const LogIn = () => {
  const [values, setvalues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const disptch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setvalues({ ...values, [name]: value });
  };

  const submit = async () => {
    try {
      if (values.username === "" || values.password === "") {
        toast.error("All fields are required!");
      } else {
        const response = await axios.post(
          "http://localhost:4000/api/v1/user/signIn",
          values
        );
    
      console.log(response.data.message);
      
      disptch(authActions.login());
      disptch(authActions.changeRole(response.data.role));
      localStorage.setItem("id",response.data.id);
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("role",response.data.role);
      toast.success("LogIn Successfully!");

      setTimeout(() => {
        navigate("/profile");
      }, 1500);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.message || "Something went wrong. Please try again!");
      } else {
        toast.error("Network error. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 px-12 py-8 flex flex-col items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Log In</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Username
            </label>
            <input
              type="text"
              className="w-full mt-4 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Enter your username"
              name="username"
              required
              value={values.username}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="" className="text-zinc-400">
              Password
            </label>
            <input
              type="password" 
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Enter your Password"
              name="password"
              required
              value={values.password}
              onChange={change}
            />
          </div>
          <div className="mt-6">
            <button
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-500 cursor-pointer"
              onClick={submit}
            >
              LogIn
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
            or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Need an account? &nbsp;
            <Link to="/signup" className="hover:text-blue-500 cursor-pointer">
              <u>SignUp here</u>
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer /> 
    </div>
  );
};
// 14:10