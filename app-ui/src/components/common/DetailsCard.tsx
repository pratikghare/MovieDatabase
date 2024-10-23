import { useSelector } from "react-redux";
import { MediaDetails } from "../../Model/Model";
import { getBaseClassNames } from "../../services/Utilities";
import { RootState } from "../../store/store";
import React from "react";

export interface DetailsCardProps {
    className?: string;
    backgroundPosition?: string;
    backgroundSize?: string;
    children?: any;
}

export default function DetailsCard(props: DetailsCardProps) {
    const details: MediaDetails = useSelector((state: RootState) => state.details);

    const classNames: string = getBaseClassNames(props.className);

    const background: string = details.backdrop ? `url('${details.backdrop}')` : "";
    const backgroundPosition: string = props.backgroundPosition ? props.backgroundPosition : "center top";
    const backgroundSize: string = props.backgroundSize ? props.backgroundSize : "cover";
    
    return (
        <section className={"rounded-2xl "} style={{ background, backgroundPosition, backgroundSize }}>
            <div className={"p-5 w-full h-full rounded-2xl flex flex-col " + classNames}>
                { ...React.Children.toArray(props.children) }
            </div>
        </section>
    );
}