import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../reducers/searchSlice";
import homeSlice from "../reducers/homeSlice";
import detailSlice from "../reducers/detailSlice";

export const store = configureStore({
    reducer: {
        search: searchSlice,
        home: homeSlice,
        details: detailSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;