import { createSlice } from '@reduxjs/toolkit';


export const ReportsSlice = createSlice({
  name: 'reports',
  initialState: [],
  reducers: {
    addReport: (state, action) => [...state, ...action.payload]
  }
});

export const { addReport } = ReportsSlice.actions;
export const ReportsReducer = ReportsSlice.reducer;