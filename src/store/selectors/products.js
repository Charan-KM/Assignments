import { createSelector } from "@reduxjs/toolkit";

const selectProductsState = (state) => state.products;

export const selectProducts = createSelector(
  selectProductsState,
  (productsState) => productsState.products
);

export const selectCategories = createSelector(
  selectProductsState,
  (productsState) => productsState.categories
);

export const selectLoading = createSelector(
  selectProductsState,
  (productsState) => productsState.loading
);

export const selectHasMore = createSelector(
  selectProductsState,
  (productsState) => productsState.hasMore
);

export const selectError = createSelector(
  selectProductsState,
  (productsState) => productsState.error
);