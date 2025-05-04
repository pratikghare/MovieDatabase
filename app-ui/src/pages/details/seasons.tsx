import { useSelector } from 'react-redux';
import { Movie, Person, TvShow, Media, Season, CompactEpisode, MediaType } from '../../context/media-context';
import { mediaSelector } from '../../store/selectors';
import { Card, CardBody, CardHeader, Chip, Image, ScrollShadow, Skeleton } from '@heroui/react';
import { navigateToCredits, navigateToSeasons } from '../../utils/utils';
import { useLocation, useNavigate } from 'react-router';
import { useCallback, useEffect, useState } from 'react';
import { StarRating } from '../../components/details/star-rating';
import { ComputedParagraph } from '../../components/details/details-exports';
import { DotIcon } from '../../components/icons';
import { fetchSeasonDetails } from '../../service/media-service';
import usePosterDimensions from '../../hooks/usePosterDimensions';
import MediaList from '../../components/media-list';

export default function Seasons() {
    const details: Movie | Person | TvShow | Media | undefined = useSelector(mediaSelector).details;

    const navigate = useNavigate();
    const location = useLocation();

    const [active, setActive] = useState<Season | undefined | null>(undefined);

    const RenderOverview = useCallback(() => {
        const overview: string = active?.overview ? active.overview : '';
        return (
            !active ?
                <div className='flex flex-col gap-2 min-w-[200px] md:min-[400px] lg:min-w-[600px] w-full mt-4'>
                    <Skeleton className='h-3 w-5/5 rounded-lg' />
                    <Skeleton className='h-3 w-4/5 rounded-lg' />
                </div> :
                <ScrollShadow hideScrollBar className='text-xs max-h-[150px] flex flex-col gap-1'>
                    <ComputedParagraph text={overview} id={'overview-para'} />
                </ScrollShadow>
        );
    }, [active?.overview]);


    useEffect(() => {
        setActive(undefined);
        const list = location.pathname.split('/').filter(Boolean);
        if (!!details && ('seasons' in details) && details.seasons) {
            const item: Season | undefined = details.seasons.find((season: Season) => season.seasonNumber.toString() === list[list.length - 1]);
            if (item) fetchCurrentSeason(details.id, details.mediaType, item?.seasonNumber || 1);
            else navigateToSeasons(navigate, details, details.seasons[0]);
        }
        else setActive(undefined);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname, details]);

    const fetchCurrentSeason = (id: string, media: MediaType, seasonNumber: number) => {
        fetchSeasonDetails(id, media, seasonNumber).then((res: Season | null) => {
            setActive(res);
        })
    }

    return (
        <section className='flex flex-col gap-6 p-3 px-4'>
            <div className='flex flex-col gap-1'>
                {
                    details && ('seasons' in details) && !!details.seasons.length ?
                        <>
                            <h2 className='text-xs font-bold leading-none ml-1 my-1'>All Seasons</h2>
                            <div className='flex gap-2 items-center flex-wrap'>
                                {
                                    details.seasons.map((season: Season) => (
                                        <Chip onClick={() => navigateToSeasons(navigate, details, season)}
                                            key={season.id + '-' + season.seasonNumber}
                                            className={'text-xs cursor-pointer border-1 border-foreground-50 hover:bg-foreground/20 ' + (active?.seasonNumber === season.seasonNumber ? 'border-1 border-foreground/50' : '')}
                                        >
                                            {season.seasonNumber}
                                        </Chip>
                                    ))
                                }
                            </div>
                        </> :
                        <>
                            <Skeleton className='h-3 w-1/5 rounded-lg mt-2' />
                            <Skeleton className='h-3 w-3/5 rounded-lg mt-2' />
                        </>
                }

            </div>


            <div>
                {active && ('rating' in active) && !!active.rating && <StarRating className='text-xs mb-2' percentage={active.rating} />}

                {
                    details && active ?
                        <div className={'font-bold flex flex-col'}>
                            <h1 className='text-lg sm:text-xl md:text-2xl !leading-none cursor-pointer hover:underline' onClick={() => navigate(`/${details.mediaType}/${details.id}`)}>
                                {details.name}
                                {active.year && <span className='text-sm sm:text-md md:text-lg ml-1'>{active.year}</span>}
                            </h1>
                            <h1 className='text-xs md:text-sm'>{active.name} ({active.episodeCount} episodes)</h1>
                        </div> :
                        <div className='w-full flex flex-col gap-2 overflow-hidden mt-6'>
                            <Skeleton className='h-3 w-4/5 rounded-lg' />
                            <Skeleton className='h-3 w-3/5 rounded-lg' />
                            <Skeleton className='h-3 w-3/5 rounded-lg' />
                        </div>
                }

                <div className='flex gap-4 mt-4'>
                    <div className='min-w-[80px] max-w-[80px] min-h-[120px] max-h-[120px] lg:min-w-[100px] lg:max-w-[100px] lg:min-h-[150px] lg:max-h-[150px]'>
                        {
                            active ?
                                <Image radius='sm' className='obect w-[80px] h-[120px] lg:h-[150px] lg:w-[100px]' src={active.poster} alt={active.name} /> :
                                <Skeleton className='rounded-sm w-[80px] h-[120px] lg:w-[100px] lg:h-[150px] mt-4'>
                                    <div className='h-24 rounded-lg bg-secondary' />
                                </Skeleton>
                        }
                    </div>
                    <div className='flex flex-col gap-2'>
                        <RenderOverview />
                    </div>
                </div>
            </div>

            {
                !active || !!active?.credits?.cast?.length ?
                    <MediaList list={active?.credits?.cast ? active.credits.cast : []}
                        seeAll={() => details && active ? navigateToCredits(navigate, details) : null}
                        showSkeleton
                        classNames={{ skeletonBase: 'mt-6' }}
                        isRounded title='Top Cast'
                    /> : <></>
            }

            <div className='flex flex-col gap-2'>
                {
                    !!active?.episodes.length && <h1 className='font-bold'>Episodes ({active.episodes.length})</h1>
                }
                {
                    !!active?.episodes?.length ?
                    active?.episodes.map((episode: CompactEpisode) => (
                        <EpisodeCard key={episode.id} episode={episode} title={active.name + ' - ' + episode.name} />
                    )) :
                    Array(4).fill(1).map((_, id: number) => (
                        <EpisodeCard key={'skeleton-episode-' + id} title='' />
                    ))
                }
            </div>

        </section>
    );
}


function EpisodeCard({ episode, title }: { episode?: CompactEpisode, title: string }) {
    const { width, height } = usePosterDimensions({ breakpointHeights: [60, 90, 110], factor: (1080 / 1920) });
    console.log('calling with ep', episode, !episode || !!episode.poster, !!episode)

    return (
        <Card className='shadow-none border-1 border-foreground/10 rounded-md'>
            <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 items-start p-2'>
                {
                    !episode || !!episode.poster ?
                        <div className=' h-full'>
                            {
                                !!episode ?
                                    <Image radius='none' className='obect rounded-md' style={{ height, width, minHeight: height, minWidth: width }} src={episode.poster} alt={title} /> :
                                    <Skeleton className='rounded-md' style={{ height, width, minHeight: height, minWidth: width }}>
                                        <div className='h-full rounded-md bg-secondary' />
                                    </Skeleton>
                            }
                        </div> : <></>
                }
                <div className='flex flex-col gap-2 justify-start items-start'>
                    <CardHeader className='flex flex-col items-start p-0'>
                        {
                            !!episode ?
                                <>
                                    {
                                        !!episode.rating &&
                                        <div className='flex gap-1'>
                                            <StarRating percentage={episode.rating} className={'text-default-400 text-semibold text-xs'} />
                                        </div>
                                    }
                                    <div className='flex flex-col gap-1'>
                                        <div className='flex items-center'>
                                            <h2 className='text-xs font-bold leading-none'>{episode.airDate}</h2>
                                        </div>
                                        <div className='flex items-center'>
                                            <h2 className='text-xs font-bold leading-none min-w-[31px]'>{'S' + episode.seasonNumber + ' E' + episode.episodeNumber}</h2>
                                            <DotIcon className='size-4' />
                                            <h2 className='text-xs font-bold leading-none'>{episode.name}</h2>
                                        </div>
                                    </div>
                                </> :
                                <div className='w-full min-w-[200px] md:min-w-[500px] flex flex-col gap-2 mt-2'>
                                    <Skeleton className='h-2 w-4/5 rounded-lg' />
                                    <Skeleton className='h-2 w-3/5 rounded-lg' />
                                    <Skeleton className='h-2 w-3/5 rounded-lg' />
                                </div>
                        }
                    </CardHeader>
                    <CardBody className='text-small text-default-400 backdrop p-0'>
                        {
                            episode ?
                                <ScrollShadow hideScrollBar className={'max-h-[90px] text-xs '}>
                                    <ComputedParagraph text={episode.overview} id={'episode-' + episode.id} />
                                </ScrollShadow> :
                                <></>
                        }
                    </CardBody>
                </div>
            </div>
        </Card>
    );
}