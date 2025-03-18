import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  categories: [],
  selectedCategory: "",
  limit: 15,
  skip: 0,
  hasMore: true,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.skip = state.limit;
    },
    addProducts: (state, action) => {
      state.products = [...state.products, ...action.payload];
      state.skip += state.limit;
      state.hasMore = action.payload.length === state.limit;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.products = [];
      state.skip = 0;
      state.hasMore = true;
    },
  },
});

export const {
  setLoading,
  setError,
  setCategories,
  setProducts,
  addProducts,
  setSelectedCategory,
} = productsSlice.actions;

export const fetchCategories = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get("https://dummyjson.com/products/categories");
    dispatch(setCategories(data.slice(0, 5)));
  } catch (error) {
    dispatch(setError("Failed to load categories"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchProducts = ({ category, skip }) => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const limit = getState().products.limit;
  const endpoint = category
    ? `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
    : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  try {
    const { data } = await axios.get(endpoint);
    if (skip === 0) {
      dispatch(setProducts(data.products));
    } else {
      dispatch(addProducts(data.products));
    }
  } catch (error) {
    dispatch(setError("Failed to load products"));
  } finally {
    dispatch(setLoading(false));
  }
};

export default productsSlice.reducer;