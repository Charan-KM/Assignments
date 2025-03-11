import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./reducers/stocks";
import companyReducer from "./reducers/company";

const store = configureStore({
  reducer: {
    stocks: stocksReducer,
    company: companyReducer, // ✅ Added company reducer
  },
});

export default store;