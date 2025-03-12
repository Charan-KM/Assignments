import { createSelector } from "@reduxjs/toolkit";

const selectCompanyState = (state) => state.company;

export const selectCompanyOverview = createSelector(
  [selectCompanyState],
  (company) => company.overview
);

export const selectCompanyIncomeStatement = createSelector(
  [selectCompanyState],
  (company) => company.incomeStatement || []
);

export const selectCompanyStatus = createSelector(
  [selectCompanyState],
  (company) => ({ status: company.status, error: company.error })
);