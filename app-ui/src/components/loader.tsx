import { ReactNode, useEffect, useState } from "react";
import "../styles/loader.scss";
import { Spinner } from "@heroui/react";
interface LoaderProps {
    backgroundColor?: string;
    hideMessage?: boolean;
}

export default function Loader(props: LoaderProps) {
    const [timer, setTimer] = useState<number>(0);
    const [message, setMessage] = useState<ReactNode>();
    const DEFAULT_TIMEOUT = 70;

    useEffect(() => {
        if (timer > 5) setMessage(<span>It might take a minute to start the server, <br /> please be patient</span>);
        if (timer > 30) setMessage(<>Almost there</>);
        if (timer > 45) setMessage(<>Redirecting</>);
        if (timer > DEFAULT_TIMEOUT) setMessage(<>We're currently experiencing some issues. Please check back later. Thank you for your patience!</>)
        if(timer <= DEFAULT_TIMEOUT) setTimeout(() => setTimer(timer + 1), 100);
    }, [timer])

    return (
        <div className={"w-full h-lvh relative overflow-hidden transition-ease p-2"}>
            <div className='flex flex-col items-center justify-center w-full h-full'>
                <div className={"body ml-[-150px] absolute -mt-20 !text-default"}>
                    <span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                    <div className='base'>
                        <span></span>
                        <div className='face'></div>
                    </div>
                </div>
                {
                    (!props.hideMessage || timer > DEFAULT_TIMEOUT) && message &&
                    <div className="mt-10 font-semibold text-center relative message">
                        {message}
                        {timer <= 70 && <Spinner className="absolute bottom-0 ml-1" color="current" variant="dots" size="sm" />}
                    </div>
                }
            </div>
            <div className='longfazers absolute top-0'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}