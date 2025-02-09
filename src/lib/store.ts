import { configureStore } from "@reduxjs/toolkit";
import searchSlicereducer, { searchSliceName } from "./slices/searchSlice";
import searchApiSlice from "./slices/searchApiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [searchSliceName]: searchSlicereducer,
      searchApi: searchApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(searchApiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
