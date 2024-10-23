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
import AppImage from "../common/AppImage";
import Ratings from "./Rating";


export default function Details() {
    const loaderData: any = useLoaderData();

    const dispatch = useDispatch<AppDispatch>();
    const details = useSelector((state: RootState) => state.details);

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
            result.forEach(item => console.log(rgbToHex(...item)))

            if(!details.backdrop && result.length) setBackground(rgbToHex(...result[1]));
            setLoader(false);
        }
    }

    useEffect(() => {
        const params: string = loaderData?.params?.hasOwnProperty("*") ? loaderData?.params['*'] : "";
        const data: BaseSearch | null = getNavigatedData(params);
        // return;
        if(data) {
            setLoader(true);
            setOMLoader(true);
            window.scrollTo({top: 0});
            // console.log(data);
            dispatch(getDetails(data));
            dispatch(getFullCredits(data));
            // dispatch(getImages(data));
        }
        else{
            // navigate to page not found
        }
    }, [loaderData]);

    useEffect(() => {
        // console.log(details);
        setBackground(details.backdrop ? `url('${details.backdrop}') center/cover` : `url('${DEFAULT_BG_IMAGE}') center/cover`)
        if(!details.poster.includes(IMAGE_NOT_FOUND)) setRGBColorsFromImageURL();
        else if(details.id) setLoader(false);
        if(details.imdbId !== null && details.mediaType !== MediaType.PERSON && loader && omLoader) {
            dispatch(getOMDetails(details.imdbId));
            setOMLoader(false);
        }
    }, [details]);

    return (
        <div style={{ background }}>
            {
                loader ? <div className="absolute flex justify-center items-center h-1/2 w-full"><InfinitySpin width="200" color="#ed7b7b" /></div> :
                <div className="details-wrapper min-h-[calc(100vh_-_64px)] backdrop-blur-xl p-3">
                    <div className="flex flex-wrap gap-3 justify-evenly sm:justify-start">
                        <AppImage className="shrink-0 rounded-2xl" width={270} url={details.thumbnail} />
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
