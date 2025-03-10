import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./reducers/stocks";

const store = configureStore({
  reducer: {
    stocks: stockReducer,
  },
});

export default store;