import React, { useState } from "react";
import signup from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { Image } from "../utilits/ImageBase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const navigate = useNavigate();

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleConfirmPassword = () => {
    setConfirmPassword((prev) => !prev);
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfile = async (e) => {
    const Data = await Image(e.target.files[0]);

    setFormData((prev) => ({
      ...prev,
      image: Data,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = formData;

    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER}users/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const responseData = await fetchData.json();
        if (responseData.status === 200) {
          toast.success(responseData.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        if (responseData.status === 300) {
          toast.error(responseData.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        if (responseData.alert) {
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      } else {
        toast.error("password is not matched", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } else {
      toast.error("please fill the form", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <div className="p-3 md:p-4 ">
      <div className="w-full max-w-sm bg-white  m-auto flex  flex-col p-4">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img
            src={formData.image ? formData.image : signup}
            className="w-full h-full "
            alt="#"
          ></img>
          <label htmlFor="profile">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center text-white cursor-pointer">
              <p className="text-sm">upload</p>
            </div>
            <input
              type="file"
              id="profile"
              accept="image/"
              onChange={handleProfile}
              className="hidden"
            />
          </label>
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleFormSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleForm}
            className="mt-2 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          ></input>
          <label htmlFor="lastName">LastName</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleForm}
            className="mt-2 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          ></input>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleForm}
            className="mt-2 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />
          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 mt-2 mb-2 bg-slate-200 rounded  focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleForm}
              className="w-full border-none outline-none  bg-slate-200"
            ></input>
            <span
              className="flex text-xl cursor-pointer"
              onClick={handlePassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="flex px-2 py-1 mt-2 mb-2 bg-slate-200 rounded focus-within:outline focus-within:outline-blue-300">
            <input
              type={confirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleForm}
              value={formData.confirmPassword}
              className="w-full border-none outline-none  bg-slate-200"
            ></input>
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleConfirmPassword}
            >
              {confirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button className="max-w-[120px] w-full m-auto  bg-red-500 hover:bg-red-600 cursor-pointer text-white text-lg py-1 rounded-full mt-4">
            Signup
          </button>
          <p className="p-1 mt-1">
            Already have account?{" "}
            <Link to="/login" className="text-red-500 underline">
              Login
            </Link>
          </p>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Signup;
