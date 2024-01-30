import { HeaderMenu } from "./HeaderMenu";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { BookmarkSquareIcon } from '@heroicons/react/24/outline';
import SearchBar from "./SearchBar/SearchBar";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export function Header(){
    const [isMenuActive, setIsMenuActive] = useState(false);

    return (
        <header className={ isMenuActive ? "app-header dark active" : "app-header dark" }>
            <div className={"header-content"}>
                <NavLink to={"/"} className="app-logo"></NavLink>
                <SearchBar></SearchBar>
                <div className="button-container">
                    <button className="flex justify-center items-center">
                        <BookmarkSquareIcon 
                            className="h-6 w-6 text-gray-400 mr-1"
                            aria-hidden="true"
                        />   
                        WatchList
                    </button>
                    <button>
                        Sign In
                    </button>
                </div>
                <div className="separator"></div>
                <button onClick={() => setIsMenuActive(!isMenuActive)}>
                    {
                        !isMenuActive ?
                        <Bars3Icon 
                            className="h-6 w-6 text-gray-400"
                            aria-hidden="true"  
                        /> :
                        <XMarkIcon 
                            className="h-8 w-8 text-gray-400"
                            aria-hidden="true" 
                        />
                    }
                </button>
            </div>
            <HeaderMenu></HeaderMenu>
        </header>
    );
}