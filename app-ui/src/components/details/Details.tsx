import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getDetails, getFullCredits, getOMDetails } from "../../reducers/detailSlice";
import { getNavigatedData, rgbToHex } from "../../services/Utilities";
import { useLoaderData } from "react-router-dom";
import { BaseSearch, MediaType } from "../../Model/Model";
import { InfinitySpin } from "react-loader-spinner";
import { DEFAULT_BG_IMAGE, IMAGE_NOT_FOUND } from "../../environment/environment";

import ColorThief from "colorthief";
import _ from 'lodash';

import Overview from "./Overview";
import Ratings from "./Rating";
import { MediaCard } from "../common/MediaCard";


export default function Details() {
    const loaderData: any = useLoaderData();

    const dispatch = useDispatch<AppDispatch>();
    const details = useSelector((state: RootState) => state.details);
    const [colorsCalled, setColorsCalled] = useState(false);

    const [background, setBackground] = useState("");

    const [loader, setLoader] = useState(false); 
    const [omLoader, setOMLoader] = useState(false); 

    function setRGBColorsFromImageURL(){
        const img = new Image();
        img.width = 200;
        img.height = 300;
        img.crossOrigin = 'Anonymous';
        img.src = `${details.poster}/`;
        img.onload = () => {
            const colorThief = new ColorThief();
            const palette = colorThief.getPalette(img, 10);
            const result = _.uniq(palette);
            // result.forEach(item => console.log(rgbToHex(...item)))
            // console.log(result);
            setColorsCalled(true);

            if(!details.backdrop && result.length) setBackground(rgbToHex(...result[1]));
            else setBackground(details.backdrop ? `url('${details.backdrop}') center/cover` : `url('${DEFAULT_BG_IMAGE}') center/cover`);
            setLoader(false);
        }
    }

    useEffect(() => {
        const params: string = loaderData?.params?.hasOwnProperty("*") ? loaderData?.params['*'] : "";
        const data: BaseSearch | null = getNavigatedData(params);
        setColorsCalled(false);
        // return;
        if(data) {
            // console.log(data);
            setLoader(true);
            setOMLoader(true);
            window.scrollTo({top: 0});
            dispatch(getDetails(data));
        }
        else{
            // navigate to page not found
        }
    }, [loaderData]);

    useEffect(() => {
        // if(details.id) console.log(details);

        if(!details.poster.includes(IMAGE_NOT_FOUND) && !colorsCalled) setRGBColorsFromImageURL();
        else if(details.id) setLoader(false);
        // Load all other details
        if(details.id && loader) {
            const base: BaseSearch = { id: details.id, mediaType: details.mediaType }
            dispatch(getFullCredits(base));
            // dispatch(getImages(data));
        }
        if(details.imdbId !== null && details.mediaType !== MediaType.PERSON && omLoader) {
            dispatch(getOMDetails(details.imdbId));
            setOMLoader(false);
        }
    }, [details.id]);

    const addToWatchList = () => {
        console.log("CALLED WATCHLIST");
    }

    return (
        <div style={{ background }}>
            {
                loader ? <div className="absolute flex justify-center items-center h-1/2 w-full"><InfinitySpin width="200" color="#ed7b7b" /></div> :
                <div className="details-wrapper min-h-[calc(100vh_-_64px)] backdrop-blur-xl p-3 sm:p-6 xl:p-10">
                    <div className="flex flex-wrap gap-5 justify-evenly sm:justify-start">
                        <MediaCard rounded onButtonClick={addToWatchList} showSaveButton={details.mediaType !== MediaType.PERSON} config={{ height: 430 }} url={details.poster} />
                        <Overview className="flex-1" />
                        { 
                            details.mediaType !== MediaType.PERSON && (details.userRating || details.ratings.length > 0) ?
                            <Ratings /> : <></>
                        }
                    </div>
                </div>
            }
        </div>
    );
}
