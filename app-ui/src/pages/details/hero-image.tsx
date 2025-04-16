import { ScrollShadow } from "@heroui/react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { configSelector } from "../../store/selectors";
import { getBackdrops } from "../../utils/utils";
import { ImageData } from '../../context/media-context';

export default function HeroImage({ backdrop, images }: { backdrop?: string, images?: ImageData }) {
    const config = useSelector(configSelector);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const [classes, setClasses] = useState<{ base: string, wrapper: string, content: string }>({ base: '', wrapper: '', content: '' });
    const [backdrops, setBackdrops] = useState<Array<string>>([]);
    const [timer, setTimer] = useState<number>(0);

    const [background, setBackground] = useState<string>('');

    const [current, setCurrent] = useState<string | undefined>(backdrop);

    const setComputedBackground = (stateFunction: Function, url?: string) => {
        stateFunction(
            url ? config.theme.current === 'light' ?
                url.includes('rgb(') ? `${url}` : ` url('${url}')  center / cover no-repeat` :
                url.includes('rgb(') ? `${url}` : ` url('${url}')  center / cover no-repeat` : ''
        );
    }

    useEffect(() => setComputedBackground(setBackground, current), [current, config.theme.current]);

    useEffect(() => setBackdrops(getBackdrops(images, backdrop)), [backdrop, images]);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        setCurrent(timer < backdrops.length ? backdrops[timer] : backdrops[0]);
        if (timer < backdrops.length - 1) {
            const image = new Image();
            image.crossOrigin = 'Anonymous';
            image.src = backdrops[timer + 1];
        }
        if (backdrops.length <= 1) return;

        debounceRef.current = setTimeout(() => {
            (timer >= backdrops.length - 1) ? setTimer(0) : setTimer(timer + 1);
        }, 10000)
    }, [timer, backdrops])

    useEffect(() => {
        let base: string = 'h-[100vh] fixed';
        let wrapper: string = '';
        let content: string = '';
        const isColor: boolean = !current || current?.includes('rgb(');

        if (!isColor) base = 'h-[80svh]';

        setClasses({ base, wrapper, content });
    }, [config.theme.current, current])

    return (
        <ScrollShadow hideScrollBar className={'transition ease-in-out duration-300 scroll -z-10 w-full absolute left-0 top-0 ' + classes.base}>
            <div className='transition ease-in-out duration-300 w-full h-full' style={{ background }}>
                <div
                    className="absolute bottom-0 left-0 w-full h-64 z-10 pointer-events-none bg-gradient-to-t from-background to-transparent"
                />
            </div>
        </ScrollShadow>
    )
}