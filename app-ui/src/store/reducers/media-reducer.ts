import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompactMediaResults, HomePageGrid, Media, MediaReducer, MediaType, Movie, Person, TvShow } from '../../context/media-context';
import { fetchByMultiSearch, fetchHomePageGrid } from '../../service/media-service';
import { fetchMediaDetails } from '../../service/media-detail-service';

const initialState: MediaReducer = {
    search: {
        page: 0,
        totalPages: 0,
        totalResults: 0,
        list: []
    },
    loader: true,
    homePageLoader: true,
    homePage: undefined
}

const mediaSlice = createSlice({
    name: 'mediaSlice', initialState,
    reducers: {
        clearDetails: (state: MediaReducer) => ({...state, details: undefined, loader: true }),
        setDetails: (state: MediaReducer, action: PayloadAction<Movie | Person | TvShow>) => ({ ...state, details: action.payload }),
        updateMediaDetails: (state: MediaReducer, action: PayloadAction<Media>) => ({...state, details: action.payload}),
    },
    extraReducers: (builder) => {
        builder.addCase(searchQuery.fulfilled, (state: MediaReducer, action: PayloadAction<CompactMediaResults>) => ({ ...state, search: action.payload ? action.payload : initialState.search }))

        builder.addCase(homePageQuery.pending, (state: MediaReducer) => ({ ...state, homePageLoader: true }))
        builder.addCase(homePageQuery.fulfilled, (state: MediaReducer, action: PayloadAction<HomePageGrid | undefined>) => ({ ...state, homePage: action.payload, homePageLoader: false  }))

        builder.addCase(detailsQuery.pending, (state: MediaReducer) => ({ ...state, loader: true }))
        builder.addCase(detailsQuery.fulfilled, (state: MediaReducer, action: PayloadAction<Movie | Person | TvShow>) => ({ ...state, details: action.payload, loader: false }))
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

export const homePageQuery = createAsyncThunk(
    'mediaSlice/homePageQuery',
    async () => await fetchHomePageGrid()
);

export const { clearDetails, updateMediaDetails } = mediaSlice.actions;
export default mediaSlice.reducer;