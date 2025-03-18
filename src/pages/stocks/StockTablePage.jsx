import React from "react";
import { Link } from "react-router-dom";
import TopGainers from "../../components/StockTables/TopGainers";
import TopLosers from "../../components/StockTables/TopLosers";

const StockTablesPage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stock Market Overview</h1>
        
        <Link to="/products">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Products
          </button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <TopGainers />
        <TopLosers />
      </div>
    </div>
  );
};

export default StockTablesPage;