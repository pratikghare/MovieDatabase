
import {
    MediaType,
    Movie,
    TvShow,
    Person,
    Image,
    Video,
    CompactMedia,
    SpokenLanguage,
    CompactMediaResults,
    Genre,
    Credits,
    Ratings,
    ImageData,
    ProductionCompany,
    WatchProviders,
    WatchProvider,
    Review,
    ReviewResults,
    Author
} from './context/context';

import { SHORT_IMAGE_URL, IMAGE_NOT_FOUND, IMAGE_URL, VIDEOS, APP_IMAGE_PATH } from './env/env';
import genres from '../../samples/genres.json';
var countryCode: string = "IN";

export const RatingMap: Array<Ratings> = [
    {
        source: 'TMDB', showStars: true, type: 'image', label: '', logo: APP_IMAGE_PATH + 'tmdb.svg',
        scale: 0, rating: 0
    },
    {
        source: 'Internet Movie Database', showStars: true, type: 'image', label: '', logo: APP_IMAGE_PATH + 'imdb.png',
        // logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png?20200406194337',
        scale: 0, rating: 0
    },
    {
        source: 'Rotten Tomatoes', showStars: false, type: 'svg', label: '', logo: APP_IMAGE_PATH + 'rotten_tomatoes_old.png',
        scale: 0, rating: 0
    },
    {
        source: 'Metacritic', showStars: false, type: 'box', label: 'Metascore', logo: '',
        scale: 0, rating: 0
    }
];

export const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getMediaType(item: any): MediaType {
    if (item?.media_type === 'tv') return MediaType.TV;
    else if (item?.media_type === 'movie') return MediaType.MOVIE;
    return MediaType.PERSON;
}

export function getBaseClassNames(className?: string, base?: string): string {
    return className && base ? `${className} ${base}` : className || base || '';
}

export function getName(item: any): string {
    return item?.name || item?.title || item?.original_name || item?.original_title || '';
}

export function getOverview(item: any): string {
    return item?.biography || item?.overview || `We don't have a ${getMediaType(item) === MediaType.PERSON ? 'biography' : 'overview'} for ${getName(item)}.`;
}

export function getCountry(item: any): string | undefined {
    return item?.origin_country?.join(', ') || item?.place_of_birth || undefined;
}

export function getDateString(date: string): string {
    if (date) {
        const d = new Date(date);
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }
    return '';
}

export function getYear(item: any): string | undefined {
    return getDateString(item?.release_date || item?.first_air_date || item?.last_air_date || item?.air_date).split(' ')[2] || undefined;
}

export function calculateAge(dob: string | number): string | undefined {
    const birthDate = new Date(dob);

    if (isNaN(birthDate.getTime())) {
        return undefined;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return `${age} years old`;
}

export function getReleased(item: any): string | undefined {
    return getDateString(item?.release_date || item?.first_air_date || item?.last_air_date || item?.air_date);
}

export function getDepartment(item: any): string | undefined {
    const dept = item?.known_for_department?.toLowerCase();
    switch (dept) {
        case 'acting': return 'Actor';
        case 'directing': return 'Director';
        case 'writing': return 'Writer';
        case 'sound': return 'Music Department';
        case 'producing': return 'Producer';
        case 'production': return 'Producer';
        default: return item?.known_for_department || undefined;
    }
}

export function getKnownFor(item: any): string | undefined {
    return getMediaType(item) === MediaType.PERSON && item?.known_for?.length ? item.known_for.map(getName).join(', ') : undefined;
}

export function calculateRunTime(runtime: number): string {
    const hours = Math.floor(runtime / 60);
    const mins = runtime % 60;
    return `${hours ? hours + 'h ' : ''}${mins}min${mins > 1 ? 's' : ''}`;
}

export function getRuntime(item: any): string | undefined {
    return item?.runtime ? calculateRunTime(item.runtime) : undefined;
}

export function getGenresString(item: any): string {
    return (item?.genre_ids?.length ? genres.list.filter((g: Genre) => item.genre_ids.includes(g.id)).map((g: Genre) => g.name).join(', ') : '');
}

export function getGenres(item: any): Array<Genre> {
    return item?.genre_ids?.length ? genres.list.filter((g: Genre) => item.genre_ids.includes(g.id)) : item?.genres || [];
}






//  IMAGES
export function getImage(url?: string, shortSize?: boolean): string | undefined {
    return url ? (shortSize ? SHORT_IMAGE_URL + url : IMAGE_URL + url) : undefined;
}
export function getThumbnail(item: any): string {
    const image: string | undefined = item?.poster_path ? getImage(item.poster_path, true) :
        item?.profile_path ? getImage(item.profile_path, true) :
            item?.still_path ? getImage(item.still_path, true) :
                item?.file_path ? getImage(item.file_path, true) :
                    item?.avatar_path ? getImage(item.avatar_path, true) : IMAGE_NOT_FOUND;
    return image ? image : IMAGE_NOT_FOUND;
}
export function getPoster(item: any): string {
    const image: string | undefined = item?.poster_path ? getImage(item.poster_path) :
        item?.profile_path ? getImage(item.profile_path) :
            item?.still_path ? getImage(item.still_path) :
                item?.file_path ? getImage(item.file_path) :
                    item?.avatar_path ? getImage(item.avatar_path) : IMAGE_NOT_FOUND;
    return image ? image : IMAGE_NOT_FOUND;
}
export function getBackdrop(item: any, shortSize: boolean = false): string | undefined {
    return getImage(item?.backdrop_path, shortSize);
}
export function calculateHeightAndWidth(ratio: number, height?: number, width?: number): Array<number> {
    return height && width ? [height, width] : height ? [height, height * ratio] : width ? [width / ratio, width] : [-1, -1];
}


function interleaveAndShuffle<T>(backdrop: Image[], list: Image[]): Image[] {
    const result: Image[] = [];

    // Make copies to avoid modifying the originals
    const shuffledBackdrop = [...backdrop].sort(() => Math.random() - 0.5);
    const shuffledList = [...list].sort(() => Math.random() - 0.5);

    let listIndex = 0;

    // Interleave: one from backdrop, one from list
    for (const backdropItem of shuffledBackdrop) {
        result.push(backdropItem);
        if (listIndex < shuffledList.length) {
            result.push(shuffledList[listIndex++]);
        }
    }

    // Remaining list items (if any)
    const remaining = shuffledList.slice(listIndex).sort(() => Math.random() - 0.5);
    result.push(...remaining);

    return result;
}


export function getMassagedImagesList(item: any): ImageData {
    if (!item?.backdrops && !item?.logos && !item?.posters && !item?.profiles) return { backdrops: [], list: [] };
    const backdrops: Array<Image> = [];
    if (item.backdrops?.length) setImageListByList(item.backdrops, backdrops);
    let list: Array<Image> = [];
    if (item.posters?.length) setImageListByList(item.posters, list);
    if (item.profiles?.length) setImageListByList(item.profiles, list);
    if (item.logos?.length) setImageListByList(item.logos, list);
    list = interleaveAndShuffle(backdrops, list);
    return { backdrops, list };
}
function setImageListByList(list: Array<any>, images: Array<Image>) {
    list.forEach((item: any) => {
        const image: Image | null = getMassagedImageObject(item);
        if (image) images.push(image);
    })
}
export function getMassagedImageObject(item: any): Image | null {
    const path: string | undefined = getImage(item.file_path);
    const thumbnail: string | undefined = getImage(item.file_path, true);
    const image: Image = {
        aspectRatio: item.aspect_ratio,
        height: item.height,
        width: item.width,
        path: path ? path : '', thumbnail: thumbnail ? thumbnail : ''
    }
    return image;
}
// VIDEOS
export function getVideos(data: any): Video[] {
    const videos: Array<Video> = [];

    data?.results?.forEach((item: any) => {
        const videoUrl = VIDEOS.find(v => v.site === item.site);
        if (!videoUrl || !item?.site || !item?.name || !item.key) return;

        videos.push({
            url: videoUrl.url + item.key,
            site: item.site,
            type: item.type,
            name: item.name
        })
    });
    return videos;
}


// SUB TEXT
function getCompactMediaSubText(item: any): Array<string> {
    const genres = getGenresString(item);
    return [getYear(item), getDepartment(item), genres || undefined, getKnownFor(item)].filter(Boolean) as string[];
}
export function getSubtext(item: any, omdb?: any): string[] {
    const subText: string[] = [];
    // if (getYear(item)) subText.push(getYear(item)!);
    if (getDepartment(item)) subText.push(getDepartment(item)!);
    if (getRuntime(item)) subText.push(getRuntime(item)!);
    if (item?.deathday) subText.push('Died - ' + getDateString(item.deathday));
    if (getReleased(item)) subText.push(getReleased(item)!);
    if (getCountry(item)) subText.push(getCountry(item)!);
    if (omdb?.Rate && omdb.Rated !== 'N/A') subText.push(omdb.Rated);
    const age = calculateAge(item.birthday);
    if (item.birthday && age && !item.deathday) subText.push(age);
    if (omdb?.Rated) subText.push(omdb.Rated);
    return subText;
}








export function getMassagedCompactMedia(item: any, mediaType?: MediaType): CompactMedia {
    return {
        id: item?.id || 0,
        name: getName(item),
        backdrop: getBackdrop(item),
        thumbnail: getThumbnail(item),
        overview: getOverview(item),
        mediaType: mediaType ? mediaType : getMediaType(item),
        voteAverage: item?.vote_average || 0,
        voteCount: item?.vote_count || 0,
        subtext: getCompactMediaSubText(item),
        rating: getTMRating(item),
        character: item.roles ? item.roles.map((role: any) => role.character).join(', ') : item?.character,
        department: getDepartment(item),
        order: item.order,
        releaseDate: item.release_date
    };
}

export function getMassagedCompactMediaList(items: Array<any>, media?: MediaType, sort?: boolean): Array<CompactMedia> {
    return !sort ? items?.map((item: any) => getMassagedCompactMedia(item, media)).filter(Boolean) || [] :
        (
            items
                ?.map((item: any) => getMassagedCompactMedia(item, media))
                .filter(Boolean)
                .sort((a, b) => {
                    // Handle undefined orders by pushing them to the end
                    if (a.order == null) return 1;
                    if (b.order == null) return -1;
                    return a.order - b.order;
                }) || []
        );
}






// CREDITS
export function getCredits(item: any, media: MediaType): Credits {
    const sort: boolean = media === MediaType.PERSON;
    const castList: CompactMedia[] = getMassagedCompactMediaList(item.cast, undefined, sort);
    const crewList = item.crew || [];
    const directors = getMassagedCompactMediaList(crewList.filter((cred: any) => cred.department?.toLowerCase() === 'directing', undefined, sort));
    const writers = getMassagedCompactMediaList(crewList.filter((cred: any) => cred.department?.toLowerCase() === 'writing', undefined, sort));

    const directorIds = new Set(directors.map(d => d.id));
    const writerIds = new Set(writers.map(w => w.id));
    const castIds = new Set(castList.map(c => c.id));

    const crew = getMassagedCompactMediaList(
        crewList.filter((cred: any) =>
            !directorIds.has(cred.id) &&
            !writerIds.has(cred.id) &&
            !castIds.has(cred.id)
        ), undefined, sort
    );

    return {
        directors,
        writers,
        cast: castList,
        crew
    };
}





// OMDB DATA
export function getMassagedOmdbMedia(omdb: any): Partial<Record<string, string>> {
    if (!omdb) return {};
    return {
        rated: omdb?.Rated !== 'N/A' ? omdb.Rated : undefined,
        released: omdb?.Released !== 'N/A' ? omdb.Released : undefined,
        awards: omdb?.Awards !== 'N/A' ? omdb.Awards : undefined,
        boxOffice: omdb?.BoxOffice !== 'N/A' ? omdb.BoxOffice : undefined,
        production: omdb?.Production !== 'N/A' ? omdb.Production : undefined,
        website: omdb?.Website !== 'N/A' ? omdb.Website : undefined,
        dvd: omdb?.DVD !== 'N/A' ? omdb.DVD : undefined,
        imdbId: omdb.imdb_id
    };
}
export function getRatings(array: Array<any>, details: any): Array<Ratings> {
    const tmdb: Ratings = { ...RatingMap[0] };
    tmdb.rating = Math.round(details.vote_average * 10) / 10;
    const ratings: Array<Ratings> = [tmdb];
    if (!array) return ratings;
    array.forEach((item: any) => {
        if (item && item.Source && item.Value) {
            const map = RatingMap.find((r) => r.source === item.Source);
            const rating: string = item.Value.includes('%') ? item.Value.split('%')[0] : item.Value.includes('/') ? item.Value.split('/')[0] : item.Value;
            const scale: string = item.Value.includes('%') ? '100' : item.Value.includes('/') ? item.Value.split('/')[1] : '100';

            if (map)
                ratings.push({
                    source: item.Source, rating: parseFloat(rating), scale: parseInt(scale),
                    label: map.label, logo: map.logo,
                    showStars: !!map?.showStars,
                    type: map.type
                });
        }
    });
    return ratings.filter((rating: Ratings) => rating.rating);
}
export function getTMRating(details: any): number | undefined {
    return details.vote_average ? Math.round(details.vote_average * 10) : undefined;
}





export function getProductionCompanies(details: any): Array<ProductionCompany> {
    const companies: Array<ProductionCompany> = [];
    details?.production_companies?.forEach((company: any) => {
        if (!company || !company.id || !company.name) return;
        companies.push({
            id: company.id,
            name: company.name,
            country: company.origin_country ? company.origin_country : '',
            path: getImage(company.logo_path, true)
        })
    })
    return companies;
}


function getWatchProviderObject(provider: any): WatchProvider {
    const path: string | undefined = getImage(provider.logo_path, true);
    return {
        id: provider.provider_id,
        name: provider.provider_name,
        path: path ? path : '',
        displayPriority: provider.display_priority
    }
}

function getProviderArray(list?: Array<any>): Array<WatchProvider> {
    return list ? list.map(getWatchProviderObject).filter(Boolean) : [];
}

export function getWatchProviders(watchProviders: any): WatchProviders {
    if (!watchProviders) return { subscription: [], rent: [], buy: [] };
    const regions: Array<string> = Object.keys(watchProviders);
    const regionProvider: any = (countryCode in watchProviders) ? watchProviders[countryCode] : null;
    const data: WatchProviders = {
        subscription: getProviderArray(regionProvider?.flatrate),
        rent: getProviderArray(regionProvider?.rent),
        buy: getProviderArray(regionProvider?.buy)
    }

    return data;
}


function getAmountString(amount: string) {
    if (amount != '0') return '$' + parseInt(amount, 10).toLocaleString('en-US')
    return '';
}


function getAuthor(author: any): Author {
    return {
        name: author.name,
        username: author.username,
        image: getImage(author.avatar_path),
        rating: author.rating
    }
}

function getReviews(list: Array<any>): Array<Review> {
    return list.map((item: any) => ({
        id: item.id,
        author: getAuthor(item.author_details),
        content: item.content,
        created: getDateString(item.created_at),
        updated: getDateString(item.updated_at)
    }))
}

function getReviewData(data: any): ReviewResults {
    const results: ReviewResults = {
        list: data?.results?.length ? getReviews(data.results) : [],
        total: data.total_results ? data.total_results : 0,
        page: data.page ? data.page : 0,
        totalPages: data.total_pages ? data.total_pages : 0
    };
    return results;
}


export function getMovieDetails(details: any, credits: any, images: any, videos: any, similar: any, recommendations: any, omdb: any, watchProviders: any, reviews: any): Movie {
    return {
        id: details.id,
        mediaType: MediaType.MOVIE,
        name: getName(details),
        overview: getOverview(details),
        poster: getPoster(details),
        thumbnail: getThumbnail(details),
        backdrop: getBackdrop(details),
        popularity: details.popularity,
        voteAverage: details.vote_average,
        voteCount: details.vote_count,
        genres: getGenres(details),
        runtime: getRuntime(details),
        released: getDateString(details.release_date),
        revenue: getAmountString(details.revenue),
        budget: getAmountString(details.budget),
        productionCompanies: getProductionCompanies(details),
        productionCountries: details.production_countries?.map((c: any): String => c.name),
        spokenLanguages: details.spoken_languages?.map((l: any): SpokenLanguage => ({ id: l.iso_639_1, englishName: l.english_name, name: l.name })),
        ...getMassagedOmdbMedia(omdb),
        credits: getCredits(credits, MediaType.MOVIE),
        images: getMassagedImagesList(images),
        videos: getVideos(videos),
        similar: getMassagedCompactMediaList(similar?.results || [], MediaType.MOVIE),
        recommendations: getMassagedCompactMediaList(recommendations?.results || [], MediaType.MOVIE),
        subtext: getSubtext(details, omdb),
        ratings: getRatings(omdb?.Ratings || [], details),
        tagline: details.tagline,
        year: getYear(details) ? `(${getYear(details)})` : undefined,
        rating: getTMRating(details),
        watchProviders: getWatchProviders(watchProviders),
        reviews: getReviewData(reviews)
    };
}

export function getTvShowDetails(details: any, credits: any, images: any, videos: any, similar: any, recommendations: any, omdb: any, watchProviders: any, reviews: any): TvShow {
    return {
        id: details.id,
        mediaType: MediaType.TV,
        name: getName(details),
        overview: getOverview(details),
        poster: getPoster(details),
        thumbnail: getThumbnail(details),
        backdrop: getBackdrop(details),
        popularity: details.popularity,
        voteAverage: details.vote_average,
        voteCount: details.vote_count,
        genres: getGenres(details),
        released: getDateString(details.release_date),
        firstAirDate: getDateString(details.first_air_date),
        lastAirDate: getDateString(details.last_air_date),
        numberOfEpisodes: details.number_of_episodes,
        numberOfSeasons: details.number_of_seasons,
        productionCompanies: getProductionCompanies(details),
        productionCountries: details.production_countries?.map((c: any): String => c.name),
        spokenLanguages: details.spoken_languages?.map((l: any): SpokenLanguage => ({ id: l.iso_639_1, englishName: l.english_name, name: l.name })),
        ...getMassagedOmdbMedia(omdb),
        credits: getCredits(credits, MediaType.MOVIE),
        images: getMassagedImagesList(images),
        videos: getVideos(videos),
        similar: getMassagedCompactMediaList(similar?.results || [], MediaType.TV),
        recommendations: getMassagedCompactMediaList(recommendations?.results || [], MediaType.TV),
        subtext: getSubtext(details, omdb),
        ratings: getRatings(omdb?.Ratings || [], details),
        tagline: details.tagline,
        year: getYear(details) ? `(${getYear(details)})` : undefined,
        rating: getTMRating(details),
        watchProviders: getWatchProviders(watchProviders),
        reviews: getReviewData(reviews)
    };
}

export function getPersonDetails(details: any, credits: any, images: any): Person {
    return {
        id: details.id,
        mediaType: MediaType.PERSON,
        name: getName(details),
        overview: getOverview(details),
        poster: getPoster(details),
        thumbnail: getThumbnail(details),
        backdrop: getBackdrop(details),
        popularity: details.popularity,
        voteAverage: details.vote_average,
        voteCount: details.vote_count,
        birthday: getDateString(details.birthday),
        deathday: getDateString(details.deathday),
        placeOfBirth: details.place_of_birth,
        knownForDepartment: details.known_for_department,
        alsoKnownAs: details.also_known_as || [],
        credits: getCredits(credits, MediaType.PERSON),
        images: getMassagedImagesList(images),
        subtext: getSubtext(details)
    };
}


export function getSearchResultsData(item: any): CompactMediaResults {
    return {
        page: item?.page || 0,
        totalPages: item?.total_pages || 0,
        totalResults: item?.total_results || 0,
        list: getMassagedCompactMediaList(item.results || [])
    };
}

export function getMassagedMedia(items: any[], type: MediaType, countrycode: string): Movie | TvShow | Person {
    const [details, credits, images, videos, similar, recommendations, watchProviders, reviews, omdb] = items;
    countryCode = countrycode;

    if (type === MediaType.MOVIE) return getMovieDetails(details, credits, images, videos, similar, recommendations, omdb, watchProviders?.results, reviews);
    if (type === MediaType.TV) return getTvShowDetails(details, credits, images, videos, similar, recommendations, omdb, watchProviders?.results, reviews);
    return getPersonDetails(details, credits, images);
}
