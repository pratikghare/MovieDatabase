import { useLocation, useNavigate } from "react-router-dom";
import { MoreDetailsHead } from "./MoreDetailsHead";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { getMediaAndIdInfoFromUrl, getMovieDetailsById, getTVDetailsById, getVideosByMovieId, getVideosByTvId } from "../../services/ServicesExport";
import { VideoPlayer } from "./VideoPlayer";
import Pagination from "../Pagination";

const default_obj: any = {};
const default_arr: Array<any> = [];
export default function VideoGallery(){
    const location = useLocation();
    const navigate = useNavigate();
    const itemsPerPage: number = 12;

    const [loader, setLoader] = useState(true);
    const [videos, setVideos] = useState(default_obj);
    const [details, setDetails] = useState(default_obj);
    const [mediaType, setMediaType] = useState('');
    const [paginatedVideos, setPaginatedVideos] = useState(default_arr)


    const loadAllDetails = (getVideos: any, getDetails: any, id: string) => {
        Promise.all([getDetails(id), getVideos(id)]).then((results: Array<any>) => {
            setLoader(false);
            setDetails(results[0]);
            setVideos(results[1]);
            
        })
    }

    const paginateVideos = (page: number) => {
        if(page > 0 && videos.results)
            setPaginatedVideos(
                videos.results.slice((page-1)*itemsPerPage, (page-1)*itemsPerPage + itemsPerPage)
            );
    }

    useEffect(() => {
        paginateVideos(1);
    }, [videos])
        

    useEffect(() => {
        const data = getMediaAndIdInfoFromUrl(location.pathname);
        if(!data) navigate('/error-404');
        else if(location && location.state && location.state?.details && location.state.videos){
            setDetails(location.state.details);
            setVideos(location.state.videos);
            
        }
        else{
            setMediaType(data.mediaType);
            if(data.mediaType === 'movie') loadAllDetails(getVideosByMovieId, getMovieDetailsById, data.id);
            else if(data.mediaType === 'tv') loadAllDetails(getVideosByTvId, getTVDetailsById, data.id);
            else navigate('/error-404')
        }
    }, [])

    return (
        <div className="min-bg-h w-full p-4">
            {
                loader 
                ?
                <div className="loader">
                    <InfinitySpin
                        width="200"
                        color="#ed7b7b" /> 
                </div> 
                :
                <>
                    {
                        paginatedVideos?.length ?
                        <div className="flex flex-col items-center">
                            <div className="max-w-video">
                                <MoreDetailsHead details={details} mediaType={mediaType} text='Video Gallery' />
                            </div>

                            <div className="video-gallery mb-5">
                                {
                                    paginatedVideos.map((video: any) => <VideoPlayer key={video.key} video={video}></VideoPlayer>)
                                }
                            </div>
                            <Pagination totalPages={Math.ceil(videos.results.length / itemsPerPage)} paginate={paginateVideos}></Pagination>
                        </div> : <></>
                    }
                </>
            }
        </div>
        
    );
}