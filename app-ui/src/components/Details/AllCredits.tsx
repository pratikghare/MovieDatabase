import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { filterListByEqualPropertyValue, getCreditsByMovieId, getCreditsByPersonId, getCreditsByTvId, getMediaAndIdInfoFromUrl, getMovieDetailsById, getPersonDetailsById, getTVDetailsById } from "../../services/ServicesExport";
import { MoreDetailsHead } from "./MoreDetailsHead";
import SearchResultContainer from "../SearchResults/SearchResultContainer";
import BoxCredits from "./BoxCredits";

const default_obj: any = {};
const default_arr: Array<any> = [];
export default function AllCredits(){
    const location = useLocation();
    const navigate = useNavigate();
    
    const [loader, setLoader] = useState(true);
    const [mediaType, setMediaType] = useState('');
    const [details, setDetails] = useState(default_obj);
    const [credits, setCredits] = useState(default_obj);
    const [directors, setDirectors] = useState(default_arr);
    const [producers, setProducers] = useState(default_arr);
    const [writers, setWriters] = useState(default_arr);
    const [cast, setCast] = useState(default_arr);

    const loadAllDetails = (getCredits: any, getDetails: any, id: string) => {
        Promise.all([getCredits(id), getDetails(id)]).then((results: Array<any>) => {
            setLoader(false);
            setDetails(results[1]);
            setCredits(results[0]);
        })
    }

    useEffect(() => {
        if(credits && credits.cast && credits.crew){
            setWriters(filterListByEqualPropertyValue(credits.crew, 'known_for_department', 'Writing'));
            setDirectors(filterListByEqualPropertyValue(credits.crew, 'known_for_department', 'Directing'));
            setProducers(filterListByEqualPropertyValue(credits.crew, 'known_for_department', 'Production'));
            // if(mediaType === 'person') 
            setCast(credits.cast);
            // else setCast(filterListByEqualPropertyValue(credits.cast, 'known_for_department', 'Acting'));
        }
    }, [credits])
    
    useEffect(() => {
        const data = getMediaAndIdInfoFromUrl(location.pathname);
        
        if(location.state && location.state?.allCredits && location.state?.details) {
            setDetails(location.state.allCredits);
            setCredits(location.state.credits);
            setLoader(false);
        }
        if(data){
            setMediaType(data.mediaType);
            if(data.mediaType === 'person') loadAllDetails(getCreditsByPersonId, getPersonDetailsById, data.id);
            else if(data.mediaType === 'movie') loadAllDetails(getCreditsByMovieId, getMovieDetailsById, data.id);
            else if(data.mediaType === 'tv') loadAllDetails(getCreditsByTvId, getTVDetailsById, data.id);
        }
        else navigate('/error-404');
    }, [])

    return (
        loader ? 
        <InfinitySpin
            width="200"
            color="#ed7b7b"
        /> :
        <div className="p-8 min-bg-h recents-active all-credits">
            <MoreDetailsHead details={details} mediaType={mediaType} text={ mediaType === 'person' ? "All Filmography" : "Full Cast & Crew" } />
            <BoxCredits directors={directors} writers={writers} producers={producers} mediaType={mediaType} />
            {
                mediaType === 'person' ? <></> :
                <h1 className="color-app mt-4">Cast & Crew</h1>
            }
            {
                cast && cast.length ?
                <SearchResultContainer data={{ results: cast }} mediaType={ mediaType === 'person' ? 'movie' : 'person' } showFullData={true}  />
                : <></>
            }
        </div>
    );
}