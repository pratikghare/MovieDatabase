import { Button, Card, CardFooter, CardHeader, Tooltip } from "@nextui-org/react";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { IMAGE_NOT_FOUND, POSTER_RATIO } from "../../environment/environment";
import { Credit } from "../../Model/Model";
import { calculateHeightAndWidth, callFunction, getBaseClassNames, getImageURL } from "../../services/Utilities";
import Image from "./Image";

export interface MediaCardClassNames {
    wrapper?: string;
    base?: string;
    header?: string;
    image?: string;
    footer?: string;
    tootipContent?: string;
}
export interface MediaCardConfig {
    height?: number;
    width?: number;
    aspectRatio?: number;
}
export interface MediaCardProps {
    config: MediaCardConfig;
    url?: string;
    data?: Credit;

    className?: string;
    classNames?: MediaCardClassNames;

    rounded?: boolean;

    onBaseClick?: Function;
    showSaveButton?: boolean;
    onButtonClick?: Function;
    onItemClick?: Function;
    
}


export function MediaCard(props: MediaCardProps) {
    const ratio = props.config?.aspectRatio ? props.config.aspectRatio : POSTER_RATIO;
    let [height, width] = calculateHeightAndWidth(ratio, props.config?.height, props.config?.width);
    const rounded = props.rounded ? "!rounded-2xl" : "!rounded-lg";

    return (
        <div className={`${rounded}` + getBaseClassNames(props.classNames?.wrapper, props.className)}>
            <Card
                isFooterBlurred
                radius="lg"
                className={`border-none relative ${rounded} ${getBaseClassNames(props?.classNames?.base)}`}
                fullWidth={true}
                style={{ height: height+"px", width: width+"px" }}
                onClick={() => callFunction(props.data, props.onBaseClick)}
                >
                {
                    props.onButtonClick && props.showSaveButton ? 
                    <CardHeader className={`absolute z-10 top-0 left-0 flex-col items-start p-0  !bg-transparent ${getBaseClassNames(props.classNames?.header)}`}>
                        <Tooltip color="default" placement="bottom" content="Add to watchlist">
                            <Button onClick={() => callFunction(props.data, props.onButtonClick)} variant="light" className="p-1 min-w-1 h-auto backdrop-blur-lg bg-black/20">
                                <BookmarkIcon className="h-6 w-6" />
                            </Button>
                        </Tooltip>
                    </CardHeader> : <></>
                }
                <Image className={`${rounded} `+getBaseClassNames(props.classNames?.image)} url={props.url ? props.url : getImageURL(props.data)} height={height} width={width} />
                {
                    !props.data ? <></> :
                    <CardFooter className={`${rounded} grid cursor-pointer text-center hover:underline before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl bottom-1 w-[calc(100%_-_8px)] ${props.data.poster.includes(IMAGE_NOT_FOUND) ? "h-[calc(100%_-_8px)]" : ""} shadow-small ml-1 z-10 ${getBaseClassNames(props.classNames?.footer)}`}>
                        {
                            !props.data.poster.includes(IMAGE_NOT_FOUND) ?
                                <Tooltip
                                    showArrow
                                    placement="bottom"
                                    content={
                                        <div className={`px-1 py-2 ${getBaseClassNames(props.classNames?.tootipContent)}`}>
                                            <p className={`text-xs text-gray-50 font-bold`}>{ props.data.name }</p>
                                            { props.data.character ? <p className={`text-xxs text-gray-200`}>..as { props.data.character }</p> : <></> }
                                            { props.data.rating ? <p className={`text-sm font-bold text-gray-200`}>{ props.data.rating }% <span className="text-xxs font-normal">(score)</span></p> : <></>  }
                                        </div>
                                    }
                                    >
                                    <button onClick={() => callFunction(props.data, props.onItemClick)}>
                                        <p className={`text-xxs text-gray-50 font-bold`}>{ props.data.name }</p>
                                        <p className={`text-xxs text-gray-200`}>{ getSubstring(props.data.character) }</p>
                                    </button>
                                </Tooltip> :
                            <div className="grid" onClick={() => callFunction(props.data, props.onItemClick)}>
                                <p className={`text-xxs text-gray-50 font-bold`}>{ props.data.name }</p>
                                <p className={`text-xxs text-gray-200`}>{ props.data.character }</p>
                            </div>
                        }
                    </CardFooter>
                }
            </Card>
        </div>
    );
}

function getSubstring(item: string | null | undefined = ""): string {
    return item ? item.length > 13 ? item.substring(0, 11)+"..." : item : "";
}