import { Image, MediaType, ImageData } from "../context/media-context";

export const getMediaType = (media?: string) => media === 'tv' ? MediaType.TV : media === 'movie' ? MediaType.MOVIE : MediaType.PERSON;

export const getMediaDataFromPathName = (path: string): { valid: boolean, id: string, media: MediaType }=> {
    const [, media, id] = path.split('/');
    if(!id?.length || !media?.length) return { valid: false, id: "", media: getMediaType(media) };
    return { valid: true, id, media: getMediaType(media) };
}

export const getShortString = (text: string, length: number = 29): string => {
    return text.length > length ? (text.substring(0, length - 5).trim() + '...') : text;
}

export const getBackdrops = (images: ImageData, backdrop?: string): Array<string> => {
    const list: Array<string> = images.backdrops.filter((img: Image) => img.width >= 1920).map((img: Image) => img.path);
    return !list.length ? backdrop ? [backdrop] : [] : list;
}