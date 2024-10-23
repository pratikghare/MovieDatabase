import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Tooltip } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MediaDetails } from "../Model/Model";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getSearchResults } from "../reducers/searchSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useWindowDimensions from "../hooks/useWindowDimensions";
import AppAutoComplete from "./common/AppAutoComplete";
import { getDetailsNavigationURL } from "../services/Utilities";
import Image from "./common/Image";

export default function Header() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const searchResults = useSelector((state: RootState) => state.search);

    const [query, setQuery] = useState("");

    const dimensions = useWindowDimensions();
    const [toggleSearch, setToggleSearch] = useState(false);

    const onInputChange = (event: any) => setQuery(event.target.value);

    useEffect(() => {   // Debouncing query
        const getData = setTimeout(() => {
            dispatch(getSearchResults(query));
        }, 1000); // 2 seconds
        
        return () => clearTimeout(getData);
    }, [query]);

    const onSelectionChange = (id: number) => {
        console.log(searchResults, id)
        const data: MediaDetails | undefined = searchResults.list.find((item: MediaDetails) => item.id == id);
        if(data) navigate(getDetailsNavigationURL(data));
        else console.log("--- ERROR -- NAVIGATING", data);
    }

    const onFocusChange = (change: boolean) => setToggleSearch(change);

    const classNames = { wrapper: "gap-x-8 py-5 bg-transparent", brand: "flex-grow-0", 
        content: `[&:nth-child(3)]:flex-grow-0 ${(!toggleSearch && dimensions.width <= 640)? "[&:nth-child(2)]:flex [&:nth-child(2)]:justify-end" : ""}` };

    useEffect(() => {
    }, [searchResults])

    return (
        <Navbar shouldHideOnScroll classNames={classNames}>
            {
                (toggleSearch && dimensions.width <= 640) ? <></> :
                <NavbarBrand>
                    <Image to="/" url={"/logo.png"} width={65} height={50} unit="px" />
                </NavbarBrand>
            }
            <NavbarContent>
                {
                    (toggleSearch || dimensions.width > 640) ? 
                    <AppAutoComplete autoFocus={toggleSearch} onFocusChange={onFocusChange} onInputChange={onInputChange} onSelectionChange={onSelectionChange} imageWidth={50} results={searchResults?.list} />
                    :
                    <Tooltip showArrow key="bottom" placement="bottom" content="Search" color="default">
                        <button onClick={() => { setToggleSearch(!toggleSearch) }}> <MagnifyingGlassIcon className="h-6 w-6" /> </button>
                    </Tooltip>
                }
            </NavbarContent>
            {
                (toggleSearch && dimensions.width <= 640) ? <></> :
                <NavbarContent>
                    <NavbarItem>
                        <Button as={Link} color="primary" to={"/"} variant="flat"> Login </Button>
                    </NavbarItem>
                </NavbarContent>
            }
        </Navbar>
    );
}