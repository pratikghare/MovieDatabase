import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function PageNotFound(){
    const navigate = useNavigate();

    useEffect(() => {
        document.title = '404 Error - Movie Database';
    }, [])

    return (
        <div className="py-10 pt-28  min-bg-h recents-active">
            <div className="text-center">
                <p className="text-base font-semibold color-app">404</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight color-app sm:text-5xl">
                    Page not found
                </h1>
                <p className="mt-4 text-base leading-7 text-gray-300">
                    Sorry, we couldn&apos;t find the page you&apos;re looking for.
                </p>
                <div className="mt-4 flex items-center justify-center gap-x-3">
                <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-app px-3 py-2 text-sm font-semibold color-app shadow-sm"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeftIcon className="mr-2 h-6 w-6"  />
                    Go back
                </button>
                <button
                    type="button"
                    className="rounded-md bg-app px-3 py-2 text-sm font-semibold text-black border-app shadow-sm"
                    onClick={() => navigate('/contact')}
                >
                    Contact us
                </button>
                </div>
            </div>
        </div>
    );
}