import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./reducers/stock";

const store = configureStore({
  reducer: {
    stocks: stockReducer,
  },
});

export default store;