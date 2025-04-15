import { useSelector } from 'react-redux';
import { configSelector, mediaSelector, useAppDispatch } from '../../store/selectors';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getMediaDataFromPathName } from '../../utils/utils';
import { detailsQuery } from '../../store/reducers/media-reducer';
import Overview from './overview';
import MediaList from './media-list';
import { ImagesSection } from './images-section';
import HeroImage from './hero-image';

export default function Details() {
    const dispatch = useAppDispatch();
    const media = useSelector(mediaSelector);
    const config = useSelector(configSelector);
    const location = useLocation();

    const [backdrop, setBackDrop] = useState<string | undefined>();
    const [classes, setClasses] = useState<string>('');


    useEffect(() => {
        const path = getMediaDataFromPathName(location.pathname);
        if (media.details && media.details.id === path.id && media.details.mediaType === path.media) return;
        
        if (path.valid) dispatch(detailsQuery({ id: path.id, media: path.media }));
    }, [location.pathname]);


    useEffect(() => {
        const horizontalScrollItems = document.getElementsByClassName('scroll-items');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        for (let i = 0; i < horizontalScrollItems.length; i++) {
            horizontalScrollItems[i].scrollLeft = 0;
            horizontalScrollItems[i].scrollTop = 0;
        }
        setBackDrop(media.details?.backdrop);
        if (media.details?.name) document.title = media.details.name + ' | Movie Database';
        else document.title = 'Movie Database';
    }, [media.details]);


    useEffect(() => {
        let cls = 'transition-ease min-h-full border-1 border-foreground/10 bg-background/50 rounded-t-xl sm:rounded-b-xl ';
        const bgDrop = media.details?.backdrop ? media.details?.backdrop : config.backdrop;
        cls += bgDrop ? 'mt-[30svh] lg:mt-[15svh] ' : 'bg-background/20 !rounded-t-none';
        if (media.details && media.details.credits?.cast.length && (media.details.images.list.length > 1 || !!media.details.images.backdrops.length)) {
            cls += ' !rounded-b-none';
        }
        setClasses(cls);
    }, [media.details?.backdrop]);


    return (
        <section className={classes}>
            <div id='details' className={'transition-ease z-10 backdrop-blur-md flex flex-col space-y-5 p-3 sm:p-5 rounded-xl'}>
                <Overview setBackdrop={setBackDrop} details={media.details} />
                <MediaList list={media.details && media.details.credits?.cast ? media.details.credits?.cast : []} mediaType={media?.details?.mediaType}></MediaList>
                {
                    media.details &&
                    <>
                        <ImagesSection images={media.details.images} videos={('videos' in media.details) ? media.details.videos : []} />
                        <MediaList list={('similar' in media.details) && media.details.similar ? media.details?.similar : []} title='More like this' isRounded={false} mediaType={media.details.mediaType}></MediaList>
                        <MediaList list={('recommendations' in media.details) && media.details.recommendations ? media.details?.recommendations : []} title='You may also like' isRounded={false} mediaType={media.details.mediaType}></MediaList>
                    </>
                }
            </div>
            <HeroImage backdrop={backdrop} images={media.details?.images} />
        </section>
    );
}