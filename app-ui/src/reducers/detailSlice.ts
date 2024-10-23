import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BaseSearch, MediaDetails } from "../Model/Model";
import { getCredits, getMassagedCreditsList, getMassagedData, getMassagedImagesList, updateOMDBDetails } from "../services/Utilities";
import { fetchCredits, fetchDetails, fetchExternalIds, fetchImages, fetchSimilar, fetchVideos, fetchWatchProviders, fetcOMDBDetails } from "../services/MediaService";

const initialState: MediaDetails = getMassagedData(null);

const detailSlice = createSlice({
    name: "detailSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getDetails.fulfilled, (state, action: PayloadAction<any>) => getMassagedData(action.payload, state))
        .addCase(getExternalIds.fulfilled, (state, action: PayloadAction<any>) => ({ ...state, imdbId: action?.payload?.imdb_id }))
        .addCase(getOMDetails.fulfilled, (state, action: PayloadAction<any>) => updateOMDBDetails(action.payload, state))
        .addCase(getFullCredits.fulfilled, (state, action: PayloadAction<any>) => ({...state, credits: getCredits(action.payload, state)}))
        // .addCase(getVideos.fulfilled, (state, action: PayloadAction<any>) => ({...state, credits: getCredits(action.payload)}))
        .addCase(getImages.fulfilled, (state, action: PayloadAction<any>) => ({...state, images: getMassagedImagesList(action.payload)}))
        // .addCase(getWatchProviders.fulfilled, (state, action: PayloadAction<any>) => ({...state, credits: getCredits(action.payload)}))
        .addCase(getSimilar.fulfilled, (state, action: PayloadAction<any>) => ({...state, similar: getMassagedCreditsList(action.payload?.results)}))
    }
});

export const getDetails = createAsyncThunk(
    "detailSlice/getDetails",
    async (item: BaseSearch) => {
        if(item && item.mediaType !== null){
            const data = await fetchDetails(item.id, item.mediaType);
            if(!data || (data.success !== undefined && data.success === false)) return null;
            return {...data, media_type: item.mediaType};
        }
        return null;
    }
);
export const getExternalIds = createAsyncThunk(
    "detailSlice/getExternalIds",
    async (id: number) => {
        const data = await fetchExternalIds(id);
        if(!data || (data.success !== undefined && data.success === false)) return null;
        return data;
    }
);
export const getOMDetails = createAsyncThunk(
    "detailSlice/getOMDetails",
    async (id: string) => {
        const data = await fetcOMDBDetails(id);
        if(data?.Response === "True") return data;
        return null;
    }
);
export const getFullCredits = createAsyncThunk(
    "detailSlice/getFullCredits",
    async (item: BaseSearch) => {
        if(item && item.mediaType !== null){
            const data = await fetchCredits(item.id, item.mediaType);
            if(!data || (data.success !== undefined && data.success === false)) return null;
            return {...data, media_type: item.mediaType};
        }
        return null;
    }
);
export const getVideos = createAsyncThunk(
    "detailSlice/getVideos",
    async (item: BaseSearch) => {
        if(item && item.mediaType !== null){
            const data = await fetchVideos(item.id, item.mediaType);
            if(!data || (data.success !== undefined && data.success === false)) return null;
            return {...data, media_type: item.mediaType};
        }
        return null;
    }
);
export const getImages = createAsyncThunk(
    "detailSlice/getImages",
    async (item: BaseSearch) => {
        if(item && item.mediaType !== null){
            const data = await fetchImages(item.id, item.mediaType);
            if(!data || (data.success !== undefined && data.success === false)) return null;
            return {...data, media_type: item.mediaType};
        }
        return null;
    }
);
export const getWatchProviders = createAsyncThunk(
    "detailSlice/getWatchProviders",
    async (item: BaseSearch) => {
        if(item && item.mediaType !== null){
            const data = await fetchWatchProviders(item.id, item.mediaType);
            if(!data || (data.success !== undefined && data.success === false)) return null;
            return {...data, media_type: item.mediaType};
        }
        return null;
    }
);
export const getSimilar = createAsyncThunk(
    "detailSlice/getSimilar",
    async (item: BaseSearch) => {
        if(item && item.mediaType !== null){
            const data = await fetchSimilar(item.id, item.mediaType);
            if(!data || (data.success !== undefined && data.success === false)) return null;
            return {...data, media_type: item.mediaType};
        }
        return null;
    }
);



export default detailSlice.reducer;