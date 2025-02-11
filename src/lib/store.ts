import { configureStore } from "@reduxjs/toolkit";
import searchSlicereducer, { searchSliceName } from "./slices/searchSlice";
import searchApiSlice from "./slices/searchApiSlice";
import favoritesApiSlice from "./slices/favoritesApiSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [searchSliceName]: searchSlicereducer,
      searchApi: searchApiSlice.reducer,
      favoritesApi: favoritesApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(favoritesApiSlice.middleware)
        .concat(searchApiSlice.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
