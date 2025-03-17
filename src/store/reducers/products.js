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
    addProduct: (state, action) => {
      state.products = [action.payload, ...state.products];
    },
    updateProduct: (state, action) => {
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
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
  addProduct,
  updateProduct,
} = productsSlice.actions;


// Fetch categories
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
      console.log("API Response:", data);
      
      if (skip === 0) {
        dispatch(setProducts(data.products));
      } else {
        dispatch(addProducts(data.products));
      }
    } catch (error) {
      console.error("API Error:", error);
      dispatch(setError("Failed to load products"));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  
  export const createProduct = (productData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post("https://dummyjson.com/products/add", productData, {
        headers: { "Content-Type": "application/json" },
      });
      dispatch(addProduct(data));
    } catch (error) {
      dispatch(setError("Failed to add product"));
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  export const editProduct = (productId, updatedData) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(`https://dummyjson.com/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) throw new Error("Failed to update product");
      
  
      const updatedProduct = await response.json();
      dispatch(updateProduct(updatedProduct));
    } catch (error) {
      console.error("Edit Error:", error);
      dispatch(setError("Failed to update product"));
    } finally {
      dispatch(setLoading(false));
    }
  };  

export default productsSlice.reducer;