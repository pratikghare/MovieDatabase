import { getOfficialVideo, getPhotoUrl, getPhotosList, getVideoUrl } from "../../services/ServicesExport";
import ReactPlayer from "react-player";
import { ListVideo } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DetailsHero({ details, photos, videos, mediaType }: any){
    const video: any = videos ? getOfficialVideo(videos.results): null;
    const photosList = getPhotosList(photos);
    const navigate = useNavigate();

    const navigateTo = (item: string) => {
        navigate(`/${mediaType}/${item}/${details.id}`, { state: { details, photos } });
    }
    
    return(
        <div className="hero-section mt-2">
            <div className="poster" style={{ background: `url('${getPhotoUrl(details, false)}') center/cover` }}></div>
            {
                video ?
                <div className="video-player">
                    <ReactPlayer height={'300px'} width={'auto'} muted playing controls={true} url={getVideoUrl(video)} />
                </div>
                : <></>
            }
            <div className="btn-container text-gray-50">
                {
                    videos && videos?.results?.length ?
                    <button onClick={() => navigateTo('videos')} className="bg-gray-800 bg-opacity-50">
                        <ListVideo className="mr-2" />
                        { videos.results.length } Videos
                    </button>
                    : <></>
                }
                {
                    photosList && photosList?.length ?
                    <button onClick={() => navigateTo('photos')} className="bg-gray-800 bg-opacity-50">
                        <ListVideo className="mr-2" />
                        { photosList.length } Photos
                    </button>
                    : <></>
                }
            </div>
            {
                video ?
                <div className="video-player-down">
                    <ReactPlayer height={'300px'} width={'auto'} muted playing controls={true} url={getVideoUrl(video)} />
                </div>
                : <></>
            }
        </div>
    );
}