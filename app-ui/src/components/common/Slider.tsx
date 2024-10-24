import { useSelector } from "react-redux";
import { IMAGE_NOT_FOUND, POSTER_RATIO } from "../../environment/environment";
import { Credit, MediaDetails } from "../../Model/Model";
import { calculateHeightAndWidth, callFunction, getBaseClassNames } from "../../services/Utilities";
import { MediaCard } from "./MediaCard";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";

export interface SliderProps {
    className?: string;

    title?: string;
    list: Array<Credit>;
    
    height?: number;
    width?: number;

    showAll?: boolean;
    showAllTitle?: string;
    showAllUrl?: string;

    // Media Card
    onBaseClick?: Function;
    onButtonClick?: Function;
    onItemClick?: Function;
    showSaveButton?: boolean;
}

export default function Slider(props: SliderProps) {
    const details = useSelector((state: RootState) => state.details);
    const navigate = useNavigate();

    const classNames: string = getBaseClassNames(props.className);
    const title: string | null = props.title ? props.title : null;

    const showAllItem: Credit = getCredit(details, props.showAllTitle ? props.showAllTitle : null);
    const [height, width] = calculateHeightAndWidth(POSTER_RATIO, props.height ? props.height : 200, props.width);

    return (
        <div className={`bg-[#18181b] rounded-lg p-4 grid gap-3 ${classNames}`}>
            <div className="flex justify-between">
                { title && <h2>{title}</h2> }
                { props.showAll && props.showAllTitle ? <Button onClick={() => { props.showAllUrl ? navigate(props.showAllUrl) : "" }} variant="flat" className="text-xs h-auto border border-white/10"> { props.showAllTitle } </Button> : <></> }
            </div>
            
            <div className="flex gap-4 overflow-x-auto scroll-smooth hide-scrollbar" >
                {props.list.slice(0, 20).map((credit: Credit, index: number) => (
                    <MediaCard 
                        showSaveButton={props.showSaveButton}
                        onBaseClick={() => { callFunction(credit, props.onBaseClick) }} 
                        onButtonClick={() => { callFunction(credit, props.onButtonClick) }} 
                        onItemClick={() => { callFunction(credit, props.onItemClick) }} 
                        key={"credit-"+credit.id+"-"+index} config={{ height, width }} data={credit} 
                    />
                ))}
                {
                    props.showAll && props.list.length > 20 ?
                    <MediaCard 
                        classNames={{ footer: "flex text-center" }}
                        showSaveButton={props.showSaveButton}
                        onBaseClick={() => { props.showAllUrl ? navigate(props.showAllUrl) : "" }} 
                        onButtonClick={() => { props.showAllUrl ? navigate(props.showAllUrl) : "" }} 
                        onItemClick={() => { props.showAllUrl ? navigate(props.showAllUrl) : "" }} 
                        config={{ height, width }} data={showAllItem} 
                    /> : <></>
                }
            </div>
        </div>

    );
}

function getCredit(details: MediaDetails, label: string | null): Credit {
    const credit: Credit = {
        id: details.id,
        poster: IMAGE_NOT_FOUND,
        order: 0,
        adult: false,
        character: "",
        creditId: "",
        popularity: 0,
        gender: null,
        knownFor: null,
        name: "See " + label,
        job: null,
        originalName: null,
        castId: null,
        backdrop: null,
        genres: [],
        language: null,
        overview: null,
        year: null,
        rating: null,
        votes: null,
        mediaType: details.mediaType
    }
    return credit;
}