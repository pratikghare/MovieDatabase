import { useSelector } from 'react-redux';
import { Companies, RevenueDetails, StreamingPlatforms } from '../../components/details/details-exports';
import Overview from '../../components/details/overview';
import MediaList from '../../components/media-list/index';
import { mediaSelector, useAppDispatch } from '../../store/selectors';
import { MediaType, PAGES } from '../../context/media-context';
import ReviewDetails from '../../components/details/reviews';
import { useLocation, useNavigate } from 'react-router';
import { getMediaTypeFromPath } from '../../utils/utils';
import ImageSection from '../../components/details/image-video-section';
import SeasonsInfo from '../../components/details/seasons-info';
import { useEffect } from 'react';
import { updateComingFrom } from '../../store/reducers/config-reducer';

export default function Details() {
    const details = useSelector(mediaSelector).details;
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(updateComingFrom(PAGES.DETAILS));
    }, []);


    return (
        <div className='flex flex-col gap-6 p-3 px-4'>
            <Overview />
            <SeasonsInfo />
            <RevenueDetails />
            {
                !details || !!details.credits?.cast?.length ?
                    <MediaList showSkeleton seeAll={() => { navigate('credits') }} isRounded={getMediaTypeFromPath(location.pathname) !== MediaType.PERSON}
                        list={details && details.credits?.cast ? details.credits?.cast : []}
                        title={details?.mediaType === MediaType.PERSON ? 'Known for' : 'Top Cast'}
                    /> : <></>
            }
            <StreamingPlatforms />
            <ReviewDetails />
            <ImageSection />
            <Companies />
            {
                details &&
                <>
                    <MediaList list={('similar' in details) && details.similar ? details?.similar : []} title='More like this' isRounded={false}></MediaList>
                    <MediaList list={('recommendations' in details) && details.recommendations ? details?.recommendations : []} title='You may also like' isRounded={false}></MediaList>
                </>
            }

        </div>
    );
}
