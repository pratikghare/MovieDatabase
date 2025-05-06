import { useSelector } from 'react-redux';
import { mediaSelector } from '../../store/selectors';
import { Genre, Media, Movie, Person, TvShow } from '../../context/media-context';
import { Chip, ScrollShadow, Skeleton, Image as HeroImage } from '@heroui/react';
import { StarRating } from './star-rating';
import HorizontalScroll from '../horizontal-scroll';
import { DotIcon } from '../icons';
import { useCallback } from 'react';
import { ComputedParagraph } from './details-exports';

const FULL_WIDTH_OFFSET = 20;
export default function Overview() {
    const details: Movie | Person | TvShow | Media | undefined = useSelector(mediaSelector).details;

    const RenderOverview = useCallback(() => {
        const overview: string = details?.overview ? details.overview : '';
        return (
            !details ?
                <div className='flex flex-col gap-2 min-w-[150px] w-full sm:min-w-[300px] mt-4'>
                    <Skeleton className='h-3 w-5/5 rounded-lg' />
                    <Skeleton className='h-3 w-5/5 rounded-lg' />
                    <Skeleton className='h-3 w-4/5 rounded-lg' />
                    <Skeleton className='h-3 w-4/5 rounded-lg' />
                </div> :
                <ScrollShadow hideScrollBar className='text-xs max-h-[155px] md:max-h-[200px] flex flex-col gap-1'>
                    <ComputedParagraph text={overview} id={'overview-para'} />
                </ScrollShadow>
        );
    }, [details?.overview]);

    return (
        <section className='my-2'>
            <div className='mb-4'>
                {details && ('rating' in details) && !!details.rating && <StarRating className='text-xs mb-2' percentage={details.rating} />}

                {
                    details ?
                        <div className={'font-bold flex items-end flex-wrap gap-x-4'}>
                            <h1 className='text-lg sm:text-xl md:text-2xl !leading-none'>
                                {details.name}
                                {details.year && <span className='text-sm sm:text-md md:text-lg ml-1'>{details.year}</span>}
                            </h1>
                        </div> :
                        <div className='w-full flex flex-col gap-2 overflow-hidden'>
                            <Skeleton className='h-3 w-4/5 rounded-lg' />
                            <Skeleton className='h-3 w-3/5 rounded-lg' />
                            <Skeleton className='h-3 w-3/5 rounded-lg' />
                        </div>
                }

                {details && ('tagline' in details) && details.tagline && <div className='italic text-xs mb-1'>&ldquo;{details.tagline}&rdquo;</div>}

                {
                    details &&
                    <HorizontalScroll offset={FULL_WIDTH_OFFSET} className='text-xs flex items-center mb-2 mt-1'>
                        {
                            details.subtext.map((text: string, index: number) => (
                                <div key={details.id + 'sub-text-' + index} className='flex items-center'>
                                    <Chip variant='light' className={'h-auto text-xs px-0 [&>span]:px-0 ' + (index === 0 && ('rated' in details) && details.rated ? 'border-1 rounded-sm border-foreground-600 p-1 px-2' : '')}>
                                        {text}
                                    </Chip>
                                    {index < (details.subtext.length - 1) && <DotIcon />}
                                </div>
                            ))
                        }
                    </HorizontalScroll>
                }

                {
                    !!details && !!details.genres?.length &&
                    <HorizontalScroll offset={FULL_WIDTH_OFFSET} className='flex space-x-2 bg-transparent scroll-items'>
                        {
                            details.genres.map((genre: Genre) => (
                                <Chip key={genre.id} className='transition-ease text-xxs h-6 border-1 border-foreground-400 hover:bg-foreground/30 [&>*]:font-semibold' variant='light'>{genre.name}</Chip>
                            ))
                        }
                    </HorizontalScroll>
                }
            </div>

            <div className='flex space-x-4'>
                <div className='min-w-[120px] max-w-[120px] sm:max-w-[200px] md:min-w-[200px]'>
                    {
                        details ? <HeroImage radius='sm' className='obect w-fit md:rounded-xl' src={details.poster} alt={details.name} /> :
                            <Skeleton className='rounded-lg min-h-[180px] sm:min-h-[200px] md:min-h-[250px] lg:max-w-[200px] lg:h-[300px] mt-4'>
                                <div className='h-24 rounded-lg bg-secondary' />
                            </Skeleton>
                    }
                </div>
                <div className='flex flex-col gap-2'>
                    <RenderOverview />
                    {details && ('birthday' in details) && details.birthday && <p className='text-xs font-bold'>Birthday: {details.birthday}</p>}
                    {details && ('awards' in details) && details.awards && <p className='text-xs sm:text-sm font-bold text-primary dark:text-warning'>{details.awards}</p>}
                </div>
            </div>

        </section>
    );
}