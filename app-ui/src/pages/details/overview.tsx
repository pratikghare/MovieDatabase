import { Chip, ScrollShadow, Image as HeroImage, Skeleton } from '@heroui/react';
import { Genre, Media, Movie, Person, TvShow } from '../../context/media-context';
import { useCallback, useEffect, useRef } from 'react';
import ColorThief from 'colorthief';
import RenderWithScrollShadow from './scroll-shadow-render';
import { DotIcon } from '../../components/icons';
import { getCleanText } from '../../utils/utils';



export const StarRating = ({ percentage, imdb }: { percentage: number, imdb?: number }) => {
    return (
        <div className='flex my-1 items-center space-x-1 backdrop-blur-md'>
            <p className='text-xs'>{percentage / 10}</p>
            <div className='star-rating text-xs'>
                <div className='star-back text-foreground/50'>
                    {Array(5).fill(0).map((_, i) => (
                        <span className='text-foreground/50' key={i}>★</span>
                    ))}
                </div>
                <div
                    className='star-front text-warning'
                    style={{ width: `${imdb ? Math.round(imdb * 10) : percentage}%` }}
                >
                    {Array(5).fill(0).map((_, i) => (
                        <span key={i}>★</span>
                    ))}
                </div>
            </div>
            {!!imdb && <p className='text-xs'>{imdb}</p>}
        </div>
    );
};


const FULL_WIDTH_OFFSET = 20;
export default function Overview({ details, setBackdrop }: { details?: Movie | Person | TvShow | Media, setBackdrop: Function }) {
    const imgRef = useRef<HTMLImageElement>(null);

    const RenderOverview = useCallback(() => {
        const overview: Array<string> = details?.overview ? details.overview.split('\n').filter(Boolean) : [];
        return (
            !details ?
                <div className="flex flex-col gap-2 min-w-[150px] w-full sm:min-w-[300px] mt-4">
                    <Skeleton className="h-3 w-5/5 rounded-lg" />
                    <Skeleton className="h-3 w-5/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                    <Skeleton className="h-3 w-4/5 rounded-lg" />
                </div> :
                <ScrollShadow hideScrollBar className='text-xs max-h-[155px] md:max-h-[200px] flex flex-col gap-1'>
                    {
                        overview.map((para: string, index: number) => (
                            <p key={'para-' + index} className=''>{getCleanText(para)}</p>
                        ))
                    }
                </ScrollShadow>
        );
    }, [details?.overview]);

    useEffect(() => {
        if (details && details.poster && !details.poster.includes('not_found') && !details.backdrop) {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = `${details.poster}/`;

            img.onload = () => {
                const colorThief = new ColorThief();
                const dominantColor = colorThief.getColor(img); // Get the dominant color
                setBackdrop(`rgb(${dominantColor.join(', ')})`);
            };

            img.onerror = (err) => {
                console.error("Failed to load image for color extraction:", err);
            };
        }
    }, [details?.poster, details?.backdrop]);
    

    return (
        <div className='min-h-[30svh] flex space-x-3'>
            <div className='font-semibold flex flex-col gap-3'>
                <div>
                    {details && ('rating' in details) && !!details.rating && <StarRating percentage={details.rating} />}

                    {
                        details ?
                            <div className={'font-bold flex space-x-1 items-end ' + (('rating' in details) && !!details.rating ? '' : 'mt-2')}>
                                <h1 className='text-lg sm:text-xl md:text-2xl !leading-none'>
                                    {details.name}
                                    {details.year && <span className='text-sm sm:text-md md:text-lg ml-1'>{details.year}</span>}
                                </h1>
                            </div> :
                            <div className="w-full flex flex-col gap-2 overflow-hidden">
                                <Skeleton className="h-3 w-4/5 rounded-lg" />
                                <Skeleton className="h-3 w-3/5 rounded-lg" />
                                <Skeleton className="h-3 w-3/5 rounded-lg" />
                            </div>
                    }

                    {
                        details &&
                        <RenderWithScrollShadow offset={FULL_WIDTH_OFFSET} className='text-xs flex items-center'>
                            {
                                details.subtext.map((text: string, index: number) => (
                                    <div key={details.id + 'sub-text-' + index} className='flex items-center'>
                                        <Chip variant='light' className='text-xs px-0 [&>span]:px-0'>{text}</Chip>
                                        {index < (details.subtext.length - 1) && <DotIcon />}
                                    </div>
                                ))
                            }
                        </RenderWithScrollShadow>
                    }
                </div>

                {details && ('tagline' in details) && details.tagline && <span className='italic text-xs'>&ldquo;{details.tagline}&rdquo;</span>}

                {
                    !!details && !!details.genres?.length &&
                    <RenderWithScrollShadow offset={FULL_WIDTH_OFFSET} className='flex space-x-2 bg-transparent scroll-items'>
                        {
                            details.genres.map((genre: Genre) => (
                                <Chip key={genre.id} className='transition-ease text-xxs cursor-pointer border-foreground/30 hover:bg-foreground/30 [&>*]:font-semibold' variant='bordered'>{genre.name}</Chip>
                            ))
                        }
                    </RenderWithScrollShadow>
                }
                {
                    <div className='flex space-x-4'>
                        <div className='min-w-[120px] max-w-[120px] sm:max-w-[200px] md:min-w-[200px]'>
                            {
                                details ? <HeroImage radius='sm' ref={imgRef} className='obect w-fit md:rounded-xl' src={details.poster} alt={details.name} /> :
                                    <Skeleton className="rounded-lg min-h-[180px] sm:min-h-[200px] md:min-h-[250px] lg:max-w-[200px] lg:h-[300px] mt-4">
                                        <div className="h-24 rounded-lg bg-secondary" />
                                    </Skeleton>
                            }
                        </div>
                        <div className='flex flex-col gap-2'>
                            <RenderOverview />
                            {details && ('birthday' in details) && details.birthday && <p className='text-xs font-bold'>Birthday: {details.birthday}</p>}
                            {details && ('awards' in details) && details.awards && <p className='text-xs sm:text-sm font-bold text-primary dark:text-warning'>{details.awards}</p>}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}