import { ScrollShadow, Skeleton, Image } from '@heroui/react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CommonDetailsNav from '../../components/details/common-details-nav';
import { Movie, Person, TvShow, Media, Video, PAGES } from '../../context/media-context';
import usePosterDimensions from '../../hooks/usePosterDimensions';
import { mediaSelector, useAppDispatch } from '../../store/selectors';
import ReactPlayer from 'react-player';
import { YoutubeIcon } from '../../components/icons';
import { updateComingFrom } from '../../store/reducers/config-reducer';

export default function Videos() {
    const dispatch = useAppDispatch();
    const details: Movie | Person | TvShow | Media | undefined = useSelector(mediaSelector).details;
    const loader: boolean = useSelector(mediaSelector).loader;
    const { height } = usePosterDimensions({ breakpointHeights: [100, 140, 183], factor: (315 / 560) });

    const [list, setList] = useState<Array<Video>>([]);

    const [playing, setPlaying] = useState<boolean[]>(() => list.map(() => false));

    useEffect(() => {
        dispatch(updateComingFrom(PAGES.VIDEOS));
    }, [])

    const playVideo = (index: number) => {
        setPlaying(list.map((_, i: number) => i === index));
    };

    useEffect(() => {
        setPlaying(list.map(() => false))
    }, [list])

    useEffect(() => {
        if (!!details && ('videos' in details) && details?.videos?.length) setList(details.videos);
        else setList([]);
    }, [details])

    return (
        <section className='p-2 flex flex-col gap-3 select-none'>
            <CommonDetailsNav className='m-0' details={details} title={'Videos ' + (!!list.length ? `(${list.length})` : '')} />
            <ScrollShadow hideScrollBar className='grid grid-cols-2 grid-flow-dense sm:grid-cols-3 gap-3 justify flex-wrap max-h-[calc(100svh_-_197px_-_50px)] sm:max-h-[calc(100svh_-_197px_-_64px_-_5px)] overflow-x-hidden'
            >
                {
                    !!list.length &&
                    list.map((video: Video, index: number) => (
                        <div key={video.url} className={'flex flex-col gap-1 h-full ' + (playing[index] ? 'col-span-2 row-span-2' : '')}
                        style={{ minHeight: playing[index] ? `${height*2}px` : '' }}
                        >
                            <div className={'relative ' + (playing[index] ? 'h-full' : '')}>
                                {
                                    playing[index] ?
                                        <ReactPlayer
                                            url={video.url}
                                            width='100%'
                                            height='100%'
                                            playing={playing[index]}
                                            controls={true}
                                            className='video-player rounded-md'
                                        /> :
                                        <>
                                            <Image radius='sm' className=' h-full w-full pointer-events-none'
                                                key={video.url + '_' + index} src={video.thumbnail}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            <button onClick={() => playVideo(index)} className='absolute flex w-full h-full top-0 items-center justify-center z-10'>
                                                <YoutubeIcon className='size-6 md:size-8' />
                                            </button>
                                        </>
                                }

                            </div>
                            {
                                <p className='text-xxs w-full md:!text-xs'> {index + 1}. {video.name} {playing[index] && '(Playing)'}</p>
                            }
                        </div>
                    ))
                }
                {
                    loader &&
                    Array(6).fill(1).map((_, index: number) => (
                        <div className='flex w-full h-full' key={'image-skeleton-' + index} style={{ height }}>
                            <Skeleton className='rounded-lg w-full h-full'>
                                <div className='h-full w-full rounded-lg bg-secondary' />
                            </Skeleton>
                        </div>
                    ))
                }
            </ScrollShadow>
        </section>
    );
}