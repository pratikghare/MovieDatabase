import { FilmIcon } from "@heroicons/react/20/solid";


export function HeaderMenu(){
    return (
        <div className="menu">
            <div className="menu-content">
                <div className="movies">
                    <h1 className="flex items-center text-xl">
                        <FilmIcon  
                            className="h-8 w-8 mt-1 color-app mr-4 mb-1"
                            aria-hidden="true" />
                        Movies
                    </h1>
                    <div className="pl-12 mt-1">
                        <p className="hover:underline cursor-pointer">Top Rated Movies</p>
                        <p className="hover:underline cursor-pointer">Top 250</p>
                        <p className="hover:underline cursor-pointer">Popular Movies</p>
                    </div>
                </div>
                <div className="movies">
                    <h1 className="flex items-center text-xl">
                        <FilmIcon  
                            className="h-8 w-8 mt-1 color-app mr-4 mb-1"
                            aria-hidden="true" />
                        Movies
                    </h1>
                    <div className="pl-12 mt-1">
                        <p className="hover:underline cursor-pointer">Top Rated Movies</p>
                        <p className="hover:underline cursor-pointer">Top 250</p>
                        <p className="hover:underline cursor-pointer">Popular Movies</p>
                    </div>
                </div>
                <div className="movies">
                    <h1 className="flex items-center text-xl">
                        <FilmIcon  
                            className="h-8 w-8 mt-1 color-app mr-4 mb-1"
                            aria-hidden="true" />
                        Movies
                    </h1>
                    <div className="pl-12 mt-1">
                        <p className="hover:underline cursor-pointer">Top Rated Movies</p>
                        <p className="hover:underline cursor-pointer">Top 250</p>
                        <p className="hover:underline cursor-pointer">Popular Movies</p>
                    </div>
                </div>
                <div className="movies">
                    <h1 className="flex items-center text-xl">
                        <FilmIcon  
                            className="h-8 w-8 mt-1 color-app mr-4 mb-1"
                            aria-hidden="true" />
                        Movies
                    </h1>
                    <div className="pl-12 mt-1">
                        <p className="hover:underline cursor-pointer">Top Rated Movies</p>
                        <p className="hover:underline cursor-pointer">Top 250</p>
                        <p className="hover:underline cursor-pointer">Popular Movies</p>
                    </div>
                </div>
            </div>
        </div>
    );
}