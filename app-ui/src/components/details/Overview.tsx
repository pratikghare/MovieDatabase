import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Credit, MediaDetails, MediaType } from "../../Model/Model";
import { Dot } from "../common/Icons";
import { ScrollShadow } from "@nextui-org/react";
import { getBaseClassNames, getDetailsNavigationURL, getSubtext } from "../../services/Utilities";
import { useNavigate } from "react-router-dom";
import Slider from "../common/Slider";


export interface OverviewPropsClassNames{
    base?: string;
}
export interface OverviewProps {
    className?: string;
    classNames?: OverviewPropsClassNames;
}

export default function Overview(props: OverviewProps) {
    const navigate = useNavigate();
    const details: MediaDetails = useSelector((state: RootState) => state.details);

    const classNames: string = getBaseClassNames(props.className, props.classNames?.base);

    const subTextArray = getSubtext(details);
    const background = details.backdrop ? `url('${details.backdrop}') center/cover` : "";

    return (
        <section className={"rounded-2xl min-w-[300px] sm:min-w-[500px] " + classNames} style={{ background }}>
            {/* Using GRID TO THIS TAG WILL TAKE THE HEIGHT AUTOMATICALLY */}
            <div className="bg-black/50  grid w-0 min-w-full rounded-2xl h-full">
                <div className="head p-4 flex flex-col gap-1">
                    <h1>{ details.name }</h1>
                    { details.tagline ? <p className="text-xs italic">&ldquo; { details.tagline } &rdquo;</p> : <></> }
                    <div className="flex flex-wrap">
                        {
                            subTextArray.map((item: string, index) => (
                                <span key={"subtext-"+index} className="flex items-center gap-1 text-xs">
                                    <p>{ item }</p>
                                    { index < subTextArray.length - 1 ? <Dot /> : <></> }
                                </span>
                            ))
                        }
                    </div>
                    {
                        details.overview ?
                        // <ScrollShadow hideScrollBar className={`h-[200px] ${details.credits.cast.length > 0 ? "sm:h-[100px] mt-2" : "sm:h-[250px] mt-4"} cursor-default px-4 py-2`}>
                        <ScrollShadow hideScrollBar className={`max-h-[200px] w-auto cursor-default ${details.credits.cast.length > 0 ? "sm:h-[100px]" : "sm:h-[250px]"}`}>
                            <p className="text-xs w-0 min-w-full">{ details.overview + details.overview + details.overview }</p>
                        </ScrollShadow> : <></>
                    }
                </div>

                {/* Using GRID INSIDE APP SLIDER SOLVED THE ISSUE */}
                {
                    details.credits.cast.length > 0 ?
                    <div className="backdrop-blur-lg rounded-b-2xl max-h-[215px] self-end" >  
                        <Slider className="!bg-transparent rounded-b-2xl rounded-t-none px-4 py-3" 
                            showAll showAllTitle={ details.mediaType === MediaType.PERSON ? "All Filmography" : "All Cast and Crew" }
                            onItemClick={(data: Credit) => { navigate(getDetailsNavigationURL(data)) }}
                            height={150} list={details.credits.cast} 
                            title={ details.mediaType === MediaType.PERSON ? "Known for" : "Top Cast" }
                        />
                    </div> : <></>
                }
            </div>
        </section>
    );
}