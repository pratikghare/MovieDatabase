import ColorThief from 'colorthief';
import { Image as ImageType, MediaType, ImageData, CompactMedia, TvShow, Media, Movie, Person, Season, Credits } from '../context/media-context';
import { clearDetails } from '../store/reducers/media-reducer';
import { updateBackground, updateBackgroundColor } from '../store/reducers/config-reducer';

export const getMediaType = (media?: string) => media === 'tv' ? MediaType.TV : media === 'movie' ? MediaType.MOVIE : MediaType.PERSON;

export const getMediaDataFromPathName = (path: string): { valid: boolean, id: string, media: MediaType } => {
    const [, media, id] = path.split('/');
    if (!id?.length || !media?.length) return { valid: false, id: '', media: getMediaType(media) };
    return { valid: true, id, media: getMediaType(media) };
}

export const getShortString = (text: string, length: number = 29): string => {
    return text.length > length ? (text.substring(0, length - 5).trim() + '...') : text;
}

export const getBackgroundImages = (backdrop?: string, images?: ImageData): Array<string> => {
    if (!backdrop) return [];
    if (!images?.backdrops?.length) return [backdrop];

    let list: Array<any> = images.backdrops.filter((img: ImageType) => img.width > 3000);
    if (!list.length) list = images.backdrops.filter((img: ImageType) => img.width > 2000);
    if (!list.length) list = images.backdrops.filter((img: ImageType) => img.width > 1500);

    return list.length ? list.map((img: ImageType) => img.path) : [backdrop];
}

export const getIsColor = (backdrop?: string, path?: string): boolean => {
    const paths: Array<string> = ['credits', 'videos', 'media'];
    if (!backdrop || backdrop.includes('rgb(')) return true;
    if (!path || paths.find(p => path.includes(p))) return true;
    return false;
}

export const getMediaTypeFromPath = (path: string): MediaType => getMediaType(path.split('/')[1])

export const getImageDimensions = (img: ImageType, height: number = 150): { width: number, height: number, minWidth: number, minHeight: number } => {
    let width: number = img.width;
    width = height * img.aspectRatio;
    return { width, height, minWidth: width, minHeight: height };
}

export const getImageWidth = (image: ImageType, height: number = 150): number => {
    return image.aspectRatio * height;
}

export const getCleanText = (text: string): string => {
    return text
        .replace(/\u00A0/g, ' ')  // non-breaking space → normal space
        .replace(/\u2011/g, '-')  // non-breaking hyphen → normal hyphen
        .replace(/\u2013/g, '-')  // en dash → normal hyphen
        .replace(/\u2014/g, '-')  // em dash → normal hyphen
}

export const getImagesList = (images: ImageData): { top: Array<ImageType>; bottom: Array<ImageType> } => {
    const top: Array<ImageType> = images.backdrops.slice(0, 20);
    top.reverse();
    const bottom: Array<ImageType> = [];

    let index: number = 0;
    if (top.length < 5) while (index < 5 && index < images.list.length) top.push(images.list[index++]);
    let i = 0;
    while (i < top.length && index < images.list.length) {
        bottom.push(images.list[index++]);
        i++;
    }


    if (top.length < 10 || bottom.length < 10) {
        while (top.length < 10 && bottom.length < 10 && index < images.list.length) {
            top.push(images.list[index++]);
            if (index < images.list.length) bottom.push(images.list[index++]);
        }
    }
    return { top, bottom };
}


export const updateArrayUsingProperty = (array: Array<{ key: string, title: string, value: string }>, property: string, details: any, title: string) => {
    if (property in details && !!details[property]) {
        array.push({ key: property, title, value: typeof (details[property]) === 'string' ? details[property] : details[property]?.join(', ') })
    }
}

export const navigateToDetails = (item: CompactMedia, navigate: Function, dispatch: Function) => {
    dispatch(updateBackgroundColor());
    dispatch(updateBackground(item.backdrop));
    setColorFromImage(dispatch, item.thumbnail);
    dispatch(clearDetails());
    navigate(`/${item.mediaType}/${item.id}/`);
}

export const updateBackdropUtils = (dispatch: Function, details?: Movie | Person | TvShow | Media) => {
    if(!details) {
        dispatch(updateBackground());
        return;
    }
    if(details.backdrop) dispatch(updateBackground(details.backdrop));
    else setColorFromImage(dispatch, details?.poster);
}


export const setColorFromImage = (dispatch: Function, path?: string) => {
    if(!path) {
        dispatch(updateBackgroundColor());
        return;
    }
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = `${path}/`;

    img.onload = () => {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);  // Get the dominant color
        // console.log('Setting dominant color:', `rgb(${dominantColor.join(', ')})`);
        dispatch(updateBackgroundColor(`rgb(${dominantColor.join(', ')})`));
    };

    img.onerror = (err) => {
        console.error('Failed to load image for color extraction:', err);
    };
}

export const navigateToSeasons = (navigate: Function, details: Movie | Person | TvShow | Media, season?: Season) => {
    navigate(`/${details.mediaType}/${details.id}/seasons/${season?.seasonNumber ? season.seasonNumber : 1}/`);
}

export const navigateToCredits = (navigate: Function, details: Movie | Person | TvShow | Media) => {
    navigate(`/${details.mediaType}/${details.id}/credits/`);
}

export const navigateToMedia = (navigate: Function, id?: string) => {
    navigate(`media/${id ? id : ''}`);
}

export const getMappedCredits = (data?: Credits): Credits => {
    const credits: Credits = {
        directors: data?.directors ? data.directors : [],
        writers: data?.writers ? data.writers : [],
        cast: data?.cast ? data.cast : [],
        crew: data?.crew ? data.crew : []
    }
    return credits;
}

export const navigateToNotFound = (dispatch: Function, navigate: Function) => {
    dispatch(clearDetails());
    navigate('/not-found');
}
interface CreditListItem {
    title: string;
    list: CompactMedia[];
    show: boolean;
}
export const getUpdatedCreditsList = (updated: Credits, media?: MediaType): CreditListItem[] => {
    const list: CreditListItem[] = [];
    list.push(getCreditListItem(updated.directors, 'Directors'));
    list.push(getCreditListItem(updated.writers, 'Writers'));
    if (media === MediaType.PERSON) {
        list.push(getCreditListItem(updated.cast.filter((item: CompactMedia) => item.mediaType === MediaType.MOVIE), 'All movies'));
        list.push(getCreditListItem(updated.cast.filter((item: CompactMedia) => item.mediaType === MediaType.TV), 'All TV shows'));
    }
    else list.push(getCreditListItem(updated.cast, 'All Cast'));
    list.push(getCreditListItem(updated.crew, 'All Crew'));
    console.log(list)
    return list.filter((item: CreditListItem) => item.show);
}

const getCreditListItem = (list: CompactMedia[], title: string): CreditListItem => {
    return {
        title, list, show: !!list.length
    }
}