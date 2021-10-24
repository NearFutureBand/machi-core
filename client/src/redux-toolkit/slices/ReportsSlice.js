import { createSlice } from '@reduxjs/toolkit';


export const ReportsSlice = createSlice({
  name: 'reports',
  initialState: [],
  reducers: {
    addReport: (state, action) => [...[...action.payload].reverse(), ...state]
  }
});

export const { addReport } = ReportsSlice.actions;
export const ReportsReducer = ReportsSlice.reducer;