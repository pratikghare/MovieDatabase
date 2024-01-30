import { db } from "../environment/environment";
import { fetchDbApi } from "./ApiService";
import { sortMoviesListBy, getPhotoUrl, getName, getOriginalName, getYear, getRunTime, genres, getGenreNamesByIds, getSubText, getRelevanceSearchBarResults, getVotes, detailsSubText, getOfficialVideo, getVideoUrl, getPhotosList, getRottenTomatoesRating, getOverview, getBirthDay, storeRecents, parseString, clearRecents, getDirectors, getProducers, getWriters, setValue, filterListByEqualPropertyValue, filterListByIncludesPropertyValue, getMediaAndIdInfoFromUrl, streamingDimensions, getStreamingDimensionsUrl, getMoreDetails, getStreamingPageUrl } from "./DataUtils";
import { getTrendingMovies, getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpCommingMovies, getMoviesBySearch, getMovieDetailsById, getMovieDetailsByImdbId, getCreditsByMovieId, getPhotosByMovieId, getVideosByMovieId, getSimilarMoviesById, getStreamingDetailsByMovieId } from "./MovieService";
import { getTrendingPeople, getPopularPeople, getPeopleBySearch, getPersonDetailsById, getPhotosByPersonId, getCreditsByPersonId, getMovieCreditsByPersonId, getTVCreditsByPersonId } from "./PersonService";
import { getTrendingTV, getPopularTV, getTopRatedTV, getTVsBySearch, getTVDetailsById, getTVDetailsByImdbId, getVideosByTvId, getCreditsByTvId, getPhotosByTvId, getExternalIdsByTvId, getStreamingDetailsByTvId } from "./TvService";

function multiSearchQuery(query: string): Promise<any>{
    return fetchDbApi(db.multiSearch+`query=${query}&`);
}

export {
    multiSearchQuery,

    getTrendingMovies, getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpCommingMovies, 
    getMoviesBySearch, getMovieDetailsById, getMovieDetailsByImdbId, getCreditsByMovieId, getPhotosByMovieId, getVideosByMovieId, getSimilarMoviesById,
    
    getTrendingPeople, getPopularPeople, getPeopleBySearch, getStreamingDetailsByMovieId,
    getPersonDetailsById, getPhotosByPersonId, getCreditsByPersonId, getMovieCreditsByPersonId, getTVCreditsByPersonId,
    
    getTrendingTV, getPopularTV, getTopRatedTV, getExternalIdsByTvId, getStreamingDetailsByTvId,
    getTVsBySearch, getTVDetailsById, getTVDetailsByImdbId, getVideosByTvId, getCreditsByTvId, getPhotosByTvId,

    sortMoviesListBy, getPhotoUrl, getName, getOverview, getOriginalName, getYear, getRunTime, getGenreNamesByIds, getSubText, detailsSubText,
    getRelevanceSearchBarResults, getVotes, getOfficialVideo, getVideoUrl, getPhotosList, getRottenTomatoesRating, genres,
    getBirthDay, storeRecents, parseString, clearRecents,

    getProducers, getDirectors,  getWriters, setValue, filterListByEqualPropertyValue, filterListByIncludesPropertyValue, getMediaAndIdInfoFromUrl,
    streamingDimensions, getStreamingDimensionsUrl, getMoreDetails, getStreamingPageUrl,
}

export interface Recent{
    id: string;
    name: string;
    mediaType: string;
    imageUrl: string;
    year?: string;
    subText: string;
}