import { useSelector } from 'react-redux';
import { Movie, Person, TvShow, Media, Image as ImageType, Video } from '../../context/media-context';
import { mediaSelector } from '../../store/selectors';
import { useEffect, useState } from 'react';
import HorizontalScroll from '../horizontal-scroll';
import { Image, Link } from '@heroui/react';
import usePosterDimensions from '../../hooks/usePosterDimensions';
import { getImageWidth } from '../../utils/utils';
import { useNavigate } from 'react-router';
import { YoutubeIcon } from '../icons';

export default function ImageSection() {
    const details: Movie | Person | TvShow | Media | undefined = useSelector(mediaSelector).details;
    const navigate = useNavigate();
    const { height } = usePosterDimensions();

    const [images, setImages] = useState<Array<ImageType>>([]);
    const [videos, setVideos] = useState<Array<Video>>([]);

    const [list1, setList1] = useState<Array<ImageType>>([]);
    const [list2, setList2] = useState<Array<ImageType>>([]);

    const videoImage: ImageType = {
        key: '',
        path: '',
        width: 0,
        height: 0,
        aspectRatio: 1.778,
        thumbnail: ''
    }

    useEffect(() => {
        if (details) {
            if ('images' in details) {
                setImages(details.images.list);
            }
            if ('videos' in details) {
                setVideos(details.videos);
            }
        }
        else {
            setImages([]);
            setVideos([]);
        }
    }, [details]);

    useEffect(() => {
        setList1(images.slice(0, 10));
        setList2(images.slice(10, 20).reverse());
    }, [images, videos]);

    useEffect(() => {
        if (images.length > 10) {
            if (images.length === 0)
            setTimeout(scrollToLeft, 100);
        }
    }, [list1, list2]);

    const scrollToLeft = () => {
        const elements: any = document.getElementsByClassName('image-section-scroll');
        for (let i = 0; i < elements.length; i++) {
            elements[i].scrollLeft = 50;
            elements[i].style.overflowX = 'hidden';
        }
    }

    const navigateToMedia = (id?: string) => {
        navigate(`media/${id ? id : ''}`);
    }

    return (
        <>
            {
                images.length > 1 &&
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <h1 className='font-bold'>Photos {!!images.length && `(${images.length})`}</h1>
                        <Link className='text-xs cursor-pointer text-primary hover:underline' onPress={() => navigateToMedia()}>{'See All'}</Link>
                    </div>
                    <HorizontalScroll className='flex gap-2 image-section-scroll overflow-x-hidden select-none'>
                        {
                            list1.map((item: ImageType, index: number) => (
                                <Image radius='none' className='rounded-[5px]' key={item.path + '_' + index} src={item.thumbnail}
                                    onClick={() => navigateToMedia(item.path.split('/')[item.path.split('/').length - 1])}
                                    style={{ height, width: getImageWidth(item, height), minWidth: getImageWidth(item, height), cursor: 'pointer' }}
                                />
                            ))
                        }
                    </HorizontalScroll>
                    {
                        list2.length > 5 &&
                        <HorizontalScroll className='flex gap-2 image-section-scroll scroll-l justify-evenly overflow-x-hidden select-none'>
                            {
                                list2.map((item: ImageType, index: number) => (
                                    <Image radius='none' className='rounded-[5px]' key={item.path + '_' + index} src={item.thumbnail}
                                        onClick={() => navigateToMedia(item.path.split('/')[item.path.split('/').length - 1])}
                                        style={{ height, width: getImageWidth(item, height), minWidth: getImageWidth(item, height), cursor: 'pointer' }}
                                    />
                                ))
                            }
                        </HorizontalScroll>
                    }
                </div>
            }
            {
                !!videos.length &&
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between'>
                        <h1 className='font-bold'>Videos {!!videos.length && `(${videos.length})`}</h1>
                        <Link className='text-xs cursor-pointer text-primary hover:underline' onPress={() => navigate('videos/')}>{'See All'}</Link>
                    </div>
                    <HorizontalScroll className='flex gap-2 image-section-scroll scroll-l justify-evenly overflow-x-hidden select-none'>
                        {
                            videos.slice(0, 10).map((video: Video, index: number) => (
                                <div key={video.url + '_' + index} className='relative' onClick={() => navigate('videos/')} >
                                    <Image radius='sm' className=' h-full w-full pointer-events-none'
                                        src={video.thumbnail} onClick={() => navigate('videos/')}
                                        style={{ height, width: getImageWidth(videoImage, height), minWidth: getImageWidth(videoImage, height), cursor: 'pointer' }}
                                    />
                                    <YoutubeIcon className='absolute z-10 size-10  bottom-1 right-2' />
                                </div>
                            ))
                            // right-2 top-1
                        }
                    </HorizontalScroll>
                </div>
            }
        </>
    );

}