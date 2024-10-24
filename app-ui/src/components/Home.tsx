import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { getNowPlaying, getPopularPeople, getTopRatedMovies, getTopRatedTV, getTrendingTV } from "../reducers/homeSlice";
import { Credit, MediaHome, MediaType } from "../Model/Model";
import { useNavigate } from "react-router-dom";
import { getDetailsNavigationURL } from "../services/Utilities";
import Slider from "./common/Slider";
import { WINDOW_TITLE } from "../environment/environment";

export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const list = useSelector((state: RootState) => state.home);
    const [loader, setLoader] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = WINDOW_TITLE + " | Home";
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
        list.map((media: MediaHome, index: number) => (
            <Slider showSaveButton={media.type !== MediaType.PERSON} onButtonClick={addToWatchList} onItemClick={getDetails} key={media.title + index} className="m-4" title={media.title} list={media.list} />
        ))
    );
}