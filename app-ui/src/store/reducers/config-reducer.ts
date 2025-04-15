import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigationKeyType, NavigationTabKeys } from "../../context/common";
import { setCurrentTabStorage } from "../../utils/storage-utils";
import { MediaType } from "../../context/media-context";

interface Config {
    loader: boolean;
    tab: NavigationKeyType;
    backdrop?: string;
    mediaType?: MediaType;
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
    // mediaType: MediaType.PERSON
}

const config = createSlice({
    name: "config", initialState,
    reducers: {
        updateLoader: (state: any, action: PayloadAction<boolean>) => ({ ...state, loader: action.payload }),
        updateCurrentTab: (state: any, action: PayloadAction<NavigationKeyType>) => {
            setCurrentTabStorage(action.payload);
            return { ...state, tab: action.payload };
        },
        updateBackdrop: (state: any, action: PayloadAction<string | undefined>) => ({ ...state, backdrop: action.payload }),
        updateMediaType: (state: any, action: PayloadAction<MediaType>) => ({ ...state, mediaType: action.payload })
    }
});


export const { updateLoader, updateCurrentTab, updateBackdrop, updateMediaType } = config.actions;
export default config.reducer;