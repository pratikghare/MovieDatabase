import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { getPhotoUrl } from "../../services/ServicesExport";
import { useEffect, useState } from "react";

export function PhotoView({ photos, currentIndex, setShowFullViewCallback, itemsPerPage, setCurrentPageCallback }: any){
    const [index, setIndex] = useState(currentIndex);
    const changeImage = (isNext: boolean) => {
        if(isNext){
            if(index+1 < photos.length) setIndex(index+1);
        }
        else if(index > 0) setIndex(index-1);
    }

    useEffect(() => {
        setCurrentPageCallback(Math.ceil((index+1) / itemsPerPage));
    }, [index])

    return (
        <div className="photo-view">
            <div className="close-icon">
                <button onClick={() => { setShowFullViewCallback(false) }}>
                    <XMarkIcon className="h-10 w-10 text-white"></XMarkIcon>
                </button>
            </div>

            <div className="image text-white"
                style={{
                    background: `url('${getPhotoUrl(photos[index])}') center/contain no-repeat`
                }}
            >
                <button className={ index === 0 ? "btn-photo cursor-not-allowed text-gray-600" : "btn-photo" } onClick={() => changeImage(false)} > <ChevronLeftIcon className="w-14 h-14" /> </button>
                <button className={ index === photos.length-1 ? "btn-photo cursor-not-allowed text-gray-600" : "btn-photo" } onClick={() => changeImage(true)} > <ChevronRightIcon className="w-14 h-14" /> </button>
            </div>
        </div>
    );
}