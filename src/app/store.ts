import { configureStore } from '@reduxjs/toolkit';
import homeReducer from '../features/home/homeSlice';
import reportsReducer from '../features/reports/reportsSlice';
import aiReducer from '../features/ai/aiSlice';

export const store = configureStore({
  reducer: {
    home: homeReducer,
    reports: reportsReducer,
    ai: aiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
