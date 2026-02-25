import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { CoinSummary, CoinDetail } from '../../types';
import { fetchTopCoins, fetchCoinDetail } from '../../services';

interface HomeState {
  coins: CoinSummary[];
  selectedIds: string[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
  lastFetchedAt: number | null;
  coinDetails: Record<string, CoinDetail>;
  detailLoading: string | null;
  pendingCoinId: string | null;
  dialogOpen: boolean;
}

const PERSIST_KEY = 'crypto_selectedIds';

const loadPersistedIds = (): string[] => {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (raw) return JSON.parse(raw) as string[];
  } catch {}
  return [];
};

const initialState: HomeState = {
  coins: [],
  selectedIds: loadPersistedIds(),
  searchQuery: '',
  loading: true,
  error: null,
  lastFetchedAt: null,
  coinDetails: {},
  detailLoading: null,
  pendingCoinId: null,
  dialogOpen: false,
};

export const loadCoins = createAsyncThunk(
  'home/loadCoins',
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { home: HomeState };
    const TTL = 5 * 60 * 1000;
    if (
      state.home.lastFetchedAt &&
      Date.now() - state.home.lastFetchedAt < TTL &&
      state.home.coins.length > 0
    ) {
      return state.home.coins;
    }
    try {
      return await fetchTopCoins();
    } catch (err) {
      return rejectWithValue(
        err instanceof Error ? err.message : 'Unable to load data',
      );
    }
  },
);

export const loadCoinDetail = createAsyncThunk(
  'home/loadCoinDetail',
  async (coinId: string, { getState, rejectWithValue }) => {
    const state = getState() as { home: HomeState };
    if (state.home.coinDetails[coinId]) {
      return state.home.coinDetails[coinId]!;
    }
    try {
      return await fetchCoinDetail(coinId);
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    toggleCoinSelection(state, action: PayloadAction<string>) {
      const id = action.payload;
      const idx = state.selectedIds.indexOf(id);
      if (idx >= 0) {
        state.selectedIds.splice(idx, 1);
      } else {
        if (state.selectedIds.length >= 5) {
          state.pendingCoinId = id;
          state.dialogOpen = true;
          return;
        }
        state.selectedIds.push(id);
      }
      localStorage.setItem(PERSIST_KEY, JSON.stringify(state.selectedIds));
    },
    replaceCoinSelection(state, action: PayloadAction<{ removeId: string; addId: string }>) {
      const { removeId, addId } = action.payload;
      state.selectedIds = state.selectedIds.filter((id) => id !== removeId);
      state.selectedIds.push(addId);
      state.pendingCoinId = null;
      state.dialogOpen = false;
      localStorage.setItem(PERSIST_KEY, JSON.stringify(state.selectedIds));
    },
    closeDialog(state) {
      state.pendingCoinId = null;
      state.dialogOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCoins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCoins.fulfilled, (state, action) => {
        state.coins = action.payload;
        state.loading = false;
        state.lastFetchedAt = Date.now();
      })
      .addCase(loadCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loadCoinDetail.pending, (state, action) => {
        state.detailLoading = action.meta.arg;
      })
      .addCase(loadCoinDetail.fulfilled, (state, action) => {
        state.coinDetails[action.payload.id] = action.payload;
        state.detailLoading = null;
      })
      .addCase(loadCoinDetail.rejected, (state) => {
        state.detailLoading = null;
      });
  },
});

export const {
  setSearchQuery,
  toggleCoinSelection,
  replaceCoinSelection,
  closeDialog,
} = homeSlice.actions;

export default homeSlice.reducer;
