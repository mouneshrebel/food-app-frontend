import React, { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
import CardItems from "./CardItems";
import { useSelector } from "react-redux";
import { FadeLoader } from "react-spinners";

const AllProduct = ({ heading }) => {
  const [filter, setFilter] = useState("")
  const product = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(product.map((e) => e.category))];
  const [dataFilter, setDataFilter] = useState(product);
  const scrollLoading = new Array(10).fill(null);
 
  useEffect(() => {
    setDataFilter(product);
  }, [product]);

  const handleFilter = (category) => {
    setFilter(category)
    const filter = product.filter(
      (e) => e.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  return (
    <div className="m-5">
      <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>
      <div className="flex gap-4 justify-center overflow-scroll scrollbar-none cursor-pointer">
        {categoryList[0] ? (
          categoryList.map((e) => {
            return (
              <FilterProduct
                category={e}
                isActive = {e.toLowerCase() === filter.toLowerCase()}
                key={e}
                onClick={() => handleFilter(e)}
              />
            );
          })
        ) : (
          <div className="flex justify-center items-center h-full">
            <p>
              <FadeLoader color="#36d7b7" width={3} />
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter[0]
          ? dataFilter.map((e) => {
              return (
                <CardItems
                  key={e._id}
                  id={e._id}
                  image={e.image}
                  name={e.name}
                  category={e.category}
                  price={e.price}
                />
              );
            })
          : scrollLoading.map((e, i) => (
              <CardItems
                key={i}
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
  );
};

export default AllProduct;
