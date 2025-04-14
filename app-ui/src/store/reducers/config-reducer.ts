import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigationKeyType, NavigationTabKeys } from "../../context/common";
import { setCurrentTabStorage } from "../../utils/storage-utils";

interface Config {
    loader: boolean;
    tab: NavigationKeyType;
    theme: {
        theme: "light" | "dark" | "system";
        current: "light" | "dark";
    }
}

const initialState: Config = {
    loader: true,
    tab: NavigationTabKeys.home,
    theme: {
        theme: "light",
        current: "light"
    }
}

const config = createSlice({
    name: "config", initialState,
    reducers: {
        updateLoader: (state: any, action: PayloadAction<boolean>) => ({ ...state, loader: action.payload }),
        updateCurrentTab: (state: any, action: PayloadAction<NavigationKeyType>) => {
            setCurrentTabStorage(action.payload);
            return { ...state, tab: action.payload };
        },
    }
});


export const { updateLoader, updateCurrentTab } = config.actions;
export default config.reducer;