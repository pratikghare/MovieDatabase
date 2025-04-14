import { Image, Link } from '@heroui/react';
import { ImageData, Image as ImageType } from '../../context/media-context';
import RenderWithScrollShadow from './scroll-shadow-render';
import { getImageDimensions, getImagesList } from '../../utils/utils';
import { useEffect, useState } from 'react';

export function ImagesSection({ images }: { images: ImageData }) {
    const [data, setData] = useState(getImagesList(images));

    useEffect(() => {
        setTimeout(() => {
            const horizontalScrollItems = document.getElementsByClassName('scroll-right-1');
            for (let i = 0; i < horizontalScrollItems.length; i++) {
                horizontalScrollItems[i].scrollLeft = 50;
            }
        }, 200);
        
        setData(getImagesList(images));
    }, [images]);

    const imageClick = (image: ImageType) => {

    }

    return (
        images.list.length > 1 &&
        <section>
            <div className='flex justify-between'>
                <h1 className='font-bold my-1 '>Pictures</h1>
                <Link className='text-xs cursor-pointer'>See All</Link>
            </div>
            <RenderWithScrollShadow className='overflow-hidden relative flex flex-col gap-3 scroll-right-1'>
                <div className='flex space-x-3 top-0'>
                    {
                        data.top.map((image: ImageType, index: number) => (
                            <Image onClick={() => imageClick(image)} key={image.path + index} radius='sm' className='cursor-pointer object-cover' src={image.thumbnail} style={getImageDimensions(image)} />
                        ))
                    }
                </div>
                <div className='flex space-x-3 top-0'>
                    {
                        data.bottom.map((image: ImageType, index: number) => (
                            <Image onClick={() => imageClick(image)} key={image.path + (index + 10)} radius='sm' className='cursor-pointer object-cover' src={image.thumbnail} style={getImageDimensions(image)} />
                        ))
                    }
                </div>
            </RenderWithScrollShadow>
        </section>
    );
}