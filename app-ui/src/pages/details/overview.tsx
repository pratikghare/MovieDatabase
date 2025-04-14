import { Chip, ScrollShadow, Image as HeroImage } from '@heroui/react';
import { Genre, Movie, Person, TvShow } from '../../context/media-context';
import { useCallback, useEffect, useRef } from 'react';
import { usePosterDimensions } from '../../hooks/usePosterDimensions';
import ColorThief from 'colorthief';
import RenderWithScrollShadow from './scroll-shadow-render';
import { DotIcon } from '../../components/icons';



export const StarRating = ({ percentage, imdb }: { percentage: number, imdb?: number }) => {
    return (
        <div className='flex my-1 items-center space-x-1'>
            <p className='text-xs'>{percentage / 10}</p>
            <div className='star-rating text-xs'>
                <div className='star-back text-foreground-500'>
                    {Array(5).fill(0).map((_, i) => (
                        <span className='text-foreground-500' key={i}>★</span>
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
export default function Overview({ details, setBackdrop }: { details: Movie | Person | TvShow, setBackdrop: Function }) {
    const { width } = usePosterDimensions({ breakpointWidths: [120, 150, 200] });
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        console.log(width);
    }, [width])

    const RenderOverview = useCallback(() => {
        const overview: Array<string> = details.overview ? details.overview.split('\n').filter(Boolean) : [];
        return (
            <ScrollShadow hideScrollBar className='text-xs max-h-[155px] md:max-h-[200px] flex flex-col gap-1'>
                {
                    overview.map((para: string, index: number) => (
                        <p key={'para-' + index}>{para}</p>
                    ))
                }
            </ScrollShadow>
        );
    }, [details.overview]);

    useEffect(() => {
        if (details.poster && !details.poster.includes('not_found') && !details.backdrop) {
            console.log('here')
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = `${details.poster}/`;

            img.onload = () => {
                const colorThief = new ColorThief();
                const dominantColor = colorThief.getColor(img); // Get the dominant color
                console.log(dominantColor)
                setBackdrop(`rgb(${dominantColor.join(', ')})`);
            };

            img.onerror = (err) => {
                console.error("Failed to load image for color extraction:", err);
            };
        }
    }, [details.poster, details.backdrop]);

    return (
        <div className='min-h-[30svh] flex space-x-3'>
            {/* <div className='max-w-[200px] min-w-[120px] md:min-w-[200px]'>
                <HeroImage ref={imgRef} className='obect w-fit' radius='sm' src={details.poster} alt={details.name} />
            </div> */}

            <div className='font-semibold flex flex-col gap-3'>
                <div>
                    {('rating' in details) && !!details.rating && <StarRating percentage={details.rating} />}

                    <div className='font-bold flex space-x-1 items-end'>
                        <h1 className='text-lg sm:text-xl md:text-2xl !leading-none'>
                            {details.name}
                            { details.year && <span className='text-sm sm:text-md md:text-lg ml-1'>{ details.year }</span> }
                        </h1>
                        {/* {details.year && <p className='text-sm sm:text-md md:text-lg !leading-none'>{details.year}</p>} */}
                    </div>

                    <RenderWithScrollShadow offset={FULL_WIDTH_OFFSET} className='text-xs flex items-center'>
                        {
                            details.subtext.map((text: string, index: number) => (
                                <div className='flex items-center'>
                                    <Chip variant='light' className='text-xs px-0 [&>span]:px-0'>{text}</Chip>
                                    {index < (details.subtext.length - 1) && <DotIcon />}
                                </div>
                            ))
                        }
                    </RenderWithScrollShadow>
                </div>

                {('tagline' in details) && details.tagline && <span className='italic text-xs'>&ldquo;{details.tagline}&rdquo;</span>}

                {
                    !!details.genres?.length &&
                    <RenderWithScrollShadow offset={FULL_WIDTH_OFFSET} className='flex space-x-2 bg-transparent scroll-items'>
                        {
                            details.genres.map((genre: Genre) => (
                                <Chip key={genre.id} className='transition-ease text-xxs cursor-pointer border-foreground-700/30 hover:bg-foreground/30 [&>*]:font-semibold' variant='bordered'>{genre.name}</Chip>
                            ))
                        }
                    </RenderWithScrollShadow>
                }
                {
                    <div className='flex space-x-4'>
                        <div className='min-w-[120px] max-w-[120px] sm:max-w-[200px] md:min-w-[200px]'>
                            <HeroImage radius='sm' ref={imgRef} className='obect w-fit' src={details.poster} alt={details.name} />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <RenderOverview />
                            { ('birthday' in details) && details.birthday && <p className='text-xs font-bold'>Birthday: { details.birthday }</p>}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}