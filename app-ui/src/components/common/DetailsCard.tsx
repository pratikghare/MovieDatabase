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
        <div className="flex-1 rounded-2xl " style={{ background }}>
            <div className={"backdrop-blur-md rounded-2xl flex min-w-[270px] " + classNames}>
                { ...React.Children.toArray(props.children) }
            </div>
        </div>
    );
}
