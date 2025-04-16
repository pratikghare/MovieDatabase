import { getResolvedOMUrl, getResolvedTMDetailsUrl, getResolvedTMExternalIdUrl, getResolvedTMUrl } from "../utils";

import movie from "../../../samples/details_movie.json";
import person from "../../../samples/details_person.json";
import tv from "../../../samples/details_tv.json";
import { getMassagedMedia } from "../media-utils";
import { MediaType } from "../context/context";
import { DEFAULT_REGION } from "../env/env";

const Media = {
    __resolveType(obj: any) {
        switch (obj.mediaType) {
            case 'movie':
                return 'Movie';
            case 'tv':
                return 'TvShow';
            case 'person':
                return 'Person';
            default:
                return null;
        }
    }
}


const details = async (_: any, { id, media }: { id: string, media: MediaType }, context: any) => {
    try {
        const countryCode: string = context?.location?.country_code ? context.location.country_code : DEFAULT_REGION;
        console.log('Details Query', context);
        let imdbId: string = "";
        if(media === MediaType.TV) {
            const id_response = await fetch(getResolvedTMExternalIdUrl(id, media));
            imdbId = (await id_response.json()).imdb_id;
        }
        const urls: Array<string> = getResolvedTMDetailsUrl(id, media);
        if(imdbId) urls.push(getResolvedOMUrl(imdbId));
        const promises = urls.map((url: string) => fetch(url));
        const responses = await Promise.all(promises);
        const data = await Promise.all(
            responses.map((response: any) => response.json())
        );
        if (media === MediaType.MOVIE  && data.length && data[0]?.imdb_id?.length > 0) {
            data.push(await (await fetch(getResolvedOMUrl(data[0].imdb_id))).json());
        }
        
        // const data: any[] = media === MediaType.MOVIE ? movie : media === MediaType.PERSON ? person : tv;
        console.log(countryCode)
        const result = getMassagedMedia(data, media, countryCode);
        return result;

    }
    catch (error) {
        console.log("ERROR: ", error);
    }
}
const mediaResolver = {
    Query: {
        details
    },
    Media
}

export default mediaResolver;