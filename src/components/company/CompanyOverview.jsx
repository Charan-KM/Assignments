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

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold">{overview?.Name} ({overview?.Symbol})</h1>
      <p className="text-gray-600">{overview?.Description}</p>
      <p><strong>Sector:</strong> {overview?.Sector}</p>
      <p><strong>Industry:</strong> {overview?.Industry}</p>
      <p><strong>Market Cap:</strong> ${overview?.MarketCapitalization}</p>

      {incomeStatement.length > 0 ? (
        <IncomeStatementChart data={incomeStatement} />
      ) : (
        <p>No income statement data available.</p>
      )}
    </div>
  );
};

export default CompanyOverview;