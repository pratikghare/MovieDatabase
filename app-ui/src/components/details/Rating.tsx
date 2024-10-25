import { useSelector } from "react-redux";
import { MediaDetails, Rating } from "../../Model/Model";
import { RootState } from "../../store/store";
import Image from "../common/Image";
import { CircularProgress, User } from "@nextui-org/react";

export default function Ratings() {
    const details: MediaDetails = useSelector((state: RootState) => state.details);
    
    return (
        <section className="bg-[#18181b] border border-white/10 rounded-2xl p-4 flex flex-col gap-5 ">
            <h2>Ratings</h2>
            <div className="flex justify-evenly gap-3 sm:mt-5">
                <div>
                    <CircularProgress
                        classNames={{
                            svg: "w-[90px] h-[90px] drop-shadow-md",
                            indicator: "stroke-white",
                            track: "stroke-white/10",
                            value: "text-xl font-semibold text-white",
                        }}
                        value={details.userRating ? details.userRating : 0}
                        strokeWidth={4}
                        aria-label="Rating"
                        showValueLabel={true}
                    />
                </div>
                {
                    details.ratings.map((rating: Rating) => (
                        <div key={rating.source + details.id} className="bg-white/10 h-[90px] w-[90px] flex flex-col justify-center items-center cursor-default rounded-lg">
                            {
                                rating.image ?
                                <Image url={rating?.image ? rating.image : ""} height={45} aspectRatio={1} /> :
                                <h2 className={"w-[45px] h-[45px] rounded-lg flex justify-center items-center " + (parseInt(rating.rating) >= 60 ? "bg-success-500" : parseInt(rating.rating) >= 40 ? "bg-warning-500" : "bg-danger") }>
                                    { rating.rating }
                                </h2>
                            }
                            { rating.image ? <p className="font-bold">{ rating.rating }</p> : <p className="text-xxs mt-1">{ rating.source }</p> }
                            
                        </div>
                    ))
                }
            </div>

            <div className="hidden bg-white/10 flex-1 rounded-lg p-3 min-w-[300px]">
                <div className="opacity-80">
                    <User   
                        className=""
                        name="Jane Doe"
                        description="Production"
                        avatarProps={{
                            src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                        }}
                    />
                    <p className="text-xxs pl-12">A must watch movie..</p>
                </div>
            </div>
        </section>
    );
}