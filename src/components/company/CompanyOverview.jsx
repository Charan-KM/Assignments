import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompanyOverview, fetchIncomeStatement } from "../../store/reducers/company";
import { selectCompanyOverview, selectCompanyIncomeStatement, selectCompanyStatus } from "../../store/selectors/company";
import IncomeStatementChart from "./IncomeStatementChart";

const CompanyOverview = () => {
  const dispatch = useDispatch();
  const overview = useSelector(selectCompanyOverview);
  const incomeStatement = useSelector(selectCompanyIncomeStatement);
  const { status, error } = useSelector(selectCompanyStatus);

  useEffect(() => {
    dispatch(fetchCompanyOverview());
    dispatch(fetchIncomeStatement());
  }, [dispatch]);

  if (status === "loading")
    return <p className="text-gray-400 text-center">Loading...</p>;
  if (status === "failed")
    return <p className="text-red-500 text-center">Error: {error}</p>;

  const companyDetails = [
    { label: "Sector", value: overview?.Sector },
    { label: "Industry", value: overview?.Industry },
    { label: "Market Cap", value: `$${overview?.MarketCapitalization}` },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-100">
          {overview?.Name} ({overview?.Symbol})
        </h1>
        <p className="text-gray-400 mt-4">{overview?.Description}</p>

        <div className="mt-6 p-6 bg-gray-800 rounded-xl shadow-lg">
          {companyDetails.map((detail, index) => (
            <p key={index} className="text-gray-300">
              <strong>{detail.label}:</strong> {detail.value}
            </p>
          ))}
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Income Statement</h2>
          {incomeStatement.length > 0 ? (
            <IncomeStatementChart data={incomeStatement} />
          ) : (
            <p className="text-gray-500">No income statement data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyOverview;