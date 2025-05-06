import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigationKeyType, NavigationTabKeys } from "../../context/common";
import { setCurrentTabStorage } from "../../utils/storage-utils";
import { MediaType, PAGES } from "../../context/media-context";

interface Config {
    loader: boolean;
    tab: NavigationKeyType;
    background?: string;
    backgroundColor?: string;
    mediaType?: MediaType;
    isLoggedIn: boolean;
    comingFrom: PAGES;
    theme: {
        theme: "light" | "dark" | "system";
        current: "light" | "dark";
    }
}

const initialState: Config = {
    loader: true,
    tab: NavigationTabKeys.home,
    theme: {
        theme: "dark",
        current: "dark"
    },
    isLoggedIn: false,
    comingFrom: PAGES.HOME
}

const config = createSlice({
    name: "config", initialState,
    reducers: {
        updateLoader: (state: any, action: PayloadAction<boolean>) => ({ ...state, loader: action.payload }),
        updateCurrentTab: (state: any, action: PayloadAction<NavigationKeyType>) => {
            setCurrentTabStorage(action.payload);
            return { ...state, tab: action.payload };
        },
        updateBackground: (state: any, action: PayloadAction<string | undefined>) => ({ ...state, background: action.payload }),
        updateBackgroundColor: (state: any, action: PayloadAction<string | undefined>) => ({ ...state, backgroundColor: action.payload }),
        updateComingFrom: (state: any, action: PayloadAction<PAGES>) => ({ ...state, comingFrom: action.payload }),
        toggleTheme: (state: any) => {
            const theme = state.theme.current === 'light' ? 'dark' : 'light';
            const backgroundColor = state.backgroundColor ? state.backgroundColor : state.theme.current === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)';
            return { ...state, theme: { theme, current: theme }, backgroundColor }
        },
        updateConfigTheme: (state: any, action: PayloadAction<'light' | 'dark' | 'system'>) => {
            const theme = action.payload;
            const current = theme === 'system' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : theme;
            return { ...state, theme: { theme, current } }
        },
    }
});


export const { updateLoader, updateCurrentTab, updateBackground, updateBackgroundColor, toggleTheme, updateConfigTheme, updateComingFrom } = config.actions;
export default config.reducer;