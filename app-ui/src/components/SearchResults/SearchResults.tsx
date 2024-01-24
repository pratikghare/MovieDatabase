import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getMoviesBySearch, getPeopleBySearch, getRelevanceSearchBarResults, getTVsBySearch, multiSearchQuery } from "../../services/ServicesExport";
import SearchResultContainer from "./SearchResultContainer";
import { InfinitySpin } from "react-loader-spinner";

const default_arr: Array<any> = [];
// const default_obj: any = { page: 1, results: [], total_pages: 1, total_results: 0 };

const default_obj: any = {};
export default function SearchResults(){
    const params = useParams();
    const location = useLocation();
    const query: string = params?.query ? params.query : '';
    
    const [results, setResults] = useState(default_arr);
    const [allResults, setAllResults] = useState(default_arr);
    const [relevanceList, setRelevanceList] = useState(default_arr);
    const [loader, setLoader] = useState(false);
    const [prevLocation, setPrevLocation] = useState(default_obj);

    const loadData = () => {
        setLoader(true);

        Promise.all([getPeopleBySearch(query), getMoviesBySearch(query), getTVsBySearch(query)]).then((results: Array<any>) => {
            setResults(results);
            setAllResults(results);
            setLoader(false);
        })
    }

    const updateData = (mediaType: string, page: number, setDataCallback: any) => {
        if(mediaType === 'person' && query.length){
            getPeopleBySearch(query, page).then((result: any) => {
                result.results = [...results[0].results, ...result.results];
                setResults((prev: Array<any>) => [result, prev[1], prev[2]]);
                setDataCallback(result.results);
            })
        }
        if(mediaType === 'movie' && query.length){
            getMoviesBySearch(query, page).then((result: any) => {
                result.results = [...results[1].results, ...result.results];
                setResults((prev: Array<any>) => [prev[0], result, prev[2]]);
                setDataCallback(result.results);
                console.log('here');
                
            })
        }
        if(mediaType === 'tv' && query.length){
            getTVsBySearch(query, page).then((result: any) => {
                result.results = [...results[3].results, ...result.results];
                setResults((prev: Array<any>) => [prev[0], prev[1], result]);
                setDataCallback(result.results);
            })
        }
    }

    const showSpecificData = (mediaType: string) => {
        if(mediaType === 'person') setResults([results[0], null, null]);
        if(mediaType === 'movie') setResults([null, results[1], null]);
        if(mediaType === 'tv') setResults([null, null, results[2]]);
    }

    const showAllData = () => {
        setResults(allResults);
    }
    
    useEffect(() => {
        if(prevLocation && prevLocation?.pathname && location.pathname !== prevLocation.pathname){
            setPrevLocation(location);
            window.location.reload();
        }
    }, [location])

    useEffect(() => {
        setPrevLocation(location);
        setLoader(true);
        document.title = 'Find - Movie Database';
        if(location.state && location.state.hasOwnProperty('relevanceList')){
            setRelevanceList(location.state.relevanceList);
            loadData();
        }
        else{
            multiSearchQuery(query).then((result: any) => {
                setRelevanceList(getRelevanceSearchBarResults(result.results));
                loadData();
            })
        }
    }, [])

    return (
        <div className="p-8 min-bg-h recents-active">
            <h1 className="text-white text-3xl">Search "{query}"</h1>
            <br />
            <br />
            {
                loader ? 
                <InfinitySpin
                    width="200"
                    color="#ed7b7b"
                /> :
                relevanceList.map((media: string, index: number) => (
                    (media === 'person' && results[0] && results[0]?.results?.length) ||
                    (media === 'movie' && results[1] && results[1]?.results?.length) ||
                    (media === 'tv' && results[2] && results[2]?.results?.length) ?
                    <SearchResultContainer 
                        key={media+index}
                        heading={media ==='person' ? 'People' : (media === 'movie' ? 'Movie Titles' : 'TV Titles')} 
                        data={media ==='person' ? results[0] : (media === 'movie' ? results[1] : results[2])} 
                        mediaType={media} updateDataCallback={updateData} showSpecificDataCallback={showSpecificData} 
                        showAllDataCallback={showAllData}
                    /> :
                    ''
                ))
            }
        </div>
    );
}
