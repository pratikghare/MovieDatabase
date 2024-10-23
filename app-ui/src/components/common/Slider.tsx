import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Credit } from "../../Model/Model";
import { MediaCard, MediaCardClassNames } from "./MediaCard";

export interface AppSlider {
    credits: Array<Credit>
    height?: number;
    width?: number;
    title?: string;

    showAllButton?: boolean;
    buttonLabel?: String;
    hideButton?: boolean;
    titleButtonClick?: Function;
    btnColor?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    onBaseClick?: Function;
    onButtonClick?: Function;
    onFooterClick?: Function;
    classNames?:MediaCardClassNames;
    baseClass?: string;
    contentClass?: string;
}

export default function Slider({ credits, height, width, title, onBaseClick, titleButtonClick, onButtonClick, onFooterClick, hideButton, btnColor, showAllButton, buttonLabel, classNames, baseClass, contentClass }: AppSlider) {
    return (
        <Card className={`py-1 mx-5 mb-4 sm:px-2 ${baseClass}`}>
            {
                title ? 
                <CardHeader className={`pb-0 pt-2 px-4 flex items-start justify-between w-full`}>
                    <h4 className="font-bold text-large">{ title }</h4>

                    {
                        showAllButton && buttonLabel ? 
                        <Button onClick={() => { titleButtonClick ? titleButtonClick() : "" }} color={btnColor ? btnColor : "default"} variant="flat" className="w-auto h-auto px-2 py-1"><span className="text-xs">{ buttonLabel }</span></Button> : <></>
                    }
                </CardHeader> : <></>
            }

            <CardBody className={`py-2 flex-row gap-4 justify-start overflow-x-auto sm:gap-x-6 ${contentClass}`}>
                {
                    credits.map((credit: Credit) => (
                        <MediaCard hideButton={hideButton}
                            classNames={classNames}
                            onBaseClick={onBaseClick} 
                            onButtonClick={onButtonClick} 
                            onFooterClick={onFooterClick} 
                            key={(title ? title : "") + "-slider-" + credit.id + (credit?.creditId ? credit.creditId : "")} 
                            config={{ height: height ? height : 200, width }} 
                            data={credit} 
                        />
                    ))
                }
            </CardBody>
        </Card>
    );
}