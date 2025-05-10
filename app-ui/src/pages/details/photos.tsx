import { useSelector } from 'react-redux';
import { Movie, Person, TvShow, Media, Image as ImageType, PAGES } from '../../context/media-context';
import { configSelector, mediaSelector, useAppDispatch } from '../../store/selectors';
import { useEffect, useState } from 'react';
import CommonDetailsNav from '../../components/details/common-details-nav';
import { ScrollShadow, Skeleton, Image } from '@heroui/react';
import { useNavigate } from 'react-router';
import usePosterDimensions from '../../hooks/usePosterDimensions';
import { updateComingFrom, updateLastViewedImage } from '../../store/reducers/config-reducer';

export default function Photos() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const details: Movie | Person | TvShow | Media | undefined = useSelector(mediaSelector).details;
    const loader: boolean = useSelector(mediaSelector).loader;
    const config = useSelector(configSelector);

    const { height } = usePosterDimensions();
    const [list, setList] = useState<Array<ImageType>>([]);

    useEffect(() => {
        dispatch(updateComingFrom(PAGES.IMAGES));
    }, []);

    useEffect(() => {
        if (config.lastViewedImage && list.length) {
            const lastViewedImage: string | undefined = config.lastViewedImage;
            dispatch(updateLastViewedImage());
            const element = document.getElementById(lastViewedImage);
            const rect = element?.getBoundingClientRect();
            if (element) {
                //#17c964 
                let border = '2px solid #f5a524';
                let interval = setInterval(()=> {
                    border = border === '0' ? '2px solid #f5a524' : '0';
                    element.style.border = border;
                }, 400);
                setTimeout(()=> {
                    element.style.border = '0';
                    clearInterval(interval);
                }, 4000)
            }
            if (rect) {
                const y = rect?.top + window.scrollY - 170;
                window.scrollTo({
                    top: y,
                    behavior: 'smooth',
                });
            }
        }
    }, [list, config.lastViewedImage])


    useEffect(() => {
        if (details?.images.list) setList(details.images.list);
        else setList([]);
    }, [details])

    return (
        <section className='p-2 flex flex-col gap-3 select-none'>
            <CommonDetailsNav className='m-0' details={details} title={'Photos ' + (!!list.length ? `(${list.length})` : '')} />
            <ScrollShadow hideScrollBar className='grid items-center grid-cols-4 sm:grid-cols-7 grid-flow-dense gap-1 sm:gap-2 flex-wrap '
            // max-h-[calc(100svh_-_197px_-_50px_+_80px)] sm:max-h-[calc(100svh_-_197px_-_64px_-_5px_+_100px)] overflow-x-hidden
            >
                {
                    !!list?.length &&
                    list.map((item: ImageType, index: number) => (
                        // <Image radius='none' key={item.path + '_' + index} src={item.thumbnail}
                        //     className='rounded-[5px] object-cover' classNames={{ wrapper: item.aspectRatio > 1 ? 'col-span-3' : '' }}
                        //     onClick={() => navigate(item.path.split('/')[item.path.split('/').length - 1])}
                        //     style={{  cursor: 'pointer' }}
                        // />
                        <div className={'rounded-sm h-full w-full cursor-pointer relative ' + (item.aspectRatio > 1 ? 'col-span-2 sm:col-span-3' : '')}
                            key={item.key + '_' + index} style={{ background: `url('${item.thumbnail}') center/cover` }} 
                            onClick={() => navigate(item.path.split('/')[item.path.split('/').length - 1])}
                        >
                            <div id={item.key} className='absolute top-0 left-0 w-full h-full border-1 border-transparent'></div>
                            <Image radius='none' src={item.thumbnail}
                                className='rounded-[5px] object-cover invisible ' classNames={{ wrapper: item.aspectRatio > 1 ? 'col-span-3' : '' }}
                            />
                        </div>
                    ))
                }
                {
                    loader &&
                    Array(14).fill(1).map((_, index: number) => (
                        <div className={'flex w-full h-full ' + (index % 2 === 0 ? 'col-span-2 ' : '') + (index >= 8 ? 'hidden sm:flex' : '')} key={'image-skeleton-' + index} style={{ height }}>
                            <Skeleton className={'rounded-md w-full h-full '}>
                                <div className='h-full w-full rounded-lg bg-secondary' />
                            </Skeleton>
                        </div>
                    ))
                }
            </ScrollShadow>
        </section>
    );
}