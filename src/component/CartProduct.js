import React from "react";
import {
  AiOutlinePlusCircle,
  AiFillMinusCircle,
  AiFillDelete,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  deleteCartItems,
  increaseQty,
  decreaseQty,
} from "../redux/ProductSlice";
const CartProduct = ({ name, image, category, id, qty, price, total }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-slate-200 p-2 flex rounded border-2 border-slate-300">
      <div className="bg-white p-3 rounded overflow-hidden">
        <img src={image} alt="#" className="h-28 w-36 object-cover"></img>
      </div>
      <div className="flex flex-col gap-1 bg-white w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-slate-600  capitalize text-lg md:text-lg">
            {name}
          </h3>
          <div
            className="ml-auto text-red-400 text-xl m-2 cursor-pointer hover:text-red-500"
            onClick={() => dispatch(deleteCartItems(id))}
          >
            <AiFillDelete /> 
          </div>
        </div>
        <p className=" text-slate-400 font-medium text-lg">{category}</p>
        <p className="font-medium">
          <span className="text-red-500">₹</span>
          <span>{price}</span>
        </p>
        <div className="flex justify-between mr-5">
          <div className="flex gap-2 drop-shadow  ">
            <button
              className=" text-center  p-1 -m-1 rounded-full w-full text-white px-5 "
              onClick={() => dispatch(increaseQty(id))}
            >
              <AiOutlinePlusCircle className="text-slate-400 text-2xl hover:text-gray-600 " />
            </button>
            <p className="font-semibold my-3">{qty}</p>
            <button
              onClick={() => dispatch(decreaseQty(id))}
              className=" text-center  rounded-full w-full text-white px-5  "
            >
              <AiFillMinusCircle className="text-slate-400 hover:text-gray-600 text-2xl" />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold">
            <p>Total:</p>
            <p>
              <span className="text-red-500">₹</span>
              {total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
