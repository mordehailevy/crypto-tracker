import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AiRecommendation, AiCoinInput } from '../../types';
import { fetchAiRecommendation } from '../../services';

interface AiSliceState {
  recommendations: Record<string, AiRecommendation>;
  loadingCoinId: string | null;
  error: string | null;
}

const initialState: AiSliceState = {
  recommendations: {},
  loadingCoinId: null,
  error: null,
};

export const getAiRecommendation = createAsyncThunk(
  'ai/getRecommendation',
  async (coin: AiCoinInput, { rejectWithValue }) => {
    try {
      return await fetchAiRecommendation(coin);
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'AI error');
    }
  },
);

const aiSlice = createSlice({
  name: 'ai',
  initialState,
  reducers: {
    clearAiError(state) {
      state.error = null;
    },
    clearRecommendations(state) {
      state.recommendations = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAiRecommendation.pending, (state, action: PayloadAction<unknown, string, { arg: AiCoinInput }>) => {
        state.loadingCoinId = action.meta.arg.id;
        state.error = null;
      })
      .addCase(getAiRecommendation.fulfilled, (state, action) => {
        state.recommendations[action.payload.coinId] = action.payload;
        state.loadingCoinId = null;
      })
      .addCase(getAiRecommendation.rejected, (state, action) => {
        state.loadingCoinId = null;
        state.error = action.payload as string;
      });
  },
});

export const { clearAiError, clearRecommendations } = aiSlice.actions;

export default aiSlice.reducer;
