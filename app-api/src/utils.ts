import { decrypt } from "./cryptr"
import { getTMKey } from "./keys-utils"

export const getResolvedTMUrl = (url: string, substitute: Array<string>, replacement: Array<string>, count: number = 1): string => {
    const key = decrypt(getTMKey(count));
    url = url + key;
    for (let i = 0; i < substitute.length; i++) url = url.replace(substitute[i], replacement[i]);
    return url;
}

const IMAGE_NOT_FOUND = "";
const SHORT_IMAGE_URL = `https://image.tmdb.org/t/p/w500`;
const IMAGE_URL = `https://image.tmdb.org/t/p/original`;
export function getThumbnail(item: any): string {
    if(item?.poster_path != undefined) return SHORT_IMAGE_URL + item.poster_path;
    else if(item?.profile_path != undefined) return SHORT_IMAGE_URL + item.profile_path;
    else if(item?.still_path != undefined) return SHORT_IMAGE_URL + item.still_path;
    else if(item?.file_path != undefined) return SHORT_IMAGE_URL + item.file_path;
    return IMAGE_NOT_FOUND;
}
export function getImage(item: any): string {
    if(item?.poster_path != undefined) return IMAGE_URL + item.poster_path;
    else if(item?.profile_path != undefined) return IMAGE_URL + item.profile_path;
    else if(item?.still_path != undefined) return IMAGE_URL + item.still_path;
    else if(item?.file_path != undefined) return IMAGE_URL + item.file_path;
    return IMAGE_NOT_FOUND;
}
export function getBackdropImage(item: any, inHD: boolean = true): string | null {
    if(item?.backdrop_path != undefined) return (inHD ? IMAGE_URL : SHORT_IMAGE_URL) + item.backdrop_path;
    return null;
}