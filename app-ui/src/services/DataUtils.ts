import { db } from "../environment/environment";
import { Recent } from "./ServicesExport";


export function sortMoviesListBy(list: Array<any>, property: string, ascendingOrder: boolean = false): Array<any>{
    let data: Array<any> = [...list];
    data.sort((p: any, c: any) => p[property] > c[property] && ascendingOrder ? 1 : -1);
    return data;
}

export function getPhotoUrl(item: any, shortPhoto: boolean = false): string{
    let imageUrl: string = shortPhoto ? db.shortImageUrl : db.imageUrl;
    if(item.hasOwnProperty('poster_path') && item['poster_path']) imageUrl = imageUrl + item['poster_path'];
    else if(item.hasOwnProperty('profile_path') && item['profile_path']) imageUrl = imageUrl + item['profile_path'];
    else if(item.hasOwnProperty('Poster') && item['Poster']) imageUrl = item['Poster'];
    else if(item.hasOwnProperty('logo_path') && item['logo_path']) imageUrl = imageUrl + item['logo_path'];
    else if(item.hasOwnProperty('file_path') && item['file_path']) imageUrl = imageUrl + item['file_path'];
    else imageUrl = '/src/assets/not_found.jpg';

    return imageUrl;
}

export function getName(item: any): string{
    let name: string = '';
    if(item.hasOwnProperty('name') && item['name']) name = item['name'];
    else if(item.hasOwnProperty('title') && item['title']) name = item['title'];
    else if(item.hasOwnProperty('Title') && item['Title']) name = item['Title'];
    else name = 'Unknown';

    return name;
}

export function getOverview(item: any): string{
    let overview: string = '';
    if(item.hasOwnProperty('overview') && item['overview']) overview = item['overview'];
    else if(item.hasOwnProperty('Plot') && item['Plot']) overview = item['Plot'];
    else if(item.hasOwnProperty('biography') && item['biography']) overview = item['biography'];
    else overview = '';

    return overview;
}

export function getOriginalName(item: any): string{
    let name: string = '';
    if(item.hasOwnProperty('original_name') && item['original_name']) name = item['original_name'];
    else if(item.hasOwnProperty('original_title') && item['original_title']) name = item['original_title'];
    else if(item.hasOwnProperty('Title') && item['Title']) name = item['Title'];
    else name = getName(item);

    return name;
}

export function getYear(item: any, concat: boolean = false): string{
    let year: string = '';

    if(item.hasOwnProperty('release_date') && item['release_date']) year = String(item['release_date']).split('-')[0];
    else if(item.hasOwnProperty('first_air_date') && item['first_air_date']){
        year += item['first_air_date'].split('-')[0];
        year += item.hasOwnProperty('last_air_date') && item['last_air_date'] ? '-'+item['last_air_date'].split('-')[0] : '';
    }
    else if(item.hasOwnProperty('Year') && item['Year']) year = item['Year'];
    else return '';
    
    if(concat) year = '(' + year + ')';

    return year;
}

function checkRuntime(runtime: number): string{
    if(runtime > 60) return `${Math.floor(runtime/60)}h ${Math.floor(runtime%60) > 0 ? Math.floor(runtime%60)+'m' : '' }`;
    return `${runtime}m`
}

export function getRunTime(item: any): string{
    let runtime: string = '';

    if(item.hasOwnProperty('runtime') && item['runtime']) runtime = checkRuntime(item['runtime']);
    else if(item.hasOwnProperty('episode_run_time') && item['episode_run_time'] && item['episode_run_time'].length) runtime = checkRuntime(item['episode_run_time'][0]);
    else if(item.hasOwnProperty('Runtime') && item['Runtime']) runtime = checkRuntime(parseInt(item['Runtime'].split(' ')));
    else runtime = '';

    return runtime;
}

export function getGenreNamesByIds(genreIds: Array<number>): Array<string>{
    return genres.filter((genre: any) => genreIds.find(id => id == genre.id)).map((genre: any) => genre.name);
}

export function getSubText(item: any, showCharacter: boolean = false): string{
    const subText: Array<string> = [];

    if(item['media_type'] !== 'person'){
        if(item?.genre_ids) subText.push(...getGenreNamesByIds(item['genre_ids']));
        else if(item?.genres) subText.push(...getGenreNamesByIds(item['genres']));
    }
    else{
        if(item['known_for_department']) subText.push(item['known_for_department']);
        if(item['known_for'] && item['known_for'].length)
            subText.push(`${getName(item['known_for'][0])} ${getYear(item['known_for'][0])}`)
    }
    if(showCharacter && item.hasOwnProperty('character') && item['character']) subText.push(item['character']);

    return subText.join(', ');
}

export function getRelevanceSearchBarResults(list: Array<any>): Array<string>{
    const redundantMedias = list.map((item: any) => item['media_type']);
    const medias = redundantMedias.filter((media: string, index: number) => redundantMedias.indexOf(media) === index);
    
    if(!medias.find((media => media === 'person'))) medias.push('person');
    if(!medias.find((media => media === 'movie'))) medias.push('movie');
    if(!medias.find((media => media === 'tv'))) medias.push('tv');
    return medias;
}

export function getVotes(item: any): string{
    if(!item || !item.hasOwnProperty('imdbVotes') || !item.imdbVotes || item.imdbVotes == 'N/A') return '';
    
    let num: number = 1, votes: string = item.imdbVotes.split(',').join('');
    if(parseInt(votes) < 1000) return votes; 
    let dict: any = { 1000: 'K', 1000000: 'M', 100000000: 'B' };
    num = parseInt(Object.keys(dict).reduce((p: string, c: string) => parseInt(votes) > parseInt(p) ? parseInt(votes) > parseInt(c) ? c : p : votes));
    let temp = Math.round(parseInt(votes)*10/num)/10;
    votes = dict[num];
    votes = (temp > 100 ? Math.round(temp) : temp) + votes;
    return votes;
}

export function detailsSubText(details: any, ratings: any): Array<string>{
    const arr = [];
    if(details.hasOwnProperty('first_air_date')) arr.push('TV Series');
    
    let year: string = getYear(details);
    if(!year?.length && ratings) year = getYear(ratings);
    if(year?.length) arr.push(year);

    let runtime: string = getRunTime(details);
    if(!runtime.length && ratings) runtime = getRunTime(ratings);
    if(runtime?.length) arr.push(runtime);

    if(ratings && ratings.hasOwnProperty('Rated') && ratings?.Rated != 'N/A') arr.push(ratings.Rated);

    if(details?.known_for_department) arr.push(details.known_for_department);
    // if(details?.birthday){
    //     const bday: string = getBirthDay(details) + ' ' +new Date(details.birthday).getFullYear();
    //     arr.push(`${bday}`);
    // }
    if(details?.deathday){
        const died: string = getBirthDay(details, 'deathday') + ' ' +new Date(details.deathday).getFullYear();
        arr.push(`Died - ${died}`);
    }
    // if(details?.birthday){
    //     const age: number = new Date().getFullYear() - new Date(details.birthday).getFullYear();
    //     arr.push(age+'Y');
    // }
    return arr;
}

export function getOfficialVideo(list: Array<any>): any{
    if(!list.length) return null;
    
    let data = list.filter((item) => item.official);
    if(!data.length) data = list;
    let temp = data.filter(item => String(item.type).toLocaleLowerCase() === 'trailer');
    if(temp.length) data = temp;
    let temp2 = data.filter(item => String(item.name).toLocaleLowerCase().includes('trailer'));
    if(temp2.length) data = temp2;

    return data[0];
}

export function getVideoUrl(video: any): string{
    let videoUrl = '';
    if(String(video.site).toLocaleLowerCase() === 'youtube') videoUrl = db.youtube;
    else if(String(video.site).toLocaleLowerCase() === 'vimeo') videoUrl = db.vimeo;
    else return '';

    return '//'+videoUrl+video.key;
}

export function getPhotosList(photos: any): Array<any>{
    let arr = [];
    if(photos.hasOwnProperty('backdrops') && photos.backdrops.length) arr = photos.backdrops;
    if(photos.hasOwnProperty('posters') && photos.posters.length) arr = [...arr, ...photos.posters];
    if(photos.hasOwnProperty('logos') && photos.logos.length) arr = [...arr, ...photos.logos];
    if(photos.hasOwnProperty('profiles') && photos.profiles.length) arr = [...arr, ...photos.profiles];
    return arr;
}

export function getRottenTomatoesRating(item: any): string | null{
    if(item && item.hasOwnProperty('Ratings') && item.Ratings.length){
        const rt = item.Ratings.find((rate: any) => rate.Source === 'Rotten Tomatoes');
        return rt?.Value;
    }
    return null;
}

export function getBirthDay(item: any, property: string = 'birthday'): string{
    let birthday: string = '';
    if(item.hasOwnProperty(property) && item?.[property]){
        birthday = new Date(item[property]).getDate()+'';
        birthday += ' ' + new Date(item[property]).toDateString().split(' ')[1];
    }
    return birthday;
}


export function storeRecents(item: any, mediaType: string){
    const current: Recent = { id: item.id, mediaType, name: getName(item), imageUrl: getPhotoUrl(item), subText: getSubText(item), year: getYear(item, true) }
    let recents: Array<any> = parseString(localStorage.getItem('recents'));
    recents = recents.filter((recent: Recent) => {
        if(recent.id === item.id && recent.mediaType === mediaType) return;
        return recent;
    })
    recents = [current, ...recents];
    
    localStorage.setItem('recents', JSON.stringify(recents));
}

export function clearRecents(setRecentsCallback?: any){
    localStorage.removeItem('recents');
    if(setRecentsCallback) setRecentsCallback([]);
}

export function parseString(str?: string | undefined | null): Array<Recent>{
    if(str) return JSON.parse(str);
    return [];
}

export function getProducers(list: Array<any>): Array<any>{
    return list?.filter((item: any) => String(item.job).toLocaleLowerCase() === 'producer');
}

export function getDirectors(list: Array<any>): Array<any>{
    return list?.filter((item: any) => String(item.job).toLocaleLowerCase() === 'director');
}

export function getWriters(list: Array<any>): Array<any>{
    let data = list?.filter((item: any) => String(item.department).toLocaleLowerCase() === 'writing');
    let ids = data.map((item) => item.id);
    ids = ids.filter((id, index) => index == ids.indexOf(id));
    const returnList: Array<any> = [];
    ids.forEach(id => {
        let temp = data.find(item => item.id === id);
        if(temp) {
            returnList.push({
                id, adult: temp.adult,
                credit_id: temp.credit_id,
                department: temp.department,
                gender: temp.gender,
                name: temp.name,
                original_name: temp.original_name,
                popularity: temp.popularity,
                profile_path: temp.profile_path,
                known_for: data.filter(item => item.id === id)
            })
        }
    })
    return returnList;

}

export function filterListByEqualPropertyValue(list: Array<any>, property: string, value: string): Array<any>{
    if(!list) return [];
    if(!property || !value) return list;
    return list.filter((item: any) => String(item[property]).toLocaleLowerCase() == String(value).toLocaleLowerCase());
}

export function filterListByIncludesPropertyValue(list: Array<any>, property: string, value: string): Array<any>{
    if(!list) return [];
    if(!property || !value) return list;
    return list.filter((item: any) => String(item[property]).toLocaleLowerCase().includes(String(value).toLocaleLowerCase()));
}

export function setValue(property: string, dictionary: any, callback?: any): string{
    if(callback) callback(dictionary.hasOwnProperty(property) ? dictionary[property] : '');
    return dictionary.hasOwnProperty(property) ? dictionary[property] : '';
}

export function getMediaAndIdInfoFromUrl(pathname: string): { mediaType: string, id: string, comp: string } | null{
    const data: any = { mediaType: null, id: null, comp: null };
    if(pathname){
        let arr = pathname.split('/');
        data.mediaType = arr[1];
        if(arr.length > 2){
            data.comp = arr[2];
            data.id = arr[3];
        }
        else data.id = arr[2];
    }

    return data.id && data.mediaType ? data : null;
}

export function getStreamingDimensionsUrl(stream: any, short: boolean = false): string{
    const data = streamingDimensions?.find((s: any) => s.platform.includes(stream.provider_name));
    
    return short ? data?.shortUrl : data?.url;
}

export const genres = [
    {
        "id": 10759,
        "name": "Action & Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 10762,
        "name": "Kids"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10763,
        "name": "News"
    },
    {
        "id": 10764,
        "name": "Reality"
    },
    {
        "id": 10765,
        "name": "Sci-Fi & Fantasy"
    },
    {
        "id": 10766,
        "name": "Soap"
    },
    {
        "id": 10767,
        "name": "Talk"
    },
    {
        "id": 10768,
        "name": "War & Politics"
    },
    {
        "id": 37,
        "name": "Western"
    },
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    }
]



export const streamingDimensions: Array<any> = [
    {
        platform: "Hotstar",
        url: "/src/assets/disney_hotstar.avif",
        shortUrl: "/src/assets/disney_hotstar_square.jpeg"
    },
    {
        platform: "Lionsgate Play",
        url: "/src/assets/lionsgate_play.webp",
        shortUrl: "/src/assets/lionsgate_square.png",
    },
    {
        platform: "Netflix",
        url: "/src/assets/netflix.jpeg",
        shortUrl: "/src/assets/netflix_square.jpeg",
    },
    {
        platform: "Amazon Prime Video",
        url: "/src/assets/prime_video.webp",
        shortUrl: "/src/assets/prime_video_square.png"
    },
    {
        platform: "Amazon Video",
        url: "/src/assets/prime_video.webp",
        shortUrl: "/src/assets/prime_video_square.png"
    },
    {
        platform: "Apple TV Plus",
        url: "/src/assets/apple_tv_plus.jpg",
        shortUrl: "/src/assets/apple_tv.png"
    },
    {
        platform: "Zee5",
        url: "/src/assets/zee-5.jpg",
        shortUrl: "/src/assets/zee-5.jpg"
    },
    {
        platform: "Jio Cinema",
        url: "/src/assets/jio_cinema.avif",
        shortUrl: "/src/assets/jio_cinema.avif"
    },
    {
        platform: "Sony Liv",
        url: "/src/assets/sony_liv.jpeg",
        shortUrl: "/src/assets/sony_liv.jpeg"
    }
];