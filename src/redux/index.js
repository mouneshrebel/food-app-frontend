import { configureStore } from "@reduxjs/toolkit";
import UserDataSlice from "./UserData";
import ProductSliceReducer from "./ProductSlice";

export const store = configureStore({
  reducer: {
    user: UserDataSlice,
    product : ProductSliceReducer
  },
});
