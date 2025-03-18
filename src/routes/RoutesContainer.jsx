import React from "react";
import { Routes, Route } from "react-router-dom";
import StockTablePage from "../pages/stocks/StockTablePage";
import CompanyPage from "../pages/company/CompanyPage";
import ProductsPage from "../pages/products/ProductsPage";

const RoutesContainer = () => {
  return (
    <Routes>
      <Route path="/" element={<StockTablePage />} />
      <Route path="/company/:ticker" element={<CompanyPage />} />
      <Route path="/products" element={<ProductsPage />} />
    </Routes>
  );
};

export default RoutesContainer;