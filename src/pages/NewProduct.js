import React, { useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { Image } from "../utilits/ImageBase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewProduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImg = async (e) => {
    const Data = await Image(e.target.files[0]);
    setData((prev) => ({
      ...prev,
      image: Data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, image, category, price } = data;

    if (name && image && category && price) {
      const fetchData = await fetch(
        "http://localhost:4000/users/uploadProduct",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const fetchResponse = await fetchData.json();

      toast.success(fetchResponse.message, {
        position: toast.POSITION.TOP_CENTER,
      });

      setData(() => {
        return {
          name: "",
          category: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast.error("Enter required field", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md flex flex-col shadow p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          className="bg-slate-200 p-1"
          onChange={handelChange}
        />
        <label>Category</label>
        <select
          className="bg-slate-200 p-1 my-1"
          name="category"
          value={data.category}
          onChange={handelChange}
          id="category"
        >
          <option value="other">select category</option>
          <option value="fruit">Fruit</option>
          <option value="vegetable">vegetable</option>
          <option value="IceCream">IceCream</option>
          <option value="Dosa">Dosa</option>
          <option value="Pizza">Pizza</option>
          <option value="rice">rice</option>
          <option value="cake">cake</option>
          <option value="biryani">biryani</option>
          <option value="burger">burger</option>
          <option value="chicken">chicken</option>
          <option value="sandwich">sandwich</option>
          <option value="paneer">paneer</option>
          <option value="noodles">noodles</option>
        </select>

        <label htmlFor="image" className="cursor-pointer">
          Image
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className=" h-full" alt="#"/>
            ) : (
              <span className="text-5xl">
                <BsCloudUpload />
              </span>
            )}
            <input
              type="file"
              accept="image/"
              // value={data.image}
              id="image"
              onChange={handleUploadImg}
              className="hidden"
            />
          </div>
        </label>

        <label htmlFor="price" className="my-2">
          Price
        </label>
        <input
          type="text"
          name="price"
          value={data.price}
          onChange={handelChange}
          className="bg-slate-200 p-1 my-1"
        />

        <label htmlFor="description">Description</label>
        <textarea
          rows={2}
          name="description"
          value={data.description}
          onChange={handelChange}
          className="bg-slate-200 p-1 my-1 resize-none"
        ></textarea>
        <button
          type="submit"
          className="p-1 text-white text-md bg-red-400 hover:bg-red-600 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
