import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  productList: [],
  cartItem: [],
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload];
    },
    addCartItems: (state, action) => {
      const check = state.cartItem.some((e) => e._id === action.payload._id);
      if (check) {
        toast.info("Already Item in cart", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        toast.success("Item added successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        const total = action.payload.price;
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ];
      }
    },
    deleteCartItems: (state, action) => {
      toast.error("Item Deleted", {
        position: toast.POSITION.TOP_CENTER,
      });
      const indexProduct = state.cartItem.findIndex(
        (e) => e._id === action.payload
      );
      state.cartItem.splice(indexProduct, 1);
    },
    increaseQty: (state, action) => {
      const indexProduct = state.cartItem.findIndex(
        (e) => e._id === action.payload
      );
      let qty = state.cartItem[indexProduct].qty;
      const qtyIncrease = ++qty;
      state.cartItem[indexProduct].qty = qtyIncrease;

      const price = state.cartItem[indexProduct].price;
      const total = price * qtyIncrease;

      state.cartItem[indexProduct].total = total;
    },
    decreaseQty: (state, action) => {
      const indexProduct = state.cartItem.findIndex(
        (e) => e._id === action.payload
      );

      let qty = state.cartItem[indexProduct].qty;

      if (qty > 1) {
        const qtyDecrease = --qty;
        state.cartItem[indexProduct].qty = qtyDecrease;

        const price = state.cartItem[indexProduct].price;
        const total = price * qtyDecrease;

        state.cartItem[indexProduct].total = total;
      } else {
        toast.error("Are you sure? to remove Item", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
    },
    clearCart: (state) => {
      state.cartItem = [];
      toast.info("Cart cleared", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  },
});

export const {
  setDataProduct,
  addCartItems,
  increaseQty,
  decreaseQty,
  deleteCartItems,
  clearCart,
} = ProductSlice.actions;
export default ProductSlice.reducer;
