import { useSelector } from 'react-redux';
import { mediaSelector, useAppDispatch } from '../../store/selectors';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getMediaDataFromPathName } from '../../utils/utils';
import { detailsQuery } from '../../store/reducers/media-reducer';
import Overview from './overview';
import MediaList from './media-list';
import { ImagesSection } from './images-section';
import HeroImage from './hero-image';

export default function Details() {
    const media = useSelector(mediaSelector);
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [backdrop, setBackDrop] = useState<string | undefined>();

    useEffect(() => {
        const { valid, id, media } = getMediaDataFromPathName(location.pathname);
        if (valid) {
            dispatch(detailsQuery({ id, media }));
        }
    }, [location.pathname]);

    useEffect(() => {
        const horizontalScrollItems = document.getElementsByClassName('scroll-items');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        for (let i = 0; i < horizontalScrollItems.length; i++) {
            horizontalScrollItems[i].scrollLeft = 0;
            horizontalScrollItems[i].scrollTop = 0;
        }
        setBackDrop(media.details?.backdrop);
    }, [media.details])

    return (
        media.details ?
            <section className={'transition-ease min-h-full bg-background/50 rounded-xl '+ (media.details.backdrop ? 'mt-[15svh]' : 'bg-background/20 rounded-t-none ')}>
                <div id='details' className={'transition-ease z-10 backdrop-blur-sm flex flex-col space-y-4 p-3 sm:p-5 rounded-xl'}>
                    <Overview setBackdrop={setBackDrop} details={media.details} />
                    <MediaList list={media.details.credits?.cast ? media.details.credits?.cast : []} mediaType={media.details.mediaType}></MediaList>
                    <ImagesSection images={media.details.images} />
                </div>
                <HeroImage backdrop={backdrop} images={media.details.images} />
            </section> : <></>
    );
}