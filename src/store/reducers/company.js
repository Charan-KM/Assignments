import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const LOCAL_JSON_PATH = "/constants/ibmData.json"; 

const initialState = {
  overview: null,
  incomeStatement: [],
  status: "idle",
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    fetchCompanyOverviewStart: (state) => {
      state.status = "loading";
    },
    fetchCompanyOverviewSuccess: (state, action) => {
      state.status = "succeeded";
      state.overview = action.payload;
    },
    fetchCompanyOverviewFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    fetchIncomeStatementStart: (state) => {
      state.status = "loading";
    },
    fetchIncomeStatementSuccess: (state, action) => {
      state.status = "succeeded";
      state.incomeStatement = action.payload;
    },
    fetchIncomeStatementFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchCompanyOverviewStart,
  fetchCompanyOverviewSuccess,
  fetchCompanyOverviewFailure,
  fetchIncomeStatementStart,
  fetchIncomeStatementSuccess,
  fetchIncomeStatementFailure,
} = companySlice.actions;

export const fetchCompanyOverview = () => async (dispatch) => {
  dispatch(fetchCompanyOverviewStart());
  try {
    const response = await axios.get(LOCAL_JSON_PATH);
    dispatch(fetchCompanyOverviewSuccess(response.data));
  } catch (error) {
    console.error("Company Overview Fetch Error:", error);
    dispatch(fetchCompanyOverviewFailure(error.message));
  }
};

export const fetchIncomeStatement = () => async (dispatch) => {
  dispatch(fetchIncomeStatementStart());
  try {
    const response = await axios.get(LOCAL_JSON_PATH);
    
    if (!response.data.IncomeStatement) {
      throw new Error("IncomeStatement data is missing!");
    }

    dispatch(fetchIncomeStatementSuccess(response.data.IncomeStatement));
  } catch (error) {
    console.error("Income Statement Fetch Error:", error);
    dispatch(fetchIncomeStatementFailure(error.message));
  }
};

export default companySlice.reducer;