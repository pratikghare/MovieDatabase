import { Link } from "react-router-dom";
import { POSTER_RATIO } from "../../environment/environment";

export interface ImageProps {
    id?: number;
    url: string;
    height?: number;
    width?: number;
    maxHeight?: number;
    maxWidth?: number;
    minHeight?: number;
    minWidth?: number;
    className?: string;
    unit?: string;
    onClick?: Function;
    onMouseOver?: Function;
    onMouseOut?: Function;
    // height would be multiplied by factor to get width, should be in fraction (i.e. less than 1 if height is greater)
    aspectRatio?: number;

    // To Navigate to external site
    href?: string;
    navigateTo?: string;
}

export default function Image({ id, url, height, width, maxHeight, maxWidth, onMouseOver, onMouseOut, minHeight, minWidth, className, unit, aspectRatio, onClick, href, navigateTo }: ImageProps) {
    const ratio = aspectRatio ? aspectRatio : POSTER_RATIO;
    
    const background = `url('${url}') center/cover no-repeat`;
    let [calHeight, calWidth] = calculateHeightAndWidth(ratio, height, width, unit ? unit : "px");
    let [calMinHeight, calMinWidth] = getMinHeightAndwidth(minHeight, minWidth, unit ? unit : "px");
    let [calMaxHeight, calMaxWidth] = getMinHeightAndwidth(maxHeight, maxWidth, unit ? unit : "px");


    const styles = {
        background, width: calWidth, height: calHeight, minHeight: calMinHeight, minWidth: calMinWidth,
        maxHeight: calMaxHeight, maxWidth: calMaxWidth
    }

    const div = <div onMouseOut={() => { onMouseOut ? onMouseOut(id) : "" }} onMouseOver={(event) => { onMouseOver ? onMouseOver(id) : event}} onClick={() => { if(onClick) onClick() }} className={"image-transition "+className} style={styles}></div>;
    const externalLink = <a target="_blank" href={href} onMouseOut={() => { onMouseOut ? onMouseOut(id) : "" }} onMouseOver={(event) => { onMouseOver ? onMouseOver(id) : event}} onClick={() => { if(onClick) onClick() }} className={"image-transition "+className} style={styles}></a>;
    const internalLink = <Link to={navigateTo ? navigateTo : "/"} onMouseOut={() => { onMouseOut ? onMouseOut(id) : "" }} onMouseOver={(event) => { onMouseOver ? onMouseOver(id) : event}} onClick={() => { if(onClick) onClick() }} className={"image-transition "+className} style={styles}></Link>;

    return (
       navigateTo ? internalLink : href ? externalLink : div
    );
}

const calculateHeightAndWidth = (ratio: number, height?: number, width?: number, unit?: string) => {
    if(height === -1 || width === -1) return ["auto", "auto"];
    if(!unit) unit = "";
    if(height && width) return [ height + unit, width + unit ];
    else if(height) return [ height + unit, (height * ratio) + unit ];
    else if(width) return [ (width / ratio) + unit, width + unit ]
    return [ "auto", "auto" ];
}

const getMinHeightAndwidth = (height?: number, width?: number, unit?: string) => {
    if(height === -1 || width === -1) return ["auto", "auto"];
    if(!unit) unit = "";
    if(height && width) return [ height + unit, width + unit ];
    else if(height) return [ height + unit,  "auto" ];
    else if(width) return [ "auto", width + unit ]
    return [ "auto", "auto" ];
}