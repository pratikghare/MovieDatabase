import { Image, MediaType, ImageData } from "../context/media-context";

export const getMediaType = (media?: string) => media === 'tv' ? MediaType.TV : media === 'movie' ? MediaType.MOVIE : MediaType.PERSON;

export const getMediaDataFromPathName = (path: string): { valid: boolean, id: string, media: MediaType } => {
    const [, media, id] = path.split('/');
    if (!id?.length || !media?.length) return { valid: false, id: "", media: getMediaType(media) };
    return { valid: true, id, media: getMediaType(media) };
}

export const getShortString = (text: string, length: number = 29): string => {
    return text.length > length ? (text.substring(0, length - 5).trim() + '...') : text;
}

export const getBackdrops = (images: ImageData, backdrop?: string): Array<string> => {
    const list: Array<string> = images.backdrops.filter((img: Image) => img.width >= 1920).map((img: Image) => img.path);
    return !list.length ? backdrop ? [backdrop] : [''] : list;
}

export const getImageDimensions = (img: Image): { width: number, height: number, minWidth: number, minHeight: number } => {
    let width: number = img.width, height: number = img.height;
    height = 150; width = height * img.aspectRatio;
    return { width, height, minWidth: width, minHeight: height };
}

export const getCleanText = (text: string): string => {
    return text
        .replace(/\u00A0/g, ' ')  // non-breaking space → normal space
        .replace(/\u2011/g, '-')  // non-breaking hyphen → normal hyphen
        .replace(/\u2013/g, '-')  // en dash → normal hyphen
        .replace(/\u2014/g, '-')  // em dash → normal hyphen
}

export const getImagesList = (images: ImageData): { top: Array<Image>; bottom: Array<Image> } => {
    const top: Array<Image> = images.backdrops.slice(0, 20);
    top.reverse();
    const bottom: Array<Image> = [];

    let index: number = 0;
    if(top.length < 5) while(index < 5 && index < images.list.length) top.push(images.list[index++]);
    let i = 0;
    while (i < top.length && index < images.list.length) {
        bottom.push(images.list[index++]);
        i++;
    }
    

    if (top.length < 10 || bottom.length < 10) {
        while (top.length < 10 && bottom.length < 10 && index < images.list.length) {
            top.push(images.list[index++]);
            if(index < images.list.length) bottom.push(images.list[index++]);
        }
    }
    return { top, bottom };
}
