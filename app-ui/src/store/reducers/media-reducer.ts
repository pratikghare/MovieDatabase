import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompactMediaResults, Media, MediaReducer, MediaType, Movie, Person, TvShow } from '../../context/media-context';
import { fetchByMultiSearch } from '../../service/media-service';
import { fetchMediaDetails } from '../../service/media-detail-service';

const initialState: MediaReducer = {
    search: {
        page: 0,
        totalPages: 0,
        totalResults: 0,
        list: []
    }
}

const mediaSlice = createSlice({
    name: 'mediaSlice', initialState,
    reducers: {
        clearDetails: (state: MediaReducer) => ({...state, details: undefined}),
        setDetails: (state: MediaReducer, action: PayloadAction<Movie | Person | TvShow>) => ({ ...state, details: action.payload }),
        updateMediaDetails: (state: MediaReducer, action: PayloadAction<Media>) => ({...state, details: action.payload}),
    },
    extraReducers: (builder) => {
        builder.addCase(searchQuery.fulfilled, (state: MediaReducer, action: PayloadAction<CompactMediaResults>) => ({ ...state, search: action.payload ? action.payload : initialState.search })),
        builder.addCase(detailsQuery.fulfilled, (state: MediaReducer, action: PayloadAction<Movie | Person | TvShow>) => ({ ...state, details: action.payload }))
    }
})

export const searchQuery = createAsyncThunk(
    'mediaSlice/searchQuery',
    async (query: string) => await fetchByMultiSearch(query)
);

export const detailsQuery = createAsyncThunk(
    'mediaSlice/detailsQuery',
    async ({ id, media } : { id: string, media: MediaType }) => await fetchMediaDetails(id, media)
);

export const { clearDetails, updateMediaDetails } = mediaSlice.actions;
export default mediaSlice.reducer;