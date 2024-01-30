import { useEffect, useState } from "react";
import { getDirectors, getOverview, getProducers, getRottenTomatoesRating, getStreamingDetailsByMovieId, getStreamingDetailsByTvId, getWriters, streamingDimensions } from "../../services/ServicesExport";
import { NavLink } from "react-router-dom";
import { Dot } from "lucide-react";
import { PlusIcon } from "@heroicons/react/20/solid";

const default_arr: Array<any> = [];
const default_obj: any = {};
export default function Overview({ details, credits, ratings, mediaType }: any){
    const creditsList = credits.cast && credits.crew ? [...credits.cast, ...credits.crew] : [...credits.crew];
    const rottenTomatoes: string | null = getRottenTomatoesRating(ratings);
    const metaCondition: boolean = ratings && ratings?.Metascore && ratings.Metascore !== 'N/A';

    const [streaming, setStreaming] = useState(default_arr);
    const [showBio, setShowBio] = useState(false);

    const [crew, setCrew] = useState(default_arr);

    const [streamingPlatform, setStreamingPlatform] = useState(default_obj);
    

    const loadStreamingDetails = (getStreamingDetails: any) => {
        if(mediaType !== 'person')
        getStreamingDetails(details.id).then((result: any) => {
            if(result?.results && result.results.hasOwnProperty('IN')){
                if(result.results.IN.hasOwnProperty('flatrate')){
                    setStreaming(result.results.IN.flatrate);
                    const stream = result.results.IN.flatrate?.reduce((p: any, c: any) => p?.display_priority < c?.display_priority ? p : c);
                    setStreamingPlatform(
                        streamingDimensions?.find((s: any) => s.platform === stream.provider_name)
                    )
                }
            }
        })
    }
    
    const searchByGenre = (id: number) => {
        console.log(id);
    }

    useEffect(() => {
        mediaType === 'tv' ? loadStreamingDetails(getStreamingDetailsByTvId) : loadStreamingDetails(getStreamingDetailsByMovieId);

        const arr = [];
        let temp = getDirectors(creditsList.filter((item: any) => String(item.known_for_department).toLocaleLowerCase() === 'directing')).slice(0, 3);
        if(temp && temp.length) arr.push({ title: 'Directors', list: temp });

        temp = getProducers(creditsList.filter((item: any) => String(item.known_for_department).toLocaleLowerCase() === 'production')).slice(0, 3);
        if(temp && temp.length) arr.push({ title: 'Producers', list: temp });

        temp = getWriters(creditsList.filter((item: any) => String(item.known_for_department).toLocaleLowerCase() === 'writing')).slice(0, 3);
        if(temp && temp.length) arr.push({ title: 'Writers', list: temp });

        setCrew(arr);
    }, [])

    return (
        <div className="overview mt-3">
            <div className="overview-left">
                {
                    details?.genres && details?.genres?.length ?
                    <div className="genres">
                        {
                            details.genres.map((genre: any) => (
                                <button className="genre" key={'overview'+genre.id} onClick={() => searchByGenre(genre.id)}>{ genre.name }</button>
                            ))
                        }
                    </div> : <></>
                }
                <p className="plot">
                    { getOverview(details).length > 500 && !showBio ? 
                    <>
                        { getOverview(details).length > 500 ? getOverview(details).substring(0, 450)+'...' : getOverview(details) }<span 
                            onClick={() => setShowBio(true)}
                            className="text-blue-500 text-sm hover:underline cursor-pointer">Read More</span>
                    </> : getOverview(details)}
                </p>
                {
                    crew && crew.length ?
                    <div className="crew">
                        {
                            crew.map((item: any) => (
                                <div className="crew-item flex" key={item.title}>
                                    <h1 className="font-bold">{ item.title }</h1>
                                    <span className="flex flex-wrap">
                                        {
                                            item.list.map((person: any, index: number) => (
                                                <span className="flex flex-wrap" key={person.id}>
                                                    <NavLink to={`/person/${person.id}`} className="text-blue-500 hover:underline mx-1">{ person.name }</NavLink>
                                                    { index < item.list.length - 1 && <Dot />}
                                                </span>
                                            ))
                                        }
                                    </span>
                                </div>
                            ))
                        }
                    </div> : <></>
                }
            </div>
            {
                rottenTomatoes || metaCondition || streaming?.length ?
                <div className="overview-right">
                    {
                        streamingPlatform && streamingPlatform?.url ?
                        <div className="streaming">
                            <p className="text-gray-400">STREAMING</p>
                            <a href={streamingPlatform.urlPath} target="_blank" className="streaming-image" style={{ background: streamingPlatform ? `url('${streamingPlatform.url}') center/cover no-repeat`: `url('/src/assets/not_found.jpg') center/cover` }}>
                            </a>
                        </div> : <></>
                    }
                    <button className="text-xs bg-app w-full p-1 mb-5 text-black rounded-sm flex items-center">
                        <PlusIcon className="w-5 h-5 mr-1" />
                        Add to Watchlist
                    </button>
                    {
                        ratings && ratings?.Metascore && ratings.Metascore !== 'N/A' ?
                        <div className="flex items-center">
                            <span className={ratings.Metascore > '60' ? "meta bg-green-400 text-black" : ratings.Metascore > "30" ? "meta bg-yellow-400 text-black" : "meta bg-red-400"}>
                                { ratings.Metascore }
                            </span> <span className="text-xs ml-2">Metascore</span>
                        </div> : <></>
                    }
                    {
                        rottenTomatoes ?
                        <div className="rt-rating mt-2 text-xs">
                            <div className="rt-logo mr-2 "></div>
                            <div> { rottenTomatoes } </div>
                        </div> : <></>
                    }
                </div> : <></>
            }
        </div>
    );
}
