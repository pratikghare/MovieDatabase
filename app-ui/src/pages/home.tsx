import { useEffect } from 'react';
import { mediaSelector, useAppDispatch } from '../store/selectors';
import { updateBackground, updateBackgroundColor, updateComingFrom, updateLastViewedImage, updateMaxWidth } from '../store/reducers/config-reducer';
import { PAGES } from '../context/media-context';
import { homePageQuery } from '../store/reducers/media-reducer';
import { useSelector } from 'react-redux';
import Slider from '../components/slider';
import MediaList from '../components/media-list';

export default function Home() {
    const dispatch = useAppDispatch();
    const media = useSelector(mediaSelector);

    useEffect(() => {
        dispatch(updateComingFrom(PAGES.HOME));
        dispatch(updateLastViewedImage());
        dispatch(updateBackground());
        dispatch(updateBackgroundColor());
        dispatch(homePageQuery());
        dispatch(updateMaxWidth(1024));
    }, []);

    return (
        <section className='py-2 flex flex-col gap-4 text-xs sm:text-sm'>
            <Slider showSkeleton={media.homePageLoader} classNames={{ image: 'object-cover lg:rounded-md' }} list={media?.homePage?.nowPlaying ? media.homePage.nowPlaying : []} title='Now Playing' />
            <div className='flex px-[0px]'>
                <div className='flex flex-col gap-4'>
                    <MediaList offset={0} skeletonLength={8} showSkeleton list={media.homePage?.trendingPeople ? media.homePage.trendingPeople : []} title={'Popular'} />
                    <MediaList offset={0} skeletonLength={8} showSkeleton list={media.homePage?.topRatedTV ? media.homePage.topRatedTV : []} title={'Top Rated TV'} />
                </div>
            </div>
        </section>
    );
}