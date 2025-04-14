import { useEffect, useRef, useState } from 'react';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import { ScrollShadow } from '@heroui/react';
const DEFAULT_MAX_W = 1024;

export default function RenderWithScrollShadow(props: { className?: string, children: any, offset?: number, width?: number }) {
    const dimensions = useWindowDimensions();
    const [maxWidth, setMaxWidth] = useState<number>(DEFAULT_MAX_W);
    const [width, setWidth] = useState<number>();
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            console.log("dimensions changed", dimensions)
            const width: number = props.width ? props.width : (dimensions.width > DEFAULT_MAX_W ? DEFAULT_MAX_W : dimensions.width);
            setMaxWidth(width - (props.offset ? props.offset : 0));

            if (dimensions.width <= 500 && props.offset) setWidth(width - (props.offset ? props.offset : 0));
            else setWidth(undefined);
        }, 100);

    }, [props.offset, dimensions]);

    useEffect(() => {
        console.log('width: ', width, 'maxWidth', maxWidth);
    }, [width, maxWidth])

    return (
        <ScrollShadow orientation='horizontal' hideScrollBar className={'scroll ' + (props.className ? props.className : '')} style={{ maxWidth, width }}>
            {props.children}
        </ScrollShadow>
    );
}