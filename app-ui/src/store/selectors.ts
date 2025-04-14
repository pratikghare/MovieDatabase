import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch<AppDispatch>;

// Selectors
export const configSelector = (state: RootState) => state.config;
export const mediaSelector = (state: RootState) => state.mediaSlice;