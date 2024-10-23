import { useSelector } from "react-redux";
import { MediaDetails, Rating } from "../../Model/Model";
import { RootState } from "../../store/store";
import DetailsCard from "../common/DetailsCard";
import AppImage from "../common/AppImage";
import { Button, CircularProgress } from "@nextui-org/react";

export default function Ratings() {
    const details: MediaDetails = useSelector((state: RootState) => state.details);
    
    return (
        <DetailsCard backgroundPosition="right" className="backdrop-blur-2xl flex flex-col gap-4 justify-evenly">
            <h1>Reviews</h1>
            {
                details.userRating ? 
                <div className="grid justify-center">
                    <CircularProgress
                        classNames={{
                            svg: "w-24 h-24 drop-shadow-md",
                            indicator: "stroke-white",
                            track: "stroke-white/10",
                            value: "text-xl font-semibold text-white",
                        }}
                        value={70}
                        strokeWidth={4}
                        aria-label="Rating"
                        showValueLabel={true}
                    /> 
                    <p className="text-xs text-center">User Score</p>
                </div>
                : <></>
            }
            <div className="flex flex-wrap gap-8">
                {
                    details.ratings.map((rating: Rating) => (
                        <div key={rating.source + "-rating-" + rating.rating} 
                        className={`w-[98px] h-[95px] bg-white/15 rounded-xl flex flex-col items-center ${rating.image ? "justify-evenly " : "justify-around"}`}>
                            {
                                rating.image ? <AppImage height={40} aspectRatio={1} url={rating.image}></AppImage> :
                                <div className="h-[40px] w-[40px] bg-success-500 flex justify-center items-center text-lg rounded-lg font-bold">{ rating.rating }</div>
                            }
                            <div className="text-center">
                                { rating.image ? <p className="font-bold">{ rating.rating }</p> : <></> }
                                <p className="text-xxs">{ rating.source }</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            { details.awards ? <Button variant="flat" className="border border-warning-100" color="warning">{ details.awards }</Button> : <></> }
        </DetailsCard>
    );
}