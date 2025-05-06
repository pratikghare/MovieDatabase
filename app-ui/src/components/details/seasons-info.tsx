import { useSelector } from 'react-redux';
import { mediaSelector } from '../../store/selectors';
import { CompactEpisode, Media, Movie, Person, Season, TvShow } from '../../context/media-context';
import HorizontalScroll from '../horizontal-scroll';
import { Card, CardHeader, CardBody, ScrollShadow, CardFooter, Chip, Link } from '@heroui/react';
import { ComputedParagraph } from './details-exports';
import { StarRating } from './star-rating';
import { DotIcon } from '../icons';
import { useNavigate } from 'react-router';
import { getCleanText, navigateToSeasons } from '../../utils/utils';

export default function SeasonsInfo() {
    const details: Movie | Person | TvShow | Media | undefined = useSelector(mediaSelector).details;
    const navigate = useNavigate();

    return (
        details && ('seasons' in details) && !!details.seasons.length &&
        <section className='flex flex-col gap-3'>
            {
                (('lastAirEpisode' in details && !!details.lastAirEpisode) || ('nextAirEpisode' in details && !!details.lastAirEpisode)) &&
                <HorizontalScroll className='flex gap-2 !bg-transparent '>
                    {
                        details.lastAirEpisode &&
                        <EpisodeCard episode={details.lastAirEpisode} title={'Last Aired Episode'} />
                    }
                    {
                        details.nextAirEpisode &&
                        <EpisodeCard episode={details.nextAirEpisode} title={'Next Episode to Air'} />
                    }
                </HorizontalScroll>
            }
            <div className='flex gap-2 items-center'>
                <h2 className='text-xs font-bold leading-none'>Browse Seasons</h2>
                {
                    details.seasons.slice(0, 4).map((season: Season) => (
                        <Chip onClick={() => navigateToSeasons(navigate, details, season)} key={season.id + '-' + season.seasonNumber} className='text-xs cursor-pointer hover:bg-foreground/20'>{ season.seasonNumber }</Chip>
                    ))
                }
                {
                    details.seasons.length > 4 &&
                    <Link className='text-xs cursor-pointer hover:underline' onPress={() => navigateToSeasons(navigate, details)}>See All</Link>
                }
            </div>

        </section>
    );
}

function EpisodeCard({ episode, title }: { episode: CompactEpisode, title: string }) {
    return episode && (
        <Card className='min-w-[320px] max-w-[350px] shadow-none border-1 border-foreground/10'>
            <CardHeader className='justify-between'>
                <div className='flex flex-col gap-1'>
                    <div className='flex items-center'>
                        <h2 className='text-xs font-bold leading-none'>{title}</h2>
                        <DotIcon className='size-4' />
                        <h2 className='text-xs font-bold leading-none'>{episode.airDate}</h2>
                    </div>
                    <div className='flex items-center'>
                        <h2 className='text-xs font-bold leading-none flex gap-1'>
                            <span>{ 'S' + episode.seasonNumber }</span> 
                            <span>{ 'E' + episode.episodeNumber }</span>
                        </h2>
                        <DotIcon className='size-4' />
                        <h2 className='text-xs font-bold leading-none'>{getCleanText(episode.name)}</h2>
                    </div>
                </div>
            </CardHeader>
            <CardBody className='px-3 py-2 text-small text-default-400 backdrop'>
                <ScrollShadow hideScrollBar className={'max-h-[120px] text-xs '}>
                    <ComputedParagraph text={episode.overview} id={'episode-' + episode.id} />
                </ScrollShadow>
            </CardBody>
            {
                !!episode.rating &&
                <CardFooter className='gap-4 p-1 px-3'>
                    <div className='flex gap-1'>
                        <StarRating percentage={episode.rating} className={'text-default-400 text-semibold text-xs'} />
                    </div>
                </CardFooter>
            }
        </Card>
    );
}