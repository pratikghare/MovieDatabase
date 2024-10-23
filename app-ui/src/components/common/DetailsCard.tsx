import { useSelector } from "react-redux";
import { MediaDetails } from "../../Model/Model";
import { getBackground, getBaseClassNames } from "../../services/Utilities";
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

    const background: string = getBackground(details.backdrop)
    
    return (
        <section className={"rounded-2xl "} style={{ background }}>
            <div className={"p-5 w-full h-full rounded-2xl flex flex-col " + classNames}>
                { ...React.Children.toArray(props.children) }
            </div>
        </section>
    );
}
