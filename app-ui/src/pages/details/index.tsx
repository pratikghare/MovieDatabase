import { useEffect, useState } from 'react';
import { Outlet, useLoaderData, useLocation } from 'react-router';
import { configSelector, mediaSelector, useAppDispatch } from '../../store/selectors';
import { detailsQuery } from '../../store/reducers/media-reducer';
import { MediaType } from '../../context/media-context';
import { useSelector } from 'react-redux';
import { getIsColor, setColorFromImage, updateBackdropUtils } from '../../utils/utils';
import { updateBackground } from '../../store/reducers/config-reducer';
import { Button } from '@heroui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

interface LoaderParams {
    id: string | undefined;
    media: MediaType;
}

export function DetailsContainer() {
    const dispatch = useAppDispatch();
    const media = useSelector(mediaSelector);
    const config = useSelector(configSelector);
    const location = useLocation();
    const params = useLoaderData() as LoaderParams;

    const [classes, setClasses] = useState<{ base: string, wrapper: string, content: string }>({ base: '', wrapper: '', content: '' });
    const [backgroundToggle, setBackgroundToggle] = useState<boolean>(false);

    useEffect(() => {
        if (params && params.id && params.media) dispatch(detailsQuery({ id: params.id, media: params.media }));
    }, [params]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updateBackdropUtils(dispatch, media.details);
        setBackgroundToggle(false);

        if (media.details) {
            document.title = `${media.details.name} | Movie Database`;
        }
        else document.title = `Movie Database`;

        if (media.details?.backdrop) updateBackground(media.details.backdrop);
        if (media.details) setColorFromImage(dispatch, media.details.poster);

    }, [media.details, location.pathname]);

    useEffect(() => {
        let wrapper: string = '';
        let content: string = '';
        let base: string = '';

        const isColor = getIsColor(config.background, location.pathname);
        // console.log('isColor', isColor)
        if (!isColor) {
            base = 'rounded-t-lg ' + (backgroundToggle ? 'mt-[70svh]' : 'mt-[30svh] md:mt-[20svh]');
        }

        setClasses({ base, wrapper, content });
    }, [config.background, location.pathname, backgroundToggle]);

    return (
        <section className={'transition-ease bg-background/50 backdrop-blur-md min-h-[calc(100svh_-_144px)] sm:min-h-[calc(100svh_-_164px)] ' + (classes && classes.base)}>
            <Outlet />
            {
                !getIsColor(config.background, location.pathname) &&
                <div className='absolute top-0 right-0 '>
                    <Button radius='sm' variant='light' isIconOnly className='p-2 min-w-2 h-auto w-auto ' onPress={() => setBackgroundToggle(!backgroundToggle)}>
                        <ChevronUpIcon className={'transition-ease text-white size-4 ' + (backgroundToggle ? 'rotate-0' : 'rotate-180')} />
                    </Button>
                </div>
            }
        </section>
    );
}