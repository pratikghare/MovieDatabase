import { useSelector } from 'react-redux';
import { Movie, Person, TvShow, Media, Image as ImageType, PAGES } from '../../context/media-context';
import { mediaSelector, useAppDispatch } from '../../store/selectors';
import { useEffect, useState } from 'react';
import CommonDetailsNav from '../../components/details/common-details-nav';
import { ScrollShadow, Skeleton, Image } from '@heroui/react';
import { useNavigate } from 'react-router';
import usePosterDimensions from '../../hooks/usePosterDimensions';
import { updateComingFrom } from '../../store/reducers/config-reducer';

export default function Photos() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const details: Movie | Person | TvShow | Media | undefined = useSelector(mediaSelector).details;
    const loader: boolean = useSelector(mediaSelector).loader;

    const { height } = usePosterDimensions();
    const [list, setList] = useState<Array<ImageType>>([]);

    useEffect(() => {
        dispatch(updateComingFrom(PAGES.IMAGES));
    }, [])


    useEffect(() => {
        if (details?.images.list) setList(details.images.list);
        else setList([]);
    }, [details])

    return (
        <section className='p-2 flex flex-col gap-3 select-none'>
            <CommonDetailsNav className='m-0' details={details} title={'Photos ' + (!!list.length ? `(${list.length})` : '')} />
            <ScrollShadow hideScrollBar className='grid items-center grid-cols-4 sm:grid-cols-7 grid-flow-dense gap-1 sm:gap-2 flex-wrap max-h-[calc(100svh_-_197px_-_50px_+_80px)] sm:max-h-[calc(100svh_-_197px_-_64px_-_5px_+_100px)] overflow-x-hidden'
            // style={{ gridTemplateRows: `repeat(auto-fit, minmax(${height}px, 1fr))` }}
            >
                {
                    !!list?.length &&
                    list.map((item: ImageType, index: number) => (
                        // <Image radius='none' key={item.path + '_' + index} src={item.thumbnail}
                        //     className='rounded-[5px] object-cover' classNames={{ wrapper: item.aspectRatio > 1 ? 'col-span-3' : '' }}
                        //     onClick={() => navigate(item.path.split('/')[item.path.split('/').length - 1])}
                        //     style={{  cursor: 'pointer' }}
                        // />
                        <div className={'rounded-sm h-full cursor-pointer '+(item.aspectRatio > 1 ? 'col-span-2 sm:col-span-3' : '')}
                            key={item.path + '_' + index}
                            style={{ background: `url('${item.thumbnail}') center/cover` }} onClick={() => navigate(item.path.split('/')[item.path.split('/').length - 1])}
                        >
                            <Image radius='none' src={item.thumbnail}
                                className='rounded-[5px] object-cover invisible ' classNames={{ wrapper: item.aspectRatio > 1 ? 'col-span-3' : '' }}
                            />
                        </div>
                    ))
                }
                {
                    loader &&
                    Array(9).fill(1).map((_, index: number) => (
                        <div className={'flex w-full h-full ' + (index % 2 === 0 ? 'col-span-2' : '')} key={'image-skeleton-' + index} style={{ height }}>
                            <Skeleton className='rounded-md w-full h-full'>
                                <div className='h-full w-full rounded-lg bg-secondary' />
                            </Skeleton>
                        </div>
                    ))
                }
            </ScrollShadow>
        </section>
    );
}