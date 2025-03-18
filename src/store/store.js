import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./reducers/stocks";
import companyReducer from "./reducers/company";
import productReducer from "./reducers/products";

const store = configureStore({
  reducer: {
    stocks: stocksReducer,
    company: companyReducer,
    products: productReducer,
  },
});

export default store;