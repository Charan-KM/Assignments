import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StockTablePage from "./pages/stocks/StockTablePage";
import CompanyPage from "./pages/company/CompanyPage";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <Routes>
          <Route path="/" element={<StockTablePage />} />
          <Route path="/company/:ticker" element={<CompanyPage />} />
        </Routes>
      </StrictMode>
    </BrowserRouter>
  </Provider>
);