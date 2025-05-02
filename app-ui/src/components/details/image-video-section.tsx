import { useSelector } from 'react-redux';
import { Movie, Person, TvShow, Media, Image as ImageType, Video } from '../../context/media-context';
import { mediaSelector } from '../../store/selectors';
import { useEffect, useState } from 'react';
import HorizontalScroll from '../horizontal-scroll';
import { Image, Link } from '@heroui/react';
import usePosterDimensions from '../../hooks/usePosterDimensions';
import { getImageWidth } from '../../utils/utils';
import { useNavigate } from 'react-router';

export default function ImageSection() {
    const details: Movie | Person | TvShow | Media | undefined = useSelector(mediaSelector).details;
    const navigate = useNavigate();
    const { height } = usePosterDimensions();

    const [images, setImages] = useState<Array<ImageType>>([]);
    const [videos, setVideos] = useState<Array<Video>>([]);
    const [title, setTitle] = useState<string>('');

    const [list1, setList1] = useState<Array<ImageType>>([]);
    const [list2, setList2] = useState<Array<ImageType>>([]);

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
        setTitle(`Pictures ${videos.length ? ' & Videos' : ''} (${images.length + videos.length})`);
        setList1(images.slice(0, 10));
        setList2(images.slice(10, 20).reverse());
    }, [images, videos]);

    useEffect(() => {
        if (images.length > 10) {
            setTimeout(scrollToLeft, 100);
        }
    }, [list1, list2]);

    const scrollToLeft = () => {
        const elements = document.getElementsByClassName('image-section-scroll');
        for (let i = 0; i < elements.length; i++) elements[i].scrollLeft = 50;   
    }

    const seeAll = () => {
        navigate('media');
    }


    return (
        images.length > 1 &&
        <div className='flex flex-col gap-2 my-2'>
            <div className='flex justify-between'>
                <h1 className='font-bold'>{title}</h1>
                {
                    (images.length >= 10 || !!videos.length) &&
                    <Link className='text-xs cursor-pointer text-primary hover:underline' onPress={seeAll}>{'See All'}</Link>
                }
            </div>
            <HorizontalScroll className={'flex gap-2 image-section-scroll ' + (images.length > 10 ? '' : '')}>
                {
                    list1.map((item: ImageType, index: number) => (
                        <Image radius='none' className='rounded-[5px]' key={item.path + '_' + index} src={item.thumbnail}
                            style={{ height, width: getImageWidth(item, height), minWidth: getImageWidth(item, height) }}
                        />
                    ))
                }
            </HorizontalScroll>
            {
                list2.length > 5 &&
                <HorizontalScroll className='flex gap-2 image-section-scroll scroll-l justify-evenly'>
                    {
                        list2.map((item: ImageType, index: number) => (
                            <Image radius='none' className='rounded-[5px]' key={item.path + '_' + index} src={item.thumbnail}
                                style={{ height, width: getImageWidth(item, height), minWidth: getImageWidth(item, height) }}
                            />
                        ))
                    }
                </HorizontalScroll>
            }
        </div>
    );

}