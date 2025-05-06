import { useEffect } from "react";
import { useAppDispatch } from "../store/selectors";
import { updateComingFrom } from "../store/reducers/config-reducer";
import { PAGES } from "../context/media-context";

export default function Home() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(updateComingFrom(PAGES.HOME));
    }, [])

    return (
        <section>
            <h1>HOME</h1>
        </section>
    );
}