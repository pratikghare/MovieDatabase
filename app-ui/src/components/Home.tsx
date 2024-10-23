import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { getNowPlaying, getPopularPeople, getTopRatedMovies, getTopRatedTV, getTrendingTV } from "../reducers/homeSlice";
import { Credit, MediaHome, MediaType } from "../Model/Model";
import Slider from "./common/Slider";
import { useNavigate } from "react-router-dom";
import { getDetailsNavigationURL } from "../services/Utilities";

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const list = useSelector((state: RootState) => state.home);
    const [loader, setLoader] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if(!list.length && loader) {
            setLoader(false);
            dispatch(getNowPlaying());
            dispatch(getTopRatedMovies());
            dispatch(getPopularPeople());
            dispatch(getTrendingTV());
            dispatch(getTopRatedTV());
        }
    }, []);

    const addToWatchList = (data: Credit) => {
        console.log("ADD TO WATCH LIST ", data);
    }

    const getDetails = (data: Credit) => {
        navigate(getDetailsNavigationURL(data));
    }
    

    return (
        list.map((media: MediaHome) => (
            <Slider 
                onButtonClick={addToWatchList}
                hideButton={media.type === MediaType.PERSON}
                onFooterClick={getDetails}
                key={"home" + media.title} credits={media.list} title={media.title} baseClass={""}            />
        ))
    );
}