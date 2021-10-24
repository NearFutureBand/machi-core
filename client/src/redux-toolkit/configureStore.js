import { configureStore } from '@reduxjs/toolkit';
import { ReportsReducer as reports, AppReducer as app } from "./slices";

export const store = configureStore({
 reducer: { reports, app },
 //middleware,
 devTools: process.env.NODE_ENV !== 'production',
});