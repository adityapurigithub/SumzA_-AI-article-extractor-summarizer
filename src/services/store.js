// not able to understand and remember ...all on docs .dont worry!!!

import { configureStore } from "@reduxjs/toolkit";

import { articleApi } from "./article";

export const store = configureStore({
  //store is the global state store
  reducer: { [articleApi.reducerPath]: articleApi.reducer }, //reducers give the slice of state as we always dont need the whole store...only what we need

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articleApi.middleware),
});
