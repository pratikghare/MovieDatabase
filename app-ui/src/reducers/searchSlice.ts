import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {  SearchResults } from "../Model/Model";
import { getSearchResultsData } from "../services/Utilities";
import { searchByQuery } from "../services/MediaService";

const initialState: SearchResults = {
    page: 0,
    totalPages: 0,
    totalResults: 0,
    list: []
}

const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {
        clearSearchResults: () => {
            return { page: 0, totalPages: 0, totalResults: 0, list: [] }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getSearchResults.fulfilled, (state, action: PayloadAction<any>) => action.payload ? getSearchResultsData(action.payload) : state)
    }
});

export const getSearchResults = createAsyncThunk(
    "searchSlice/getSearchResults",
    async (query: string) => {
        if(query && query.length > 3) {
            const data = await searchByQuery(query);
            if(!data || (data.success !== undefined && data.success === false)) return null;
            return data;
        }
        return null;
    }
);

export const { clearSearchResults } = searchSlice.actions;
export default searchSlice.reducer;