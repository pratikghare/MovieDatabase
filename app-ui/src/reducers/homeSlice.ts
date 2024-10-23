import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { MediaHome, MediaType } from "../Model/Model";
import { fetchNowPlaying, fetchPopularPeople, fetchTopRatedMovies, fetchTopRatedTV, fetchTrendingTV } from "../services/MediaService";
import { getMassagedCreditsList } from "../services/Utilities";

const initialState: Array<MediaHome> = [];

const getState = (state: Array<MediaHome>, data: any, title: string, type: MediaType): Array<MediaHome> => {
    if(!state.find((item: MediaHome) => item.title === title)) return [...state, { title, type, list: getMassagedCreditsList(data.results, type) }]
    return state;
}

const homeSlice = createSlice({
    name: "homeSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getNowPlaying.fulfilled, (state, action: PayloadAction<any>) => getState(current(state), action.payload, "Now Playing", MediaType.MOVIE))
        .addCase(getTopRatedMovies.fulfilled, (state, action: PayloadAction<any>) => getState(current(state), action.payload, "Top Rated Movies", MediaType.MOVIE))
        .addCase(getPopularPeople.fulfilled, (state, action: PayloadAction<any>) => getState(current(state), action.payload, "Popular in Actors", MediaType.PERSON))
        .addCase(getTrendingTV.fulfilled, (state, action: PayloadAction<any>) => getState(current(state), action.payload, "Tending", MediaType.TV))
        .addCase(getTopRatedTV.fulfilled, (state, action: PayloadAction<any>) => getState(current(state), action.payload, "Top Rated Shows", MediaType.TV))
    }
});


export const getNowPlaying = createAsyncThunk(
    "homeSlice/getNowPlaying",
    async () => {
        return await fetchNowPlaying();
    }
);

export const getTopRatedMovies = createAsyncThunk(
    "homeSlice/getTopRatedMovies",
    async () => {
        return await fetchTopRatedMovies();
    }
);

export const getPopularPeople = createAsyncThunk(
    "homeSlice/getPopularPeople",
    async () => {
        return await fetchPopularPeople();
    }
);

export const getTrendingTV = createAsyncThunk(
    "homeSlice/getTrendingTV",
    async () => {
        return await fetchTrendingTV();
    }
);

export const getTopRatedTV = createAsyncThunk(
    "homeSlice/getTopRatedTV",
    async () => {
        return await fetchTopRatedTV();
    }
);



export default homeSlice.reducer;