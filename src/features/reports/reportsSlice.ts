import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { LiveReportPoint } from '../../types';

interface ReportsState {
  history: LiveReportPoint[];
  isPolling: boolean;
  error: string | null;
}

const MAX_POINTS = 60; // keep last 60 seconds

const initialState: ReportsState = {
  history: [],
  isPolling: false,
  error: null,
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    addReportPoint(state, action: PayloadAction<LiveReportPoint>) {
      state.history.push(action.payload);
      if (state.history.length > MAX_POINTS) {
        state.history.shift();
      }
    },
    setPolling(state, action: PayloadAction<boolean>) {
      state.isPolling = action.payload;
    },
    setReportsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearHistory(state) {
      state.history = [];
    },
  },
});

export const { addReportPoint, setPolling, setReportsError, clearHistory } =
  reportsSlice.actions;

export default reportsSlice.reducer;
