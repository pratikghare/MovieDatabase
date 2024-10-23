import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { MediaDetails } from "../../Model/Model";
import { Dot } from "../common/Icons";
import { ScrollShadow } from "@nextui-org/react";
import { getBaseClassNames, getSubtext } from "../../services/Utilities";


export interface OverviewPropsClassNames{
    base?: string;
}
export interface OverviewProps {
    className?: string;
    classNames?: OverviewPropsClassNames;
}

export default function Overview(props: OverviewProps) {
    const details: MediaDetails = useSelector((state: RootState) => state.details);

    const classNames: string = getBaseClassNames(props.className, props.classNames?.base);

    const subTextArray = getSubtext(details);
    const background = details.backdrop ? `url('${details.backdrop}')` : "";

    return (
        <div className={"rounded-2xl " + classNames} style={{ background, backgroundPosition: "center top", backgroundSize: "cover" }}>
            <div className="bg-black/40 w-full h-full rounded-2xl flex flex-col">
                <div className="head p-5 flex-1">
                    <h1>{ details.name }</h1>
                    { details.tagline ? <p className="text-xs italic">&ldquo; { details.tagline } &rdquo;</p> : <></> }
                    <div className="flex">
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
                        <ScrollShadow hideScrollBar className={`h-[120px] w-auto cursor-default py-2 mt-2`}>
                            <p className="text-xs xl:text-sm w-0 min-w-full">{ details.overview + details.overview + details.overview }</p>
                        </ScrollShadow> : <></>
                    }
                </div>
            </div>
        </div>
    );
}