import { Image, Link } from '@heroui/react';
import { ImageData, Image as ImageType, Video } from '../../context/media-context';
import RenderWithScrollShadow from './scroll-shadow-render';
import { getImageDimensions, getImagesList } from '../../utils/utils';
import { useEffect, useState } from 'react';
import { usePosterDimensions } from '../../hooks/usePosterDimensions';

export function ImagesSection({ images, videos = [] }: { images: ImageData, videos: Array<Video> }) {
    const [data, setData] = useState(getImagesList(images));
    const { height } = usePosterDimensions();

    useEffect(() => {
        setTimeout(() => {
            const horizontalScrollItems = document.getElementsByClassName('scroll-right-1');
            for (let i = 0; i < horizontalScrollItems.length; i++) {
                horizontalScrollItems[i].scrollLeft = 50;
            }
        }, 100);
        
        setData(getImagesList(images));
    }, [images.backdrops, images.list]);

    const imageClick = (image: ImageType) => {
        console.log(image);
    }

    return (
        images.list.length > 1 &&
        <section>
            <div className='flex justify-between'>
                <h1 className='font-bold my-1 '>Pictures { videos.length ? ' & Videos' : '' } ({ images.list.length + videos.length })</h1>
                <Link className='text-xs cursor-pointer'>See All</Link>
            </div>
            <RenderWithScrollShadow className='overflow-hidden relative flex flex-col gap-1 scroll-right-1'>
                <div className='flex space-x-1 top-0'>
                    {
                        data.top.map((image: ImageType, index: number) => (
                            <div key={image.path + index} style={getImageDimensions(image, height)} >
                                <Image onClick={() => imageClick(image)} radius='none' className='cursor-pointer rounded-[3px] object-cover' src={image.thumbnail} style={getImageDimensions(image, height)} />
                            </div>
                        ))
                    }
                </div>
                <div className='flex space-x-1 top-0'>
                    {
                        data.bottom.map((image: ImageType, index: number) => (
                            <div key={image.path + (index + 10)} style={getImageDimensions(image, height)} >
                                <Image onClick={() => imageClick(image)} radius='none' className='cursor-pointer rounded-[3px] object-cover' src={image.thumbnail} style={getImageDimensions(image, height)} />
                            </div>
                        ))
                    }
                </div>
            </RenderWithScrollShadow>
        </section>
    );
}