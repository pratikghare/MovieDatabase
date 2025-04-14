import { ScrollShadow } from '@heroui/react';
import { useSelector } from 'react-redux';
import { configSelector, mediaSelector, useAppDispatch } from '../../store/selectors';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { getBackdrops, getMediaDataFromPathName } from '../../utils/utils';
import { detailsQuery } from '../../store/reducers/media-reducer';
import Overview from './overview';
import MediaList from './media-list';
import { ImageData } from '../../context/media-context';

export default function Details() {
    const media = useSelector(mediaSelector);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [backdrop, setBackDrop] = useState<string | undefined>();

    useEffect(() => {
        const { valid, id, media } = getMediaDataFromPathName(location.pathname);
        if (valid) {
            console.log(id, media)
            dispatch(detailsQuery({ id, media }));
        }
    }, [location.pathname]);

    useEffect(() => {
        const horizontalScrollItems = document.getElementsByClassName('scroll-items');
        for (let i = 0; i < horizontalScrollItems.length; i++) {
            horizontalScrollItems[i].scrollLeft = 0;
            horizontalScrollItems[i].scrollTop = 0;
        }
        setBackDrop(media.details?.backdrop);
    }, [media.details])

    return (
        media.details ?
            <section className={'transition-ease z-10 flex flex-col space-y-3 ' + (media.details.backdrop ? 'mt-[10svh] md:mt-[10svh]' : '')}>
                <HeroImage backdrop={backdrop} images={media.details.images} />
                <Overview setBackdrop={setBackDrop} details={media.details} />
                <MediaList list={media.details.credits?.cast ? media.details.credits?.cast : []} mediaType={media.details.mediaType}></MediaList>
            </section> : <></>
    );
}

const array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.8, 0.9, 1];
const lightGradients = `linear-gradient(to bottom, ${array.map((i) => `rgba(255, 255, 255, ${i})`).join(', ')}), `;
const darkGradients = `linear-gradient(to bottom, ${array.map((i) => `rgba(0, 0, 0, ${i})`).join(', ')}), `;
function HeroImage({ backdrop, images }: { backdrop?: string, images: ImageData }) {
    const [background, setBackground] = useState<string>('');
    const config = useSelector(configSelector);
    const [current, setCurrent] = useState<string | undefined>(backdrop);
    const [timer, setTimer] = useState<number>(0);
    const [backdrops, setBackdrops] = useState<Array<string>>([]);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const [classes, setClasses] = useState<{ base: string, wrapper: string, content: string }>({ base: '', wrapper: '', content: '' });

    useEffect(() => {
        console.log('current', current);
        if (current) {
            setBackground(config.theme.current === 'light' ?
                current.includes('rgb(') ? `${current}` : `${lightGradients} url('${current}') center/cover` :
                current.includes('rgb(') ? `${current}` : `${darkGradients} url('${current}') center/cover`
            )
        }
        else setBackground('');
    }, [current, config.theme.current]);

    useEffect(() => {
        console.log('hero: ', backdrop, images.backdrops)
        setBackdrops(getBackdrops(images, backdrop));
    }, [backdrop, images])

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        console.log('backdrops: ', backdrops);
        setCurrent(backdrops.length ? timer >= backdrops.length ? backdrops[0] : backdrops[timer] : backdrop);
        if (backdrops.length <= 1) return;

        debounceRef.current = setTimeout(() => {
            (timer >= backdrops.length - 1) ? setTimer(0) : setTimer(timer + 1);
        }, 10000)
    }, [timer, backdrops])

    useEffect(() => {
        let base: string = 'h-[100svh] fixed';
        let wrapper: string = '';
        let content: string = 'bg-background/20';
        const isColor: boolean = !current || current?.includes('rgb(');
        const isLight: boolean = config.theme.current === 'light';

        if(!isColor) base = 'h-[80svh] md:h-[70svh]';

        content = isLight ? (!isColor ? 'backdrop-blur-sm bg-background/50' : content) : !isColor ? 'bg-background/60' : content;


        setClasses({base, wrapper, content});
    }, [config.theme.current, current])

    return (
        <ScrollShadow hideScrollBar className={'transition ease-in-out duration-300  scroll -z-10 w-full absolute left-0 top-0 ' + classes.base}>
            <div className='transition ease-in-out duration-300 w-full h-full' style={{ background }}>
                <div className={'w-full h-full transition ease-in-out duration-300 ' + classes.content}></div>
            </div>
        </ScrollShadow>
    )
}