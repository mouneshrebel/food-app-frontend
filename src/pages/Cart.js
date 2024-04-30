import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../component/CartProduct";
import cartimg from "../assest/empty.gif";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/ProductSlice";

const Cart = () => { 
  const [payment, setPayment] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  console.log(setPayment)
  const productCartItems = useSelector((state) => state.product.cartItem);

  const totalPrice = productCartItems.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItems.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const TotalCartMap = productCartItems.map((items) => {
    return items;
  });

  const overallTotal = totalPrice;

  const makingPayment = async (token) => {
    const body = {
      token,
      overallTotal,
      TotalCartMap,
    };
    const headers = {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_STRIPE_SECRET_KEY}`,
    };

    return await fetch(`${process.env.REACT_APP_SERVER}users/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body), // string data into string
    })
      .then((result) => {
        if (result.status === 200) {
          dispatch(clearCart());
          navigate("/checkout-success");
        } else {
          // Payment failed
          toast.error("Payment failed", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })

      .catch((err) => {
        toast.error("payment failed try again!!", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  return (
    <>
      <div className="p-2 md:p-4">
        {payment ? (
          <>
            <h2 className="text-lg md:text-xl font-bold text-slate-500">
              Your Cart Items
            </h2>
            <div className="w-full flex justify-center items-center flex-col">
              <img src={cartimg} className="w-full max-w-sm" alt="#"></img>
              <p className="text-slate-500 text-3xl font-bold">Cart Empty...</p>
            </div>
          </>
        ) : productCartItems[0] ? (
          <div className="my-4 flex gap-3 md:flex flex-wrap">
            {/* Display Cart */}
            <div className="w-full max-w-3xl ">
              {/* total cart items */}
              {productCartItems.map((e) => {
                return (
                  <CartProduct
                    key={e._id}
                    id={e._id}
                    image={e.image}
                    name={e.name}
                    category={e.category}
                    qty={e.qty}
                    total={e.total}
                    price={e.price}
                  />
                );
              })}
            </div>
            <div className="w-full max-w-sm ml-auto">
              <h2 className="bg-blue-400 text-white p-2 text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty:</p>
                <p className="ml-auto w-35 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price:</p>
                <p className="ml-auto w-35 font-bold">
                  <span className="text-red-500">₹{totalPrice}</span>
                </p>
              </div>

              <div>
                <StripeCheckout
                  name="Food Delight"
                  amount={overallTotal * 100}
                  currency="INR"
                  token={makingPayment}
                  stripeKey="pk_test_51NpOMnSBSV95ygGwcPRVQgt6H4Mx9XThjGslMHhsx7Em8kAhyHORS565YSrmWdjcmWp0unTWOc0OibxbrxYJ1t2k00q4oanZQe"
                >
                  <button className="bg-red-400 w-full hover:bg-red-600 transition-all  text-lg text-white font-bold py-2">
                    Payment ₹ {overallTotal}
                  </button>
                </StripeCheckout>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center h-42 ">
            <img src={cartimg} className=" w-36  h-36" alt="#"></img>
            <h2 className="text-lg md:text-xl font-bold text-slate-500">
              Your Cart is Empty
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
