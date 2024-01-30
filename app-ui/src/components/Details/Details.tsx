import { useEffect, useState } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { getMoreDetails, getMovieDetailsByImdbId, getName, getStreamingDimensionsUrl, getStreamingPageUrl, getTVDetailsByImdbId, getYear, storeRecents } from "../../services/ServicesExport";
import { InfinitySpin } from "react-loader-spinner";
import DetailsHero from "./DetailsHero";
import DetailsHead from "./DetailsHead";
import Credits from "./Credits";
import Overview from "./Overview";
import { ChevronRightIcon } from "lucide-react";

// {mediaType: string, id: string, data: Array<Promise<any>>}
const default_arr: Array<any> = [];
const default_obj: any = null;
export default function Details(){
    const data: any = useLoaderData();
    const location: any = useLocation();

    const [loader, setLoader] = useState(true);
    const [results, setResults] = useState(default_arr);
    const [details, setDetails] = useState(default_obj);
    const [prevLocation, setPrevLocation] = useState(default_obj);
    const [networks, setNetworks] = useState(default_obj);
    const [moreDetails, setMoreDetails] = useState(default_arr);

    
    useEffect(() => {
        if(prevLocation && location.pathname !== prevLocation.pathname){
            setPrevLocation(location);
            window.location.reload();
        }
    }, [location])

    const loadDetails = (imdb_id: string, getDetails: any) => {
        getDetails(imdb_id).then((result: any) => {
            setDetails(result);
            setMoreDetails(getMoreDetails(result));
            setLoader(false);
        })
    }

    useEffect(() => {
        setPrevLocation(location);

        Promise.all(data.data).then(((results: any) => {
            setResults(results);
            
            document.title = getName(results[0]) + ' ' + getYear(results[0], true) + ' - Movie Database';
            if(data.mediaType !== 'person'){
                console.log(results[4]?.results?.IN);
                
                if(results[4]?.results?.IN) setNetworks(results[4].results?.IN);
                if(data.mediaType === 'tv' && results[5]?.imdb_id) loadDetails(results[5].imdb_id, getTVDetailsByImdbId);
                else if(data.mediaType === 'movie' && results[0]?.imdb_id) loadDetails(results[0].imdb_id, getMovieDetailsByImdbId);
                else setLoader(false);
            }
            else setLoader(false);
            storeRecents(results[0], data.mediaType);
        }))
    }, [])

    return (
        loader ? 
            <div className="loader-container min-bg-h">
                <div className="loader">
                    <InfinitySpin
                        width="200"
                        color="#ed7b7b"
                    /> 
                </div>
            </div>:
            <div className={"min-bg-h recents-active cursor-default"}>
                <div className="flex flex-col items-center w-full bg-black py-5">
                    <div className="details text-white cursor-default">
                        <DetailsHead details={results[0]} ratings={details} />
                        <DetailsHero details={results[0]} mediaType={data.mediaType} photos={results[2]} videos={results.length > 3 ? results[3] : null} />
                        <Overview details={results[0]} credits={results[1]} ratings={details} mediaType={data.mediaType} />
                    </div>
                </div>
                <div className="flex flex-col items-center w-full py-4 ">
                    {
                        details && details?.Awards && details?.Awards !== 'N/A' ?
                        <div className="awards text-white border-app">
                            <p className="text-sm">{ details.Awards }</p>
                        </div> : <></>
                    }
                    <Credits 
                        heading={data.mediaType === 'person' ? 'Known For' : 'Top Cast'}
                        details={results[0]}
                        allCredits={results[1]} mediaType={data.mediaType}
                        allText={data.mediaType === 'person' ? 'All Filmography' : 'All Cast & Crew'}
                    />
                    
                    {
                        results.length > 4 && (networks?.flatrate?.length>1 || networks?.buy?.length > 1 || networks?.rent?.length > 1) ?
                        <div className="networks">
                            {
                                moreDetails && moreDetails?.length ?
                                <div className="px-5 my-3">
                                    <h1 className="text-white text-xl flex border-l-4 pl-3 border-app">
                                        Details
                                        <ChevronRightIcon className="h-8 w-8 color-app" style={{ marginTop: '-1px' }} />
                                    </h1>
                                    <div className="text-white py-5 flex justify-between gap-5 flex-wrap">
                                        {
                                            moreDetails.map((item: any, index: number) => (
                                                <div className="more-details-item" key={item.id+index}>
                                                    <h1 className="font-semibold text-xl color-app">{ item.id }</h1>
                                                    <p className="text-gray-300">{ item.value }</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div> :
                                <></>
                            }
                            <div className="flex">
                                {
                                    networks?.flatrate?.length &&
                                    <>
                                        <div className="streaming">
                                            <p className="text-gray-400 text-xs">STREAMING ON </p>
                                            <div className="flex gap-3 flex-wrap">
                                            {
                                                networks.flatrate.map((item: any, index: number) => 
                                                    <a href={getStreamingPageUrl(item)} target="_blank" className="streaming-image"  key={index} style={{ background: getStreamingDimensionsUrl(item) ? `url('${getStreamingDimensionsUrl(item)}') center/cover no-repeat`: `url('/src/assets/not_found.jpg') center/cover` }}></a>
                                                )
                                            }
                                            </div>
                                        </div>
                                        
                                    </>
                                }
                                {
                                    networks?.rent?.length &&
                                    <>
                                        <div className="streaming">
                                            <p className="text-gray-400 text-xs mb-1">AVAILABLE FOR RENT ON </p>
                                            <div className="flex gap-4 flex-wrap">
                                            {
                                                networks.rent.map((item: any, index: number) => 
                                                    getStreamingDimensionsUrl(item, true)?.length &&
                                                    <a href={getStreamingPageUrl(item)} target="_blank" className="rent-image rounded-md"  key={index} style={{ background: `url('${getStreamingDimensionsUrl(item, true)}') center/cover no-repeat` }}></a>
                                                )
                                            }
                                            </div>
                                        </div>
                                        
                                    </>
                                }
                                {
                                    networks?.buy?.length &&
                                    <>
                                        <div className="streaming">
                                            <p className="text-gray-400 text-xs mb-1">BUY ON </p>
                                            <div className="flex gap-4 flex-wrap">
                                            {
                                                networks.buy.map((item: any, index: number) => 
                                                    getStreamingDimensionsUrl(item, true)?.length &&
                                                    <a href={getStreamingPageUrl(item)} target="_blank" className="rent-image rounded-md"  key={index} style={{ background: `url('${getStreamingDimensionsUrl(item, true)}') center/cover no-repeat` }}>.</a>
                                                )
                                            }
                                            </div>
                                        </div>
                                        
                                    </>
                                }
                            </div>

                        </div>
                        : <></>
                    }
                </div>
            </div>
    );
}