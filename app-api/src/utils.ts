import { MediaType } from "./context/context";
import { decrypt } from "./cryptr"
import { MOVIE, OMDB_DEL, OMDB_URL, PERSON, TV, TV_SEASON } from "./env/env";
import { getOMKey, getTMKey } from "./keys-utils"

export const getResolvedTMUrl = (url: string, substitute: Array<string>, replacement: Array<string>, count: number = 1): string => {
    const key = decrypt(getTMKey(count));
    url = url + "api_key=" + key;
    for (let i = 0; i < substitute.length; i++) url = url.replace(substitute[i], replacement[i]);
    return url;
}

export const getResolvedTMDetailsUrl = (id: string, media: MediaType, season?: number): Array<string> => {
    let urls: Array<string> = [];
    const detail: any = media === MediaType.MOVIE ? MOVIE : media === MediaType.PERSON ? PERSON : media === MediaType.TV && season ? TV_SEASON : TV;
    urls = [detail.details, detail.credits, detail.images];
    if(media === MediaType.TV || media === MediaType.MOVIE) urls = [...urls, detail.videos, detail.similar, detail.recommendations];

    urls = urls.map((url: string) => getResolvedTMUrl(url, [detail.delimiter], [id]));
    return urls;
}

export const getResolvedOMUrl = (id: string): string => {
    const key = decrypt(getOMKey(1));
    const url = OMDB_URL.replace(OMDB_DEL, id) + key;
    return url;
}

export const getResolvedTMExternalIdUrl = (id: string, media: MediaType) => {
    const detail = media === MediaType.MOVIE ? MOVIE : media === MediaType.PERSON ? PERSON : TV;
    return getResolvedTMUrl(detail.externalIds, [detail.delimiter], [id]);
}