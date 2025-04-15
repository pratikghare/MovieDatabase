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
        if(media.details?.name) document.title = media.details.name + ' | Movie Database';
        else document.title = 'Movie Database';
    }, [media.details])

    return (
        media.details ?
            <section className={'transition-ease min-h-full border-1 border-foreground/10 bg-background/50 rounded-t-xl sm:rounded-b-xl' + 
            (media.details.backdrop ? ' mt-[15svh] ' : ' bg-background/20 !rounded-t-none ') +
            (!!media.details.credits?.cast.length && (media.details.images.list.length > 1 || !!media.details.images.backdrops.length) ? ' !rounded-b-none ' : '')}>
                <div id='details' className={'transition-ease z-10 backdrop-blur-md flex flex-col space-y-6 p-3 sm:p-5 rounded-xl'}>
                    <Overview setBackdrop={setBackDrop} details={media.details} />
                    <MediaList list={media.details.credits?.cast ? media.details.credits?.cast : []} mediaType={media.details.mediaType}></MediaList>
                    <ImagesSection images={media.details.images} videos={('videos' in media.details) ? media.details.videos : []} />
                    <MediaList list={('similar' in media.details) && media.details.similar ? media.details?.similar : []} title='More like this' isRounded={false} mediaType={media.details.mediaType}></MediaList>
                    <MediaList list={('recommendations' in media.details) && media.details.recommendations ? media.details?.recommendations : []} title='You may also like' isRounded={false} mediaType={media.details.mediaType}></MediaList>
                </div>
                <HeroImage backdrop={backdrop} images={media.details.images} />
            </section> : <></>
    );
}