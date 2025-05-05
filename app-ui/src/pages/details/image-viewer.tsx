import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { Image as ImageType, MediaType } from '../../context/media-context';
import { useSelector } from 'react-redux';
import { mediaSelector } from '../../store/selectors';
import { Image } from '@heroui/react';
import CommonDetailsNav from '../../components/details/common-details-nav';

interface LoaderParams {
    mediaId: string | undefined;
    mediaType: MediaType;
}

export default function ImageViewer() {
    const params = useLoaderData() as LoaderParams;
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const images: Array<ImageType> | undefined = useSelector(mediaSelector).details?.images.list;
    const details = useSelector(mediaSelector).details;
    const loader: boolean = useSelector(mediaSelector).loader;


    useEffect(() => {
        const key: string | undefined = params.mediaId;

        if (images && key) {
            const item: number | undefined = images.findIndex(i => i.path.includes(key));
            if (item) {
                setCurrentIndex(item);
            }
        }
    }, [images, location.pathname, params])

    return (
        <section className='pt-3'>
            <CommonDetailsNav title={''} details={details} />
            {
                loader ?
                    <></> :
                    images && <Image radius='none' src={images[currentIndex].path} />
            }
        </section>
    );
}