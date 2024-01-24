import ReactPlayer from "react-player";
import { getVideoUrl } from "../../services/ServicesExport";

export function VideoPlayer({ video }: any){
    return (
        <div className="video pb-2">
            <ReactPlayer width={'auto'} height={'180px'} controls={true} url={getVideoUrl(video)} />

            <div className="text-xs text-gray-200 px-3 py-1 cursor-pointer hover:underline">
                <a target="_blank" className="text-gray-100" href={getVideoUrl(video)} >
                    { video.name }
                </a>
            </div>
        </div>
    );
}