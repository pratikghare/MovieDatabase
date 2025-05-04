"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.months = exports.RatingMap = void 0;
exports.getMediaType = getMediaType;
exports.getBaseClassNames = getBaseClassNames;
exports.getName = getName;
exports.getOverview = getOverview;
exports.getCountry = getCountry;
exports.getDateString = getDateString;
exports.getYear = getYear;
exports.calculateAge = calculateAge;
exports.getReleased = getReleased;
exports.getDepartment = getDepartment;
exports.getKnownFor = getKnownFor;
exports.calculateRunTime = calculateRunTime;
exports.getRuntime = getRuntime;
exports.getGenresString = getGenresString;
exports.getGenres = getGenres;
exports.getImage = getImage;
exports.getThumbnail = getThumbnail;
exports.getPoster = getPoster;
exports.getBackdrop = getBackdrop;
exports.calculateHeightAndWidth = calculateHeightAndWidth;
exports.getMassagedImagesList = getMassagedImagesList;
exports.getMassagedImageObject = getMassagedImageObject;
exports.getVideos = getVideos;
exports.getSubtext = getSubtext;
exports.getMassagedCompactMedia = getMassagedCompactMedia;
exports.getMassagedCompactMediaList = getMassagedCompactMediaList;
exports.getCredits = getCredits;
exports.getMassagedOmdbMedia = getMassagedOmdbMedia;
exports.getRatings = getRatings;
exports.getTMRating = getTMRating;
exports.getProductionCompanies = getProductionCompanies;
exports.getWatchProviders = getWatchProviders;
exports.getMovieDetails = getMovieDetails;
exports.getMassgedSeasonItem = getMassgedSeasonItem;
exports.getTvShowDetails = getTvShowDetails;
exports.getPersonDetails = getPersonDetails;
exports.getSearchResultsData = getSearchResultsData;
exports.getMassagedMedia = getMassagedMedia;
const context_1 = require("./context/context");
const env_1 = require("./env/env");
const genres_json_1 = __importDefault(require("../../samples/genres.json"));
var countryCode = "IN";
exports.RatingMap = [
    {
        source: 'TMDB', showStars: true, type: 'image', label: '', logo: env_1.APP_IMAGE_PATH + 'tmdb.svg',
        scale: 0, rating: 0
    },
    {
        source: 'Internet Movie Database', showStars: true, type: 'image', label: '', logo: env_1.APP_IMAGE_PATH + 'imdb.png',
        // logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/575px-IMDB_Logo_2016.svg.png?20200406194337',
        scale: 0, rating: 0
    },
    {
        source: 'Rotten Tomatoes', showStars: false, type: 'svg', label: '', logo: env_1.APP_IMAGE_PATH + 'rotten_tomatoes_old.png',
        scale: 0, rating: 0
    },
    {
        source: 'Metacritic', showStars: false, type: 'box', label: 'Metascore', logo: '',
        scale: 0, rating: 0
    }
];
exports.months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function getMediaType(item) {
    if ((item === null || item === void 0 ? void 0 : item.media_type) === 'tv')
        return context_1.MediaType.TV;
    else if ((item === null || item === void 0 ? void 0 : item.media_type) === 'movie')
        return context_1.MediaType.MOVIE;
    return context_1.MediaType.PERSON;
}
function getBaseClassNames(className, base) {
    return className && base ? `${className} ${base}` : className || base || '';
}
function getName(item) {
    return (item === null || item === void 0 ? void 0 : item.name) || (item === null || item === void 0 ? void 0 : item.title) || (item === null || item === void 0 ? void 0 : item.original_name) || (item === null || item === void 0 ? void 0 : item.original_title) || '';
}
function getOverview(item, mediaType = getMediaType(item)) {
    var _a, _b;
    const overview = ((_a = item === null || item === void 0 ? void 0 : item.overview) === null || _a === void 0 ? void 0 : _a.length) ? item.overview : ((_b = item === null || item === void 0 ? void 0 : item.biography) === null || _b === void 0 ? void 0 : _b.length) ? item.biography : undefined;
    return overview || `We don't have a ${mediaType === context_1.MediaType.PERSON ? 'biography' : 'overview'} for ${getName(item)}.`;
}
function getCountry(item) {
    var _a;
    return ((_a = item === null || item === void 0 ? void 0 : item.origin_country) === null || _a === void 0 ? void 0 : _a.join(', ')) || (item === null || item === void 0 ? void 0 : item.place_of_birth) || undefined;
}
function getDateString(date) {
    if (date) {
        const d = new Date(date);
        return `${d.getDate()} ${exports.months[d.getMonth()]} ${d.getFullYear()}`;
    }
    return '';
}
function getYear(item) {
    return getDateString((item === null || item === void 0 ? void 0 : item.release_date) || (item === null || item === void 0 ? void 0 : item.first_air_date) || (item === null || item === void 0 ? void 0 : item.last_air_date) || (item === null || item === void 0 ? void 0 : item.air_date)).split(' ')[2] || undefined;
}
function calculateAge(dob) {
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
function getReleased(item) {
    return getDateString((item === null || item === void 0 ? void 0 : item.release_date) || (item === null || item === void 0 ? void 0 : item.first_air_date) || (item === null || item === void 0 ? void 0 : item.last_air_date) || (item === null || item === void 0 ? void 0 : item.air_date));
}
function getDepartment(item) {
    var _a;
    const dept = (_a = item === null || item === void 0 ? void 0 : item.known_for_department) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    switch (dept) {
        case 'acting': return 'Actor';
        case 'directing': return 'Director';
        case 'writing': return 'Writer';
        case 'sound': return 'Music Department';
        case 'producing': return 'Producer';
        case 'production': return 'Producer';
        default: return (item === null || item === void 0 ? void 0 : item.known_for_department) || undefined;
    }
}
function getKnownFor(item) {
    var _a;
    return getMediaType(item) === context_1.MediaType.PERSON && ((_a = item === null || item === void 0 ? void 0 : item.known_for) === null || _a === void 0 ? void 0 : _a.length) ? item.known_for.map(getName).join(', ') : undefined;
}
function calculateRunTime(runtime) {
    const hours = Math.floor(runtime / 60);
    const mins = runtime % 60;
    return `${hours ? hours + 'h ' : ''}${mins}min${mins > 1 ? 's' : ''}`;
}
function getRuntime(item) {
    return (item === null || item === void 0 ? void 0 : item.runtime) ? calculateRunTime(item.runtime) : undefined;
}
function getGenresString(item) {
    var _a;
    return (((_a = item === null || item === void 0 ? void 0 : item.genre_ids) === null || _a === void 0 ? void 0 : _a.length) ? genres_json_1.default.list.filter((g) => item.genre_ids.includes(g.id)).map((g) => g.name).join(', ') : '');
}
function getGenres(item) {
    var _a;
    return ((_a = item === null || item === void 0 ? void 0 : item.genre_ids) === null || _a === void 0 ? void 0 : _a.length) ? genres_json_1.default.list.filter((g) => item.genre_ids.includes(g.id)) : (item === null || item === void 0 ? void 0 : item.genres) || [];
}
//  IMAGES
function getImage(url, shortSize) {
    return url ? (shortSize ? env_1.SHORT_IMAGE_URL + url : env_1.IMAGE_URL + url) : undefined;
}
function getThumbnail(item) {
    const image = (item === null || item === void 0 ? void 0 : item.poster_path) ? getImage(item.poster_path, true) :
        (item === null || item === void 0 ? void 0 : item.profile_path) ? getImage(item.profile_path, true) :
            (item === null || item === void 0 ? void 0 : item.still_path) ? getImage(item.still_path, true) :
                (item === null || item === void 0 ? void 0 : item.file_path) ? getImage(item.file_path, true) :
                    (item === null || item === void 0 ? void 0 : item.avatar_path) ? getImage(item.avatar_path, true) : env_1.IMAGE_NOT_FOUND;
    return image ? image : env_1.IMAGE_NOT_FOUND;
}
function getPoster(item) {
    const image = (item === null || item === void 0 ? void 0 : item.poster_path) ? getImage(item.poster_path) :
        (item === null || item === void 0 ? void 0 : item.profile_path) ? getImage(item.profile_path) :
            (item === null || item === void 0 ? void 0 : item.still_path) ? getImage(item.still_path) :
                (item === null || item === void 0 ? void 0 : item.file_path) ? getImage(item.file_path) :
                    (item === null || item === void 0 ? void 0 : item.avatar_path) ? getImage(item.avatar_path) : env_1.IMAGE_NOT_FOUND;
    return image ? image : env_1.IMAGE_NOT_FOUND;
}
function getBackdrop(item, shortSize = false) {
    return getImage(item === null || item === void 0 ? void 0 : item.backdrop_path, shortSize);
}
function calculateHeightAndWidth(ratio, height, width) {
    return height && width ? [height, width] : height ? [height, height * ratio] : width ? [width / ratio, width] : [-1, -1];
}
function interleaveAndShuffle(backdrop, list) {
    const result = [];
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
function getMassagedImagesList(item) {
    var _a, _b, _c, _d;
    if (!(item === null || item === void 0 ? void 0 : item.backdrops) && !(item === null || item === void 0 ? void 0 : item.logos) && !(item === null || item === void 0 ? void 0 : item.posters) && !(item === null || item === void 0 ? void 0 : item.profiles))
        return { backdrops: [], list: [] };
    const backdrops = [];
    if ((_a = item.backdrops) === null || _a === void 0 ? void 0 : _a.length)
        setImageListByList(item.backdrops, backdrops);
    let list = [];
    if ((_b = item.posters) === null || _b === void 0 ? void 0 : _b.length)
        setImageListByList(item.posters, list);
    if ((_c = item.profiles) === null || _c === void 0 ? void 0 : _c.length)
        setImageListByList(item.profiles, list);
    if ((_d = item.logos) === null || _d === void 0 ? void 0 : _d.length)
        setImageListByList(item.logos, list);
    list = interleaveAndShuffle(backdrops, list);
    return { backdrops, list };
}
function setImageListByList(list, images) {
    list.forEach((item) => {
        const image = getMassagedImageObject(item);
        if (image)
            images.push(image);
    });
}
function getMassagedImageObject(item) {
    const path = getImage(item.file_path);
    const thumbnail = getImage(item.file_path, true);
    const image = {
        aspectRatio: item.aspect_ratio,
        height: item.height,
        width: item.width,
        path: path ? path : '', thumbnail: thumbnail ? thumbnail : ''
    };
    return image;
}
// VIDEOS
function getVideos(data) {
    var _a;
    const videos = [];
    (_a = data === null || data === void 0 ? void 0 : data.results) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
        const videoUrl = env_1.VIDEOS.find(v => v.site === item.site);
        if (!videoUrl || !(item === null || item === void 0 ? void 0 : item.site) || !(item === null || item === void 0 ? void 0 : item.name) || !item.key)
            return;
        videos.push({
            url: videoUrl.url + item.key,
            site: item.site,
            type: item.type,
            name: item.name
        });
    });
    return videos;
}
// SUB TEXT
function getCompactMediaSubText(item) {
    const genres = getGenresString(item);
    return [getYear(item), getDepartment(item), genres || undefined, getKnownFor(item)].filter(Boolean);
}
function getSubtext(item, omdb) {
    const subText = [];
    // if (getYear(item)) subText.push(getYear(item)!);
    if (getDepartment(item))
        subText.push(getDepartment(item));
    if (getRuntime(item))
        subText.push(getRuntime(item));
    if (item === null || item === void 0 ? void 0 : item.deathday)
        subText.push('Died - ' + getDateString(item.deathday));
    if (getReleased(item))
        subText.push(getReleased(item));
    if (getCountry(item))
        subText.push(getCountry(item));
    if ((omdb === null || omdb === void 0 ? void 0 : omdb.Rate) && omdb.Rated !== 'N/A')
        subText.push(omdb.Rated);
    const age = calculateAge(item.birthday);
    if (item.birthday && age && !item.deathday)
        subText.push(age);
    if (omdb === null || omdb === void 0 ? void 0 : omdb.Rated)
        subText.push(omdb.Rated);
    return subText;
}
function getMassagedCompactMedia(item, mediaType) {
    return {
        id: (item === null || item === void 0 ? void 0 : item.id) || 0,
        name: getName(item),
        backdrop: getBackdrop(item),
        thumbnail: getThumbnail(item),
        overview: getOverview(item),
        mediaType: mediaType ? mediaType : getMediaType(item),
        voteAverage: (item === null || item === void 0 ? void 0 : item.vote_average) || 0,
        voteCount: (item === null || item === void 0 ? void 0 : item.vote_count) || 0,
        subtext: getCompactMediaSubText(item),
        rating: getTMRating(item),
        character: item.roles ? item.roles.map((role) => role.character).join(', ') : item === null || item === void 0 ? void 0 : item.character,
        department: getDepartment(item),
        order: item.order,
        releaseDate: item.release_date
    };
}
function getMassagedCompactMediaList(items, media, sort) {
    return !sort ? (items === null || items === void 0 ? void 0 : items.map((item) => getMassagedCompactMedia(item, media)).filter(Boolean)) || [] :
        ((items === null || items === void 0 ? void 0 : items.map((item) => getMassagedCompactMedia(item, media)).filter(Boolean).sort((a, b) => {
            // Handle undefined orders by pushing them to the end
            if (a.order == null)
                return 1;
            if (b.order == null)
                return -1;
            return a.order - b.order;
        })) || []);
}
// CREDITS
function getCredits(item, media) {
    const sort = media === context_1.MediaType.PERSON;
    const castList = getMassagedCompactMediaList(item.cast, undefined, sort);
    const crewList = item.crew || [];
    const directors = getMassagedCompactMediaList(crewList.filter((cred) => { var _a; return ((_a = cred.department) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'directing'; }, undefined, sort));
    const writers = getMassagedCompactMediaList(crewList.filter((cred) => { var _a; return ((_a = cred.department) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'writing'; }, undefined, sort));
    const directorIds = new Set(directors.map(d => d.id));
    const writerIds = new Set(writers.map(w => w.id));
    const castIds = new Set(castList.map(c => c.id));
    const crew = getMassagedCompactMediaList(crewList.filter((cred) => !directorIds.has(cred.id) &&
        !writerIds.has(cred.id) &&
        !castIds.has(cred.id)), undefined, sort);
    return {
        directors,
        writers,
        cast: castList,
        crew
    };
}
// OMDB DATA
function getMassagedOmdbMedia(omdb) {
    if (!omdb)
        return {};
    return {
        rated: (omdb === null || omdb === void 0 ? void 0 : omdb.Rated) !== 'N/A' ? omdb.Rated : undefined,
        released: (omdb === null || omdb === void 0 ? void 0 : omdb.Released) !== 'N/A' ? omdb.Released : undefined,
        awards: (omdb === null || omdb === void 0 ? void 0 : omdb.Awards) !== 'N/A' ? omdb.Awards : undefined,
        boxOffice: (omdb === null || omdb === void 0 ? void 0 : omdb.BoxOffice) !== 'N/A' ? omdb.BoxOffice : undefined,
        production: (omdb === null || omdb === void 0 ? void 0 : omdb.Production) !== 'N/A' ? omdb.Production : undefined,
        website: (omdb === null || omdb === void 0 ? void 0 : omdb.Website) !== 'N/A' ? omdb.Website : undefined,
        dvd: (omdb === null || omdb === void 0 ? void 0 : omdb.DVD) !== 'N/A' ? omdb.DVD : undefined,
        imdbId: omdb.imdb_id
    };
}
function getRatings(array, details) {
    const tmdb = Object.assign({}, exports.RatingMap[0]);
    tmdb.rating = Math.round(details.vote_average * 10) / 10;
    const ratings = [tmdb];
    if (!array)
        return ratings;
    array.forEach((item) => {
        if (item && item.Source && item.Value) {
            const map = exports.RatingMap.find((r) => r.source === item.Source);
            const rating = item.Value.includes('%') ? item.Value.split('%')[0] : item.Value.includes('/') ? item.Value.split('/')[0] : item.Value;
            const scale = item.Value.includes('%') ? '100' : item.Value.includes('/') ? item.Value.split('/')[1] : '100';
            if (map)
                ratings.push({
                    source: item.Source, rating: parseFloat(rating), scale: parseInt(scale),
                    label: map.label, logo: map.logo,
                    showStars: !!(map === null || map === void 0 ? void 0 : map.showStars),
                    type: map.type
                });
        }
    });
    return ratings.filter((rating) => rating.rating);
}
function getTMRating(details) {
    return details.vote_average ? Math.round(details.vote_average * 10) : undefined;
}
function getProductionCompanies(details) {
    var _a;
    const companies = [];
    (_a = details === null || details === void 0 ? void 0 : details.production_companies) === null || _a === void 0 ? void 0 : _a.forEach((company) => {
        if (!company || !company.id || !company.name)
            return;
        companies.push({
            id: company.id,
            name: company.name,
            country: company.origin_country ? company.origin_country : '',
            path: getImage(company.logo_path, true)
        });
    });
    return companies;
}
function getWatchProviderObject(provider) {
    const path = getImage(provider.logo_path, true);
    return {
        id: provider.provider_id,
        name: provider.provider_name,
        path: path ? path : '',
        displayPriority: provider.display_priority
    };
}
function getProviderArray(list) {
    return list ? list.map(getWatchProviderObject).filter(Boolean) : [];
}
function getWatchProviders(watchProviders) {
    if (!watchProviders)
        return { subscription: [], rent: [], buy: [] };
    const regions = Object.keys(watchProviders);
    const regionProvider = (countryCode in watchProviders) ? watchProviders[countryCode] : null;
    const data = {
        subscription: getProviderArray(regionProvider === null || regionProvider === void 0 ? void 0 : regionProvider.flatrate),
        rent: getProviderArray(regionProvider === null || regionProvider === void 0 ? void 0 : regionProvider.rent),
        buy: getProviderArray(regionProvider === null || regionProvider === void 0 ? void 0 : regionProvider.buy)
    };
    return data;
}
function getAmountString(amount) {
    if (amount != '0')
        return '$' + parseInt(amount, 10).toLocaleString('en-US');
    return '';
}
function getAuthor(author) {
    return {
        name: author.name,
        username: author.username,
        image: getImage(author.avatar_path),
        rating: author.rating
    };
}
function getReviews(list) {
    return list.map((item) => ({
        id: item.id,
        author: getAuthor(item.author_details),
        content: item.content,
        created: getDateString(item.created_at),
        updated: getDateString(item.updated_at)
    }));
}
function getReviewData(data) {
    var _a;
    const results = {
        list: ((_a = data === null || data === void 0 ? void 0 : data.results) === null || _a === void 0 ? void 0 : _a.length) ? getReviews(data.results) : [],
        total: data.total_results ? data.total_results : 0,
        page: data.page ? data.page : 0,
        totalPages: data.total_pages ? data.total_pages : 0
    };
    return results;
}
function getMovieDetails(details, credits, images, videos, similar, recommendations, omdb, watchProviders, reviews) {
    var _a, _b;
    return Object.assign(Object.assign({ id: details.id, mediaType: context_1.MediaType.MOVIE, name: getName(details), overview: getOverview(details), poster: getPoster(details), thumbnail: getThumbnail(details), backdrop: getBackdrop(details), popularity: details.popularity, voteAverage: details.vote_average, voteCount: details.vote_count, genres: getGenres(details), runtime: getRuntime(details), released: getDateString(details.release_date), revenue: getAmountString(details.revenue), budget: getAmountString(details.budget), productionCompanies: getProductionCompanies(details), productionCountries: (_a = details.production_countries) === null || _a === void 0 ? void 0 : _a.map((c) => c.name), spokenLanguages: (_b = details.spoken_languages) === null || _b === void 0 ? void 0 : _b.map((l) => ({ id: l.iso_639_1, englishName: l.english_name, name: l.name })) }, getMassagedOmdbMedia(omdb)), { credits: getCredits(credits, context_1.MediaType.MOVIE), images: getMassagedImagesList(images), videos: getVideos(videos), similar: getMassagedCompactMediaList((similar === null || similar === void 0 ? void 0 : similar.results) || [], context_1.MediaType.MOVIE), recommendations: getMassagedCompactMediaList((recommendations === null || recommendations === void 0 ? void 0 : recommendations.results) || [], context_1.MediaType.MOVIE), subtext: getSubtext(details, omdb), ratings: getRatings((omdb === null || omdb === void 0 ? void 0 : omdb.Ratings) || [], details), tagline: details.tagline, year: getYear(details) ? `(${getYear(details)})` : undefined, rating: getTMRating(details), watchProviders: getWatchProviders(watchProviders), reviews: getReviewData(reviews) });
}
function getCompactEpisode(item) {
    if (!item || !item.id)
        return undefined;
    return {
        id: item.id,
        name: item.name,
        overview: getOverview(item, context_1.MediaType.TV),
        airDate: getDateString(item.air_date),
        episodeNumber: item.episode_number,
        seasonNumber: item.season_number,
        poster: getImage(item.still_path, true),
        voteAverage: item.vote_average,
        voteCount: item.vote_count,
        rating: getTMRating(item),
        runtime: getRuntime(item),
        episodeType: item.episode_type
    };
}
function getMassagedEpisodeList(item) {
    const episodes = [];
    item && (item === null || item === void 0 ? void 0 : item.forEach((item) => {
        if (!item || !item.id || !item.episode_number)
            return;
        const episode = getCompactEpisode(item);
        if (episode)
            episodes.push(episode);
    }));
    return episodes;
}
function getMassgedSeasonItem(item) {
    return {
        id: item.id,
        seasonNumber: item.season_number,
        airDate: getDateString(item.air_date),
        year: getYear(item),
        episodeCount: item.episode_count,
        name: item.name,
        overview: getOverview(item, context_1.MediaType.TV),
        poster: getPoster(item),
        thumbnail: getThumbnail(item),
        voteAverage: item.vote_average,
        rating: getTMRating(item),
        episodes: item.episodes ? getMassagedEpisodeList(item.episodes) : [],
        credits: {
            directors: [],
            writers: [],
            cast: [],
            crew: []
        }
    };
}
function getMassagedSeasonsList(item) {
    const seasons = [];
    item === null || item === void 0 ? void 0 : item.forEach((item) => {
        if (!item || !item.id || !item.season_number)
            return;
        const season = getMassgedSeasonItem(item);
        seasons.push(season);
    });
    return seasons;
}
function getTvShowDetails(details, credits, images, videos, similar, recommendations, omdb, watchProviders, reviews) {
    var _a, _b;
    return Object.assign(Object.assign({ id: details.id, mediaType: context_1.MediaType.TV, name: getName(details), overview: getOverview(details), poster: getPoster(details), thumbnail: getThumbnail(details), backdrop: getBackdrop(details), popularity: details.popularity, voteAverage: details.vote_average, voteCount: details.vote_count, genres: getGenres(details), released: getDateString(details.release_date), firstAirDate: getDateString(details.first_air_date), lastAirDate: getDateString(details.last_air_date), numberOfEpisodes: details.number_of_episodes, numberOfSeasons: details.number_of_seasons, productionCompanies: getProductionCompanies(details), productionCountries: (_a = details.production_countries) === null || _a === void 0 ? void 0 : _a.map((c) => c.name), spokenLanguages: (_b = details.spoken_languages) === null || _b === void 0 ? void 0 : _b.map((l) => ({ id: l.iso_639_1, englishName: l.english_name, name: l.name })) }, getMassagedOmdbMedia(omdb)), { credits: getCredits(credits, context_1.MediaType.MOVIE), images: getMassagedImagesList(images), videos: getVideos(videos), similar: getMassagedCompactMediaList((similar === null || similar === void 0 ? void 0 : similar.results) || [], context_1.MediaType.TV), recommendations: getMassagedCompactMediaList((recommendations === null || recommendations === void 0 ? void 0 : recommendations.results) || [], context_1.MediaType.TV), subtext: getSubtext(details, omdb), ratings: getRatings((omdb === null || omdb === void 0 ? void 0 : omdb.Ratings) || [], details), tagline: details.tagline, year: getYear(details) ? `(${getYear(details)})` : undefined, rating: getTMRating(details), watchProviders: getWatchProviders(watchProviders), reviews: getReviewData(reviews), lastAirEpisode: getCompactEpisode(details.last_episode_to_air), nextAirEpisode: getCompactEpisode(details.next_episode_to_air), seasons: getMassagedSeasonsList(details.seasons) });
}
function getPersonDetails(details, credits, images) {
    return {
        id: details.id,
        mediaType: context_1.MediaType.PERSON,
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
        credits: getCredits(credits, context_1.MediaType.PERSON),
        images: getMassagedImagesList(images),
        subtext: getSubtext(details)
    };
}
function getSearchResultsData(item) {
    return {
        page: (item === null || item === void 0 ? void 0 : item.page) || 0,
        totalPages: (item === null || item === void 0 ? void 0 : item.total_pages) || 0,
        totalResults: (item === null || item === void 0 ? void 0 : item.total_results) || 0,
        list: getMassagedCompactMediaList(item.results || [])
    };
}
function getMassagedMedia(items, type, countrycode) {
    const [details, credits, images, videos, similar, recommendations, watchProviders, reviews, omdb] = items;
    countryCode = countrycode;
    if (type === context_1.MediaType.MOVIE)
        return getMovieDetails(details, credits, images, videos, similar, recommendations, omdb, watchProviders === null || watchProviders === void 0 ? void 0 : watchProviders.results, reviews);
    if (type === context_1.MediaType.TV)
        return getTvShowDetails(details, credits, images, videos, similar, recommendations, omdb, watchProviders === null || watchProviders === void 0 ? void 0 : watchProviders.results, reviews);
    return getPersonDetails(details, credits, images);
}
