import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMemes = createAsyncThunk<Meme[]>("memes/fetchMemes", async () => {
  const response = await fetch("https://api.imgflip.com/get_memes");
  const data = await response.json();
  return data.data.memes;
});

export interface Meme {
  id: string;
  name: string;
  url: string;
  width?: number;
  height?: number;
  box_count?: number;
  isLiked: boolean;
}

interface MemesState {
  memes: Meme[];
  loading: boolean;
  error: string | null;
}

const initialState: MemesState = {
  memes: [],
  loading: false,
  error: null,
};

const memesSlice = createSlice({
  name: "memes",
  initialState,
  reducers: {
    addCustomMeme(state, action) {
      state.memes.push(action.payload);
    },
    removeMeme(state, action) {
      state.memes = state.memes.filter((meme) => meme.id !== action.payload);
    },
    toggleLike(state, action) {
      const id = action.payload;
      const meme = state.memes.find((m) => m.id === id);
      if (meme) meme.isLiked = !meme.isLiked;
    },
    updateMeme(state, action) {
      const index = state.memes.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.memes[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMemes.fulfilled, (state, action) => {
        state.loading = false;
        state.memes = action.payload
          .slice(0, 99)
          .map((m) => ({ ...m, isLiked: false }));
      })
      .addCase(fetchMemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки мемов";
      });
  },
});

export const { removeMeme, toggleLike, addCustomMeme, updateMeme } = memesSlice.actions;
export default memesSlice.reducer;