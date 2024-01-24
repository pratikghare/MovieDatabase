import { StarIcon } from "@heroicons/react/20/solid";
import { detailsSubText, getName, getVotes } from "../../services/ServicesExport";
import { Dot } from "lucide-react";

export default function DetailsHead({ details, ratings }: any){
    const subText: Array<string> = detailsSubText(details, ratings);
    return (
        <div className="heading">
            <div>
                <h1 className="text-white text-3xl font-bold">{ getName(details) }</h1>
                <div className="subText flex text-gray-300 text-sm">
                    {
                        subText.map((text: string, index: number) => (
                            <span className="subText-flex" key={text+index}>
                                <p className="mr-1">{ text }</p>
                                <span>
                                    {
                                        index < subText.length - 1 ?
                                        <Dot />
                                        : <></>
                                    }
                                </span>
                            </span>
                        ))
                    }
                </div>
            </div>
            <div className="ratings">
                {
                    ratings || (details && details?.vote_average) ?
                    <span className="text-right">
                        <p className="text-xs text-yellow-500">IMDB RATING</p>
                        <span className="flex items-center justify-end">
                            <StarIcon className="w-6 h-6 text-yellow-500 mr-2"></StarIcon>
                            <span>
                                <p> <span className="text-xl">{ ratings && ratings.imdbRating !== 'N/A' ? ratings.imdbRating : Math.round(details.vote_average*10)/10 }</span> <span className="text-gray-400">/ 10</span></p>
                                {
                                    ratings && ratings.imdbVotes && 
                                    <p className="text-xs imdb-votes text-gray-400 mr-3">{ getVotes(ratings) }</p>
                                }
                            </span>
                        </span>
                    </span> : <></>
                }
            </div>
        </div>
    );
}