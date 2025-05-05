import { useSelector } from 'react-redux';
import CommonDetailsNav from '../../components/details/common-details-nav';
import { Image as ImageType, Video } from '../../context/media-context';
import { mediaSelector } from '../../store/selectors';
import { Image, ScrollShadow, Skeleton } from '@heroui/react';
import { getImageWidth } from '../../utils/utils';
import usePosterDimensions from '../../hooks/usePosterDimensions';
import { useNavigate } from 'react-router';
import { useEffect, useId, useState } from 'react';
import ReactPlayer from 'react-player';
import { YoutubeIcon } from '../../components/icons';

function MediaSection({ loader, images = [], videos = [], title = '' }: { loader: boolean; images?: ImageType[]; videos?: Video[]; title: string; }) {
    const navigate = useNavigate();
    const { height } = usePosterDimensions();
    const factor = 560 / 315;
    const id = useId();

    const [playing, setPlaying] = useState<boolean[]>(() => videos.map(() => false));

    const playVideo = (index: number) => {
        setPlaying(videos.map((_, i: number) => i === index));
    };


    useEffect(() => {

    }, [])

    return (
        <div className='p-3 flex flex-col gap-2'>
            {
                !loader ? <h1 className='font-bold'>{title}</h1> :
                    <Skeleton className='h-3 w-5/5 max-w-[300px] rounded-lg' />
            }
            <ScrollShadow hideScrollBar className='flex gap-2 sm:gap-3 flex-wrap max-h-[300px] sm:max-h-[400px] overflow-x-hidden'>
                {
                    !!images?.length &&
                    images.map((item: ImageType, index: number) => (
                        <Image radius='none' className='rounded-[5px]' key={item.path + '_' + index} src={item.thumbnail}
                            onClick={() => navigate(item.path.split('/')[item.path.split('/').length - 1])}
                            style={{ height, width: getImageWidth(item, height), minWidth: getImageWidth(item, height), cursor: 'pointer' }}
                        />
                    ))
                }
                {
                    loader &&
                    Array(6).fill(1).map((_, index: number) => (
                        <Skeleton key={id + '-skeleton-'+ index} className='rounded-lg' style={{ height, width: height * factor }}>
                            <div className='h-full w-full rounded-lg bg-secondary' />
                        </Skeleton>
                    ))
                }
            </ScrollShadow>
            <ScrollShadow hideScrollBar className='video-grid max-h-[300px] sm:max-h-[400px] gap-2' style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${height * factor}px, 1fr))`, gridAutoRows: `${height + 50}px` }}>
                {
                    !!videos.length &&
                    videos.map((video: Video, index: number) => (
                        <div key={video.url} className='flex flex-col gap-1 w-full h-full' style={{ gridColumn: index === playing.findIndex(Boolean) ? 'span 2' : '', gridRow: index === playing.findIndex(Boolean) ? 'span 2' : '' }}>
                            <div className='relative w-full h-full'>
                                {
                                    playing[index] ?
                                        <ReactPlayer
                                            url={video.url}
                                            width='100%'
                                            height='100%'
                                            playing={playing[index]}
                                            controls={true}
                                            className='video-player'
                                        /> :
                                        <>
                                            <Image radius='none' className='rounded-sm h-full w-full pointer-events-none'
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
                                <p className='text-xxs md:!text-xs'>{video.name}</p>
                            }
                        </div>
                    ))
                }
            </ScrollShadow>
        </div>
    );
}

export default function ImagesVideos() {
    const media = useSelector(mediaSelector);
    const [images, setImages] = useState<Array<ImageType>>([]);
    const [videos, setVideos] = useState<Array<Video>>([]);

    useEffect(() => {
        setImages(media.details?.images?.list?.length ? media.details.images.list : []);
        setVideos(media.details && ('videos' in media.details) && media.details.videos?.length ? media.details.videos : [])
    }, [media])

    return (
        <section className='pt-[15px] '>
            <CommonDetailsNav details={media.details} title={'Pictures & Videos'} />
            <MediaSection loader={media.loader} images={images} title={!!images.length ? `Images (${images.length})` : ''} />
            <MediaSection loader={media.loader} videos={videos} title={!!videos.length ? `Videos (${videos.length})` : ''} />
        </section>
    );
}