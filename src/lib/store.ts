import { configureStore } from "@reduxjs/toolkit";
import searchSlicereducer, { searchSliceName } from "./slices/searchSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [searchSliceName]: searchSlicereducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
