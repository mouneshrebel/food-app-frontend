import React, { useRef } from "react";
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardItems from "../component/CardItems";
import { FadeLoader } from "react-spinners";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProduct from "../component/AllProduct";

const Home = () => {
  const product = useSelector((state) => state.product.productList);
  const ProductCartVegetable = product.filter(
    (e) => e.category === "vegetable"
  );
  const homeProduct = product.slice(18, 22);
  const Loading = new Array(4).fill(null);
  const scrollLoading = new Array(10).fill(null);
  const slideProduct = useRef();

  const nextProduct = () => {
    slideProduct.current.scrollLeft += 200;
  };

  const prevProduct = () => {
    slideProduct.current.scrollLeft -= 200;
  };

  return (
    <div className="p-2 md:p-4">
      <div className="md:flex gap-4  py-2">
        <div className="md:w-1/2 py-4">
          <div className="flex gap-3 bg-slate-400 w-36 px-2 items-center rounded-full">
            <p className="text-sm ">Bike delivery</p>
            <img
              alt="#"
              className="h-7 font-medium text-slate-700"
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
            ></img>
          </div>
          <h2 className="text-4xl md:text-7xl font-bold py-3">
            Food Order Delight
            <span className="text-red-600 ">
              {" "}
              Your Fast, Reliable Delivery Choice
            </span>
          </h2>
          <p className="py-3 text-base">
            At Food Order Delight, we're committed to delivering your favorite
            meals right to your door. Enjoy quick, hassle-free dining at home
            with our wide selection of delicious dishes from top local
            restaurants. Order today for a delightful food experience delivered
            fast.
          </p>
          <button className="font-bold bg-red-500 text-white px-4 py-2 rounded-sm">
            order Now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-2 p-4 justify-center">
          {" "}
          {homeProduct[0]
            ? homeProduct.map((e) => {
                return (
                  <HomeCard
                    key={e._id}
                    id={e._id}
                    image={e.image}
                    price={e.price}
                    name={e.name}
                    category={e.category}
                  />
                );
              })
            : Loading.map((e, i) => {
                return (
                  <HomeCard
                    key={"loading-" + i}
                    Loading={<FadeLoader color="#36d7b7" width={3} />}
                  />
                );
              })}
        </div>
      </div>
      <div className="">
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              className="bg-slate-400 hover:bg-slate-400 text-lg p-1 rounded"
              onClick={prevProduct}
            >
              <GrPrevious />
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-400 text-lg p-1 rounded"
              onClick={nextProduct}
            >
              <GrNext />
            </button>
          </div>
        </div>{" "}
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProduct}
        >
          {ProductCartVegetable[0]
            ? ProductCartVegetable.map((e) => {
                return (
                  <CardItems
                    key={e._id + "vegatale"}
                    id={e._id}
                    name={e.name}
                    category={e.category}
                    price={e.price}
                    image={e.image}
                  />
                );
              })
            : scrollLoading.map((e, i) => (
                <CardItems
                  key={i + "cardloadin"}
                  scrollLoading={
                    <FadeLoader
                      color="#36d7b7"
                      height={15}
                      radius={0}
                      width={3}
                    />
                  }
                />
              ))}
        </div>
      </div>
      <AllProduct heading={"Your Product"} />
    </div>
  );
};

export default Home;
