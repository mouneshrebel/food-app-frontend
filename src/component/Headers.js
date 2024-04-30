import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/UserData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assest/fooddelight-low-logo-1.png";

const Headers = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast.success("Logout successfully!!!", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const cardItemNumber = useSelector((state) => state.product.cartItem);

  const AdminEmail = "hulkcharlie17@gmail.com";

  return (
    <header className="bg-fixed shadow-md w-full h-16 px-2 z-50 md:px-4 bg-white">
      <div className="flex items-center h-full w-full justify-between">
        <Link to="/home">
          <div className="h-12">
            <img src={logo} className="h-full" alt="Logo" />
          </div>
        </Link>
        {userData.email ? ( // Check if user is logged in
          <div className="flex items-center gap-5 md:gap-7">
            {/* Navigation links */}
            <nav className="flex gap-4 md:gap:6 text-base md:text-lg hidden md:flex">
              <NavLink
                to="/home"
                className="transition-all text-black hover:bg-orange-600 hover:text-white"
              >
                Home
              </NavLink>
              <NavLink
                to="/menu/64fe0022297d2b39c16712c0"
                className="transition-all text-black hover:bg-orange-600 hover:text-white"
              >
                Menu
              </NavLink>
              <NavLink
                to="/about"
                className="transition-all text-black hover:bg-orange-600 hover:text-white"
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                className="transition-all text-black hover:bg-orange-600 hover:text-white"
              >
                Contact
              </NavLink>
            </nav>

            {/* Cart icon */}
            <div className="text-2xl text-slate-600 relative">
              <Link to="/cart">
                <BsCart3 />
                <div className="absolute -top-2 -right-2 text-white bg-red-500 h-5 text-sm text-top w-5 rounded-full m-0 p-0">
                  <span className="m-1">{cardItemNumber.length}</span>
                </div>
              </Link>
            </div>

            {/* User profile */}
            <div className="text-slate-600" onClick={handleShowMenu}>
              <div className="text-2xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-sm object-cover">
                {userData.image ? (
                  <img
                    src={userData.image}
                    className="h-full w-full"
                    alt="User"
                  />
                ) : (
                  <BiUserCircle />
                )}
              </div>
              {showMenu && (
                <div className="absolute right-3 bg-white py-2 px-2 shadow drop flex flex-col min-w-[120px] z-40 transition-all">
                  {userData.email === AdminEmail && (
                    <Link
                      to="/product"
                      className="whitespace-nowrap cursor-pointer px-2"
                    >
                      New Product
                    </Link>
                  )}
                  <p
                    className="cursor-pointer bg-red-400 text-white px-2 py-1 rounded-sm hover:bg-red-500 transition-all"
                    onClick={handleLogout}
                  >
                    <Link to="/login">Logout ({userData.firstName})</Link>
                  </p>
                  <nav className="flex gap-2 text-base md:text-lg  mt-2 md:flex flex-col md:hidden hover: transition-all">
                    <NavLink
                      to="/home"
                      className="px-2 py-1 transition-all text-black hover:bg-orange-600 hover:text-white"
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/menu/64fe0022297d2b39c16712c0"
                      className="px-2 py-1 transition-all text-black hover:bg-orange-600 hover:text-white"
                    >
                      Menu
                    </NavLink>
                    <NavLink
                      to="/about"
                      className="px-2 py-1 transition-all text-black hover:bg-orange-600 hover:text-white"
                    >
                      About
                    </NavLink>
                    <NavLink
                      to="/contact"
                      className="px-2 py-1 transition-all text-black hover:bg-orange-600 hover:text-white"
                    >
                      Contact
                    </NavLink>
                  </nav>
                </div>
              )}
            </div>
          </div>
        ) : null}{" "}
        {/* If user is not logged in, don't render the navigation */}
      </div>
    </header>
  );
};

export default Headers;
