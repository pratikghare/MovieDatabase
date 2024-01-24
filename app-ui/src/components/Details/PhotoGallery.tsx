import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../Pagination";
import { MoreDetailsHead } from "./MoreDetailsHead";
import { getMediaAndIdInfoFromUrl, getMovieDetailsById, getPersonDetailsById, getPhotoUrl, getPhotosByMovieId, getPhotosByPersonId, getPhotosByTvId, getTVDetailsById } from "../../services/ServicesExport";
import { PhotoView } from "./PhotoView";


const default_obj: any = {};
const default_arr: Array<any> = [];
export default function PhotoGallery(){
    const location = useLocation();
    const navigate = useNavigate();
    
    const [loader, setLoader] = useState(true);
    const [photos, setPhotos] = useState(default_arr);
    const [details, setDetails] = useState(default_obj);
    const [mediaType, setMediaType] = useState('');
    const [paginatedPhotos, setPaginatedPhotos] = useState(default_arr);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage: number = 42;
    const [showFullView, setShowFullView] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const paginatePhotos = (page: number) => {
        if(page > 0 && photos){
            setPaginatedPhotos(
                photos.slice((page-1)*itemsPerPage, (page-1)*itemsPerPage + itemsPerPage)
            );
        }
    }

    useEffect(() => {
        paginatePhotos(currentPage);
    }, [photos])

    const getActualIndex = (index: number): number => {
        return (currentPage-1) * itemsPerPage + index;
    }

    const loadAllDetails = (getVideos: any, getDetails: any, id: string) => {
        Promise.all([getDetails(id), getVideos(id)]).then((results: Array<any>) => {
            setLoader(false);
            setDetails(results[0]);
            const photos = results[1];
            let list: Array<any> = []; 
            if(photos?.posters?.length) list = [...photos.posters, ...list]
            if(photos?.backdrops?.length) list = [...photos.backdrops, ...list]
            // if(photos?.logos?.length) list = [...photos.logos, ...list]
            if(photos?.profiles?.length) list = [...photos.profiles, ...list]
            setPhotos(list);
        })
    }

    useEffect(() => {
        const data = getMediaAndIdInfoFromUrl(location.pathname);
        
        if(!data) navigate('/error-404');
        else if(location && location.state && location.state?.details && location.state.videos){
            setDetails(location.state.details);
            setPhotos(location.state.photos);
        }
        else{
            setMediaType(data.mediaType);
            if(data.mediaType === 'person') loadAllDetails(getPhotosByPersonId, getPersonDetailsById, data.id);
            if(data.mediaType === 'movie') loadAllDetails(getPhotosByMovieId, getMovieDetailsById, data.id);
            else if(data.mediaType === 'tv') loadAllDetails(getPhotosByTvId, getTVDetailsById, data.id);
            // else navigate('/error-404')
        }
    }, [])

    const showFullSizePhotos = (paginatedIndex: number) => {
        const actualIndex = getActualIndex(paginatedIndex);
        setSelectedIndex(actualIndex);
        setShowFullView(true);
    }

    useEffect(() => {
        paginatePhotos(currentPage);
    }, [currentPage])

    return (
        <div className={showFullView ? "photo-h w-full p-4" : "min-bg-h w-full p-4"}>
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
                        photos?.length ?
                        <div className="flex flex-col items-center">
                            <div className="max-w-photo mb-5">
                                <MoreDetailsHead details={details} mediaType={mediaType} text='Photo Gallery' />
                            </div>

                            <div className="photo-gallery mb-5">
                                {
                                    paginatedPhotos.map((photo: any, index: number) => (
                                        <div onClick={() => showFullSizePhotos(index)} className="image hover:scale-110" key={'photo'+index} style={{ background: `url(${getPhotoUrl(photo, true)}) center/cover` }} ></div>
                                    ))
                                }
                            </div>
                            <Pagination totalPages={Math.ceil(photos.length / itemsPerPage)} pageChange={currentPage} setCurrentPageCallback={setCurrentPage}></Pagination>
                        </div> : <></>
                    }
                    {
                        showFullView ? 
                        <PhotoView photos={photos} currentIndex={selectedIndex} setCurrentPageCallback={setCurrentPage} itemsPerPage={itemsPerPage} setShowFullViewCallback={setShowFullView} /> 
                        : <></>
                    }
                </>
            }
        </div>
    );
}