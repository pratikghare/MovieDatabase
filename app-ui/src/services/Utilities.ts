import { APP_IMAGE_PATH, IMAGE_NOT_FOUND, IMAGE_URL, SHORT_IMAGE_URL } from "../environment/environment";
import { BaseSearch, Credit, Credits, Genre, MediaDetails, MediaType, Rating, Recents, SearchResults, Image } from "../Model/Model";
import genres from "../Model/genres.json";
import { encrypt, decrypt } from "./Encryption";
export const months = [ "Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec" ];

// MEDIA TYPE ['person', 'movie', 'tv']
export function getMediaType(item: any): MediaType {
    if(item?.media_type === "tv") return MediaType.TV;
    else if(item?.media_type === "movie") return MediaType.MOVIE;
    return MediaType.PERSON;
}




// BASE CLASSNAMES
export function getBaseClassNames(className?: string, base?: string): string {
    const classNames: string = className && base ? className + " " + base :
    (className ? className : (base ? base : ""));
    return classNames;
}
// CALL BASE CLASS FUNCTIONS
export function callFunction(data?: Credit, callback?: Function | null | undefined) {
    if(callback && data) callback(data);
}



// GET NAMES FROM DATA
export function getName(item: any): string {
    if(item?.name?.length) return item.name; 
    if(item?.title?.length) return item.title; 
    if(item?.original_name?.length) return item.original_name; 
    if(item?.original_title?.length) return item.original_title; 
    return "";
}
export function getOriginalName(item: any): string {
    if(item?.original_name?.length) return item.original_name; 
    if(item?.original_title?.length) return item.original_title; 
    if(item?.name?.length) return item.name; 
    if(item?.title?.length) return item.title;
    return "";
}
// PLOT / OVERVIEW
export function getOverview(item: any): string {
    if(item?.biography) return item.biography;
    else if(item?.overview) return item.overview;
    return "";
}
// COUNTRY
export function getCountry(item: any): string | null {
    if(item?.origin_country?.length) return item.origin_country.join(", ");
    else if(item?.place_of_birth) return item.place_of_birth;
    return null;
}





// Date to be printed in full
export function getDateString(date: string): string {
    if(date && date?.length) {
        let d = new Date(date);
        const year = d.getFullYear();
        const month = months[d.getMonth()];
        const day = d.getDate();
        return `${day} ${month} ${year}`
    }
    return "";
} 
// YEAR OF RELEASE / AIR DATE
export function getYear(item: any): string | null {
    if(item?.release_date) return getDateString(item.release_date).split(" ")[2];
    else if(item?.last_air_date) return getDateString(item.last_air_date).split(" ")[2];
    else if(item?.air_date) return getDateString(item.air_date).split(" ")[2];
    else if(item?.first_air_date) return getDateString(item.first_air_date).split(" ")[2];
    return null;
}
export function getReleased(item: any): string | null {
    if(item?.release_date) return getDateString(item.release_date);
    else if(item?.last_air_date) return getDateString(item.last_air_date);
    else if(item?.air_date) return getDateString(item.air_date);
    else if(item?.first_air_date) return getDateString(item.first_air_date);
    return null;
}





// KNOWN FOR DEPARTMENT
export function getDepartment(item: any): string | null {
    if(item?.known_for_department) {
        if(String(item.known_for_department).toLocaleLowerCase() === "acting") return "Actor";
        if(String(item.known_for_department).toLocaleLowerCase() === "directing") return "Director";
        if(String(item.known_for_department).toLocaleLowerCase() === "writing") return "Writer";
        if(String(item.known_for_department).toLocaleLowerCase() === "sound") return "Music Department";
        if(String(item.known_for_department).toLocaleLowerCase() === "producing") return "Producer";
        return item.known_for_department;
    }
    return null;
}
// KNOWN FOR - Used in Search Results
export function getKnownFor(item: any): string | null {
    const mediaType: MediaType = getMediaType(item);
    if(mediaType === MediaType.PERSON) return item?.known_for?.length ? item?.known_for?.map((knownFor: any) => getName(knownFor)).join(", ") : "";
    return null;
}





// RUNTIME
export function calculateRunTime(runtime: number) {
    let hours = 0, mins = runtime;
    while(runtime >= 60) {
        runtime -= 60;
        hours++;
    }
    mins = runtime;
    return `${hours > 1 ? hours+"h " :""}${mins === 1 ? `${mins}min` : `${mins}mins`}`;
}
export function getRuntime(item: any): string | null {
    if(item?.runtime) return calculateRunTime(item.runtime);
    return null;
}





// SUBTEXT - For Heading - Details
export function getSubtext(details: MediaDetails): Array<string> {
    const subText = [];
    if(details.year?.length) subText.push(details.year);
    if(details.department?.length) subText.push(details.department);
    if(details.runTime?.length) subText.push(details.runTime);
    if(details.deathDate?.length) subText.push("Died - " + details.deathDate);
    if(details?.released?.length) subText.push(details.released);
    if(details?.country?.length) subText.push(details.country);

    return subText;
}





// GENRES
export function getGenresString(item: any): string {
    const mediaType: MediaType = getMediaType(item);
    if(mediaType === MediaType.MOVIE || mediaType === MediaType.TV) 
        return item?.genre_ids?.length ? genres.filter((genre: any) => item.genre_ids.find((id: number) => id === genre.id)).map((genre: any) => genre.name).join(", ") : "";

    return "";
}
export function getGenres(item: any): Array<Genre> {
    if(item?.genre_ids?.length) {
        let genreList: Array<Genre> = [...genres.filter((genre: Genre) => item.genre_ids.find((id: number) => genre.id === id))];
        return genreList;
    }
    if(item?.genres?.length) return item.genres;
    return [];
}





// CREDITS
export function getCredits(item: any): Credits {
    const credits: Credits = { directors: [], writers: [], producers: [], cast: [] };
    if(item?.cast) {
        const cast: Array<Credit> = item.cast ? getMassagedCreditsList(item.cast) : [];
        credits.cast = cast;
    }
    if(item?.crew) {
        const crew = item.crew ? item.crew : [];
        
        const directors: Array<Credit> = getMassagedCreditsList(crew.filter((cred: any) => String(cred.known_for_department).toLowerCase() === 'directing'));
        const producers: Array<Credit>  = getMassagedCreditsList(crew.filter((cred: any) => String(cred.known_for_department).toLowerCase() === 'production'));
        const writers: Array<Credit>  = getMassagedCreditsList(crew.filter((cred: any) => String(cred.known_for_department).toLowerCase() === 'writing'));

        credits.directors = directors;
        credits.producers = producers;
        credits.writers = writers;
    }
    return credits;
}
export function getMassagedCreditObject(item: any): Credit | null {
    if(!item) return null;
    const credit: Credit = {
        id: item.id,
        poster: getImageURL(item),
        order: item.order,
        adult: item.adult,
        character: item?.character,
        creditId: item.credit_id,
        popularity: item.popularity,
        gender: item?.gender ? item.gender : null,
        knownFor: getKnownFor(item),
        name: getName(item),
        job: item?.job ? item.job : null,
        originalName: getOriginalName(item),
        castId: item?.cast_id ? item.cast_id : null,
        backdrop: getBackdropImageURL(item),
        genres: getGenres(item),
        language: null,
        overview: item?.overview ? item.overview : null,
        year: getYear(item),
        rating: item?.vote_average ? Math.round((item.vote_average * 10)) : null,
        votes: item?.vote_count ? item.vote_count : null,
        mediaType: getMediaType(item)
    }
    return credit;
}
export function getMassagedCreditsList(list: Array<any>, media_type?: MediaType): Array<Credit> {
    if(!list?.length) return [];
    let credits: Array<Credit> = [];
    list.forEach((cred: any) => {
        const credit: Credit | null = getMassagedCreditObject(cred);
        let mediaType: MediaType = MediaType.PERSON;
        if(media_type) mediaType = media_type;
        else if(credit) mediaType = credit.mediaType;

        if(credit) credits.push({...credit, mediaType});
    });
    if(credits.length) {
        // NOT SORTING FOR NOW ---------------------
        // if(credits[0].mediaType !== MediaType.PERSON) credits.sort((p, c) => !p.rating || !c.rating ? 1 : p.rating < c.rating ? 1 : -1);
        // else credits.sort((p, c) => p.order > c.order ? 1 : -1);
    }
    return credits;
}





// RATINGS -- OMDB Data
export function getRatings(item: any): Array<Rating> {
    if(!item?.Ratings) [];
    const ratings: Array<Rating> = [];
    item.Ratings.forEach((rating: any) => {
        if(!rating?.Source || !rating.Value) return;
        const value = rating.Value.split("/");
        const path: string | null = rating.Source === "Internet Movie Database" ? "imdb.webp" : rating.Source === "Rotten Tomatoes" ? "rotten_tomatoes_old.png" : null;
        const rate: Rating = {
            source: rating.Source === "Internet Movie Database" ? "" : rating.Source,
            rating: value[0],
            outOf: value.length > 1 ? value[1] : null,
            image: path ? (APP_IMAGE_PATH + path) : null
        }
        ratings.push(rate);
    })
    return ratings;
}





// NAVIGATION
export function getDetailsNavigationURL(item: MediaDetails | Credit | Recents): string {
    const base: BaseSearch = {
        id: item.id,
        mediaType: item.mediaType
    }
    const stringData: string = JSON.stringify(base);
    const encrypted: string = encrypt(stringData);
    return `/details/${encrypted}`;
}
export function getNavigatedData(encrypted: string): BaseSearch | null {
    try{
        const decrypted: string = decrypt(encrypted);
        const base: BaseSearch = JSON.parse(decrypted);
        return base;
    }
    catch{
        console.log("--- ERROR parsing Navigated data");
        return null;
    }
    return null;
}





// COLORS
export function componentToHex(value: number) {
    var hex = value.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
export function rgbToHex(r: number, g: number, b: number): string{
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}





// IMAGES
export function getImageURL(item: any) {
    if(item?.poster_path != undefined) return SHORT_IMAGE_URL + item.poster_path;
    else if(item?.profile_path != undefined) return SHORT_IMAGE_URL + item.profile_path;
    else if(item?.still_path != undefined) return SHORT_IMAGE_URL + item.still_path;
    else if(item?.file_path != undefined) return SHORT_IMAGE_URL + item.file_path;
    else if(item?.poster != undefined) return item.poster;
    return IMAGE_NOT_FOUND;
}
export function getHDImageURL(item: any) {
    if(item?.poster_path != undefined) return IMAGE_URL + item.poster_path;
    else if(item?.profile_path != undefined) return IMAGE_URL + item.profile_path;
    else if(item?.still_path != undefined) return IMAGE_URL + item.still_path;
    else if(item?.file_path != undefined) return IMAGE_URL + item.file_path;
    return IMAGE_NOT_FOUND;
}
export function getBackdropImageURL(item: any, inHD: boolean = true): string | null {
    if(item?.backdrop_path != undefined) return (inHD ? IMAGE_URL : SHORT_IMAGE_URL) + item.backdrop_path;
    return null;
}
// Massage Images List
export function getMassagedImagesList(item: any): Array<Image> {
    if(!item?.backdrops && !item?.logos && !item?.posters && !item?.profiles) return [];
    const images: Array<Image> = [];
    console.log("item: ", item);
    if(item.backdrops?.length) setImageListByList(item.backdrops, images);
    if(item.posters?.length) setImageListByList(item.posters, images);
    if(item.profiles?.length) setImageListByList(item.profiles, images);
    if(item.logos?.length) setImageListByList(item.logos, images);
    return images;
}
function setImageListByList(list: Array<any>, images: Array<Image>) {
    list.forEach((item: any) => {
        const image: Image | null = getMassagedImageObject(item);
        if(image) images.push(image);
    })
}
export function getMassagedImageObject(item: any): Image | null  {
    const image: Image = {
        aspectRatio: item.aspect_ratio,
        poster: getHDImageURL(item),
        thumbnail: getImageURL(item),
        height: item.height,
        width: item.width
    }
    return image;
}
// GET HEIGHT AND WIDTH
export function calculateHeightAndWidth(ratio: number, height?: number, width?: number): Array<number> {
    if(height && width) return [ height, width ];
    else if(height) return [ height, height * ratio ];
    else if(width) return [ width / ratio, width ]
    return [ -1, -1 ];
}
// GET BACKGROUND 
export function getBackground(url?: string | null, pos?: string, size?: string): string {
    let background: string = url ? `url('${url}') ${pos ? pos : "center"}/${size ? size : "cover"}` : "";
    return background;
}





// MASSAGED DATA
export function getMassagedData(item: any): MediaDetails {
    const data: MediaDetails = {
        // ALL
        id: item?.id ? item.id : 0,
        imdbId: item?.imdb_id ? item.imdb_id : null,
        name: item ? getName(item) : "",
        poster: getHDImageURL(item),
        backdrop: getBackdropImageURL(item),
        thumbnail: getImageURL(item),
        overview: getOverview(item),
        popularity: item ? item.popularity : 0,
        credits: getCredits(item),
        country: getCountry(item),
        mediaType: getMediaType(item),
        // Person
        birthDate: item?.birthday ? getDateString(item.birthday) : null,
        deathDate: item?.deathday ? getDateString(item.deathday) : null,
        department: getDepartment(item),
        knownFor: getKnownFor(item),
        // Movies & TV
        year: getYear(item),
        released: getReleased(item),
        userRating: item?.vote_average ? Math.round((item.vote_average * 10)) : null,
        ratings: item?.ratings ? item.ratings : [],
        votes: item?.vote_count ? item.vote_count : null,
        genres: getGenres(item),
        images: [],
        videos: [],
        trailer: null,
        runTime: getRuntime(item),
        providers: item?.providers ? item.providers : [],
        // OMDB
        awards: null,
        rated: null,
        boxOffice: null,
        production: null,
        language: null,
        similar: [],
        recommendations: [],
        // TV
        episodeCount: null,
        seasonCount: null,
        seasonNumber: null,
        episodeNumber: null,
        episodeType: null,
        seasons: [],
        lastEpisode: null,
        status: item?.status ? item.status : null,
        tagline: item?.tagline ? item.tagline : null
    }
    return data;
}





// UPDATE OMDB DATA
function getOMValue(item: string): string | null{
    if(item && item !== "N/A") return item;
    return null;
}
export function updateOMDBDetails(details: any, state: MediaDetails): MediaDetails {
    return {
        ...state,
        ratings: details ? getRatings(details) : state.ratings,
        released: details?.Released && getOMValue(details?.Released) ? getOMValue(details?.Released) : state.released,
        awards: details?.Awards ? getOMValue(details.Awards) : state.awards,
        rated: details?.Rated ? getOMValue(details.Rated) : state.rated,
        country: details?.Country ? getOMValue(details.Country) : state.country,
        boxOffice: details?.BoxOffice ? getOMValue(details.BoxOffice) : state.boxOffice,
        production: details?.Production ? getOMValue(details.Production) : state.production,
        language: details?.Language ? getOMValue(details.Language) : state.language
    }
}





// SEARCH RESULTS
export function getMassagedDataList(items: Array<any>): Array<MediaDetails> {
    const list: Array<MediaDetails> = [];
    if(items && items.length) {
        items.forEach((item: any) => item ? list.push(getMassagedData(item)) : null);
    }
    return list;
}
export function getSearchResultsData(item: any): SearchResults {
    const result: SearchResults = {
        page: item?.page ? item.page: 0,
        totalPages: item?.total_pages ? item.total_pages : 0,
        totalResults: item.total_results ? item.total_results : 0,
        list: getMassagedDataList(item.results)
    }
    return result;
}