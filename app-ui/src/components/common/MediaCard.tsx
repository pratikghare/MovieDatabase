import { Button, Card, CardFooter, CardHeader, Tooltip } from "@nextui-org/react";
import Image from "./Image";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { APP_IMAGE_PATH, IMAGE_NOT_FOUND, POSTER_RATIO } from "../../environment/environment";
import { Credit } from "../../Model/Model";
import { calculateHeightAndWidth } from "../../services/Utilities";

export interface MediaCardClassNames {
    base?: string;
    header?: string;
    save?: string;
    image?: string;
    footer?: string;
    footerMain?: string;
    footerSub?: string;
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

    classNames?: any;
    hideFooter?: boolean;
    hideButton?: boolean;
    showFullName?: boolean;
    onBaseClick?: Function;
    onButtonClick?: Function;
    onFooterClick?: Function;
}


export function MediaCard({ config, data, url, classNames, hideFooter, onButtonClick, onBaseClick, showFullName, onFooterClick, hideButton }: MediaCardProps) {
    const ratio = config?.aspectRatio ? config.aspectRatio : POSTER_RATIO;
    let [height, width] = calculateHeightAndWidth(ratio, config?.height, config?.width);

    const character: string | null = data?.character ? (
        data.character.length > 10 && data.character.length <= 13 ? 
            data.character.substring(0, 8) + "..." : 
                data.character.length > 13 ? data.character.substring(0, 10)+"..." : data.character
    ) : null;
    const name: string | null = data?.name ? (
        data.name.length > 10 && data.name.length <= 13 ? 
            data.name.substring(0, 8) + "..." : 
                data.name.length > 13 ? data.name.substring(0, 10)+"..." : data.name
    ) : null;

    return (
        <div className="rounded-lg">
            <Card
                isFooterBlurred
                radius="lg"
                className={`border-none relative ${classNames?.base}`}
                fullWidth={true}
                style={{ height: height+"px", width: width+"px" }}
                onClick={() => { onBaseClick ? onBaseClick() : "" }}
                >
                {
                    data && onButtonClick && !hideButton ? 
                    <CardHeader className={`absolute z-10 top-0 left-0 flex-col items-start p-0  !bg-transparent ${classNames?.header}`}>
                        <Tooltip color="default" placement="bottom" content="Add to watchlist">
                            <Button onClick={() => { onButtonClick(data) }} variant="flat" className="p-0 min-w-1 h-auto">
                                <BookmarkIcon className="h-6 w-6" />
                            </Button>
                        </Tooltip>
                    </CardHeader> : <></>
                }
                <Image className={`${classNames?.image}`} url={data?.poster ? data.poster : url ? url : APP_IMAGE_PATH+IMAGE_NOT_FOUND} height={height} width={width} />
                {
                    hideFooter || !data ? <></> :
                    <CardFooter className={`grid cursor-pointer text-center hover:underline before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] ${data.poster.includes(IMAGE_NOT_FOUND) ? "h-[calc(100%_-_8px)]" : ""} shadow-small ml-1 z-10 ${classNames?.footer}`}
                        onClick={() => { onFooterClick ? onFooterClick(data) : "" }}
                    >
                        {
                            !data.poster.includes(IMAGE_NOT_FOUND) ?
                            <Tooltip
                            showArrow
                                placement="bottom"
                                content={
                                    <div className="px-1 py-2">
                                        <p className={`text-xs text-gray-50 font-bold`}>{ data.name }</p>
                                        <p className={`text-xxs text-gray-200`}>{ data.character }</p>
                                    </div>
                                }
                                >
                                <button>
                                    <p className={`text-xs text-gray-50 font-bold ${classNames?.footerMain}`}>{ showFullName ? data.name : name }</p>
                                    <p className={`text-xxs text-gray-200 ${classNames?.footerSub}`}>{ character }</p>
                                </button>
                            </Tooltip> :
                            <div className="grid ">
                                <p className={`text-xs text-gray-50 font-bold ${classNames?.footerMain}`}>{ data.name }</p>
                                <p className={`text-xxs text-gray-200 ${classNames?.footerSub}`}>{ data.character }</p>
                            </div>
                        }
                    </CardFooter>
                }
            </Card>
        </div>
    );
}