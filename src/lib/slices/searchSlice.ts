import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ItemSearch = {
  value: string;
  enableSearch: boolean;
};

const initialState = {
  value: "",
  enableSearch: false,
} satisfies ItemSearch as ItemSearch;

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
    setSearchStatus(state, action: PayloadAction<boolean>) {
      state.enableSearch = action.payload;
    },
  },
});

export const searchSliceName = searchSlice.name;
export const { setSearchValue, setSearchStatus } = searchSlice.actions;
export default searchSlice.reducer;
