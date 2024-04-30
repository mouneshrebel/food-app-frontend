import React, { useState } from "react";
import signup from "../assest/login-animation.gif";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginRedux } from "../redux/UserData";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER}users/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const responseData = await fetchData.json();

      if (responseData.alert) {
        dispatch(loginRedux(responseData));
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      }

      if (responseData.status === 401) {
        toast.error(responseData.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else if (responseData.status === 402) {
        toast.error(responseData.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else if (responseData.status === 501) {
        toast.error(responseData.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success(responseData.message, {
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
      <div className="w-full max-w-sm bg-white flex m-auto items-center flex-col p-4">
        <div className="w-12 overflow-hidden rounded-full drop-shadow-md shadow-md">
          <img src={signup} className="w-full" alt="#"></img>
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handleFormSubmit}>
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
          <button className="max-w-[120px] w-full m-auto  bg-red-500 hover:bg-red-600 cursor-pointer text-white text-lg py-1 rounded-full mt-4">
            Login
          </button>
          <p className="p-1 mt-1">
            Don't have account?{" "}
            <Link to="/" className="text-red-500 underline">
              signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
