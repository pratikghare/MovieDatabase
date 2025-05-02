import { ScrollShadow } from '@heroui/react';
import useWindowDimensions from '../hooks/useWindowDimensions';
import { useEffect, useState } from 'react';

const MAX_WIDTH: number = 1024;
export default function HorizontalScroll(props: { children?: React.ReactNode, className?: string, offset?: number, width?: number }) {
    const dimensions = useWindowDimensions();
    const [width, setWidth] = useState<number>();
    const [maxWidth, setMaxWidth] = useState<number>(MAX_WIDTH);

    useEffect(() => {
        const width: number = props.width ? props.width : (dimensions.width > MAX_WIDTH ? MAX_WIDTH : dimensions.width);
        setMaxWidth(width - (props.offset ? props.offset : 0));

        if (dimensions.width <= 500 && props.offset) setWidth(width - (props.offset ? props.offset : 0));
        else setWidth(undefined);
    }, [props.offset, dimensions])
    
    return (
        <ScrollShadow orientation='horizontal' hideScrollBar 
            className={'h-scroll flex overflow-x-auto ' + (props.className && props.className)} style={{ width, maxWidth }}
        >
            { props?.children }
        </ScrollShadow>
    );

}