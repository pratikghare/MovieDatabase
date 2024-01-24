import { ChevronRightIcon, ChevronDoubleDownIcon, ChevronDownIcon, ChevronDoubleUpIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { SearchResultsItem } from "./SearchResultsItem";

export default function SearchResultContainer({ data, showSpecificDataCallback, updateDataCallback, mediaType, heading, showAllDataCallback, showFullData }: any){
    const [results, setResults] = useState(data.results);
    const [filteredResults, setFilteredResults] = useState(showFullData ? results : results.slice(0, 5));
    const [exactMatch, setExactMatch] = useState(false);
    const [showMore, setShowMore] = useState(filteredResults.length < results.length);

    const loadData = () => {
        if(!exactMatch){
            setFilteredResults(results);
            setShowMore(false);
        }
        else if(data.page < data.total_pages) updateDataCallback(mediaType, data.page+1, setData);
    }

    const setData = (list: Array<any>) => {
        setResults(list);
        setFilteredResults(list);
    }

    useEffect(() => {
        setShowMore(
            (exactMatch && (
                filteredResults.length < results.length ||
                data.page < data.total_pages
            )) || (!exactMatch && filteredResults.length < results.length)
        );
    }, [filteredResults]);

    const showSpecificData = () => {
        if(!exactMatch){
            if(showMore) loadData();
            setExactMatch(true);
            setShowMore(true);
            showSpecificDataCallback(mediaType);
        }
        else{
            showAllDataCallback();
            setExactMatch(false);
            setShowMore(false);
        }
    }


    return filteredResults.length ? (
        <div className="search-results-main">
            <div className="w-full flex justify-between items-center">
                    {
                        heading && heading.length ? 
                        <h1 className="text-white text-xl flex border-l-4 pl-3 border-app">
                            { heading }
                            <ChevronRightIcon className="h-8 w-8 text-app" style={{ marginTop: '-1px' }} />
                        </h1> : <></>
                    }
                    {
                        showSpecificDataCallback &&
                        <sub className="flex text-gray-300 cursor-pointer hover:underline text-app"
                            onClick={showSpecificData}
                        >
                            { 
                            exactMatch ? 
                                <>All Results <ChevronDoubleUpIcon className="h-4 w-4" style={{ marginTop: '-8px' }} /> </> : 
                                <>Exact Matches <ChevronDoubleDownIcon className="h-4 w-4" style={{ marginTop: '-8px' }} /> </>
                            } 
                            
                        </sub>
                    }
                </div>
                <div className="search-results-container px-3 py-2 rounded-sm">
                    {
                        filteredResults.map((item: any, index: number) => <SearchResultsItem key={'search-item-'+index} mediaType={mediaType} item={item} />)
                    }

                    {
                        (showMore || exactMatch)  && heading?.length &&
                        <div className="mt-1 flex justify-between items-center">
                            <button className={ (data.page >= data.total_pages) && exactMatch ? "invisible" : "text-gray-300 flex items-center py-1 px-3 show-more-btn rounded-md text-xs" }
                                onClick={loadData}
                            >
                                Show More 
                                <ChevronDownIcon style={{ marginTop: '1px' }} className="h-5 w-5 ml-1" />
                            </button>
                            {
                                exactMatch ? 
                                <span className="text-xs text-app cursor-default">
                                    Pages 1{ data.page > 1 ? '-'+data.page : '' } of { data.total_pages }
                                </span>
                                : ''
                            }
                        </div>
                    }
                </div>
        </div>
    ): <></>;
}
