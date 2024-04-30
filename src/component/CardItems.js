import React from "react";
import { Link } from "react-router-dom";
import { addCartItems } from "../redux/ProductSlice";
import { useDispatch } from "react-redux";

const CardItems = ({ image, name, category, price, scrollLoading, id }) => {
  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(
      addCartItems({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };

  return (
    <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow py-5 px-4 cursor-pointer">
      {image ? (
        <>
          <Link
            to={`/menu/${id}`}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="h-28 flex justify-center items-center">
              <img src={image} className=" h-full" alt="#"></img>
            </div>
            <h3 className="font-semibold text-slate-600  capitalize text-lg  mt-4">
              {name}
            </h3>
            <p className=" text-slate-400 font-medium">{category}</p>
            <p className=" font-bold">
              <span className="text-red-500">₹</span>
              <span>{price}</span>
            </p>
          </Link>
          <button
            onClick={handleAddCart}
            className="bg-yellow-500 py-2 mt-2 rounded w-full text-white hover:bg-yellow-600 w-full"
          >
            Add Cart
          </button>
        </>
      ) : (
        <div className="min-h-[200px] flex justify-center items-center">
          <p>{scrollLoading}</p>
        </div>
      )}
    </div>
  );
};

export default CardItems;
