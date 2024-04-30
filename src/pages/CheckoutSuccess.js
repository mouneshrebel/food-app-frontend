import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }, 2000);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div
        className={`${
          showSuccess ? "bg-green-400" : "bg-transparent"
        } p-8 rounded-lg shadow-lg transform ${
          isLoading ? "translate-y-16 opacity-0" : "translate-y-0 opacity-100"
        } transition-all duration-500`}
      >
        {isLoading ? (
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        ) : showSuccess ? (
          <>
            <div className="text-6xl text-white text-center">&#10003;</div>
            <h1 className="text-3xl text-white font-semibold mt-4">
              Payment Successful!
            </h1>
            <p className="text-lg text-white mt-4">
              Thank you for your purchase.
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CheckoutSuccess;
