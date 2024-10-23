import React from "react";
import { POSTER_RATIO } from "../../environment/environment";
import { calculateHeightAndWidth } from "../../services/Utilities";
import { useNavigate } from "react-router-dom";

export interface ImageProps {
    url: string;
    to?:string;

    height?: number;
    width?: number;
    unit?: string;  // By Default will be in pixels
    aspectRatio?: number;

    className?: string
    children?: any;
}


export default function Image(props: ImageProps) {
    const navigate = useNavigate();

    const background: string = `url('${props.url}') center/cover`;

    const aspectRatio: number = props.aspectRatio ? props.aspectRatio : POSTER_RATIO;
    const [cal_height, cal_width] = calculateHeightAndWidth(aspectRatio, props.height, props.width);
    const unit: string = props.unit ? props.unit : "px";
    const height = cal_height < 0 || cal_width < 0 ? "auto" : cal_height + unit;
    const width = cal_height < 0 || cal_width < 0 ? "auto" : cal_width + unit;

    const className: string = props.className ? props.className : "";
    const cursor: string = props.to ? "cursor-pointer" : "cursor-default";

    return (
        <div onClick={() => { props.to ? navigate(props.to) : null }} className={`h-full w-full rounded-lg ${cursor} `+className} 
        style={{ background, height, width, minWidth: width }}>
            { ...React.Children.toArray(props.children) }
        </div>
    );
}